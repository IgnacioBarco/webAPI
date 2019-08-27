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

module.exports = router;