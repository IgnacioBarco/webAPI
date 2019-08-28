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

        const filter = {};

        if (nombre) {
            filter.nombre = nombre;
        }

        const anuncios = await Anuncio.list({ filter: filter });

        res.json({ success: true, anuncios: anuncios });

    } catch (err) {
        next(err);
    }


});

module.exports = router;