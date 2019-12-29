'use strict';

const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/Anuncio');

router.get('/', async (req, res, next) => {
    try {
        const anuncios = await Anuncio.find().exec();
        res.json({ success: true, anuncios: anuncios });
    } catch (err) {
        next(err);
    }
});

router.get('/prueba/id/:id', (req, res, next) => {
    console.log('req.params', req.params);
    console.log('prueba');
    res.send('ok');
});

router.get('/prueba2', async (req, res, next) => {
    try {
        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const tags = req.query.tags;
        const precio = req.query.precio;

        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const fields = req.query.fields;
        const sort = req.query.sort;


        const filter = {};

        if (nombre) {
            filter.nombre = new RegExp(req.query.nombre, "i");
        }

        if (venta) {
            filter.venta = venta;
        }

        if (tags) {
            filter.tags = tags;
        }

        if (typeof precio !== 'undefined') {
            filter.precio = precio;
        }

        const anuncios = await Anuncio.list({ filter: filter, skip, limit, fields, sort });

        res.json({ success: true, anuncios: anuncios });

    } catch (err) {
        next(err);
    }


});

module.exports = router;