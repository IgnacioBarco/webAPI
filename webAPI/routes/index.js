var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');

router.get('/', async function (req, res, next) {
  try {
    // Busco el anuncio por ID
    let result = await Anuncio.list({});
    if (result) {
      // Ok
      res.render('index.ejs', {
        title: 'webAPI2',
        result: result
      });
      return;
    }
    // Si llego aquí es que no se encontró nada
    next({ status: 404, error: 'Not found' });

  } catch (error) {
    // Los errores de validación de usuario NO me interesa loguerarlos
    if (!error.array) console.log(`Error incontrolado: ${error}`);
    next(error);

  }
});

router.get('/:id', async function (req, res, next) {
  try {
    // Se busca el anuncio por el id
    let result = await Anuncio.findById(req.params.id);
    if (result) {
      res.render('detail.ejs', {
        success: true,
        result: result
      });
      // return;
    }
    
    // Si no encuentra el anuncio
    next({ status: 404, error: 'Anuncio no encontrado' });

  } catch (error) {
    // Los errores de validación de usuario NO me interesa loguerarlos
    if (!error.array) console.log(`Error incontrolado: ${error}`);
    next(error);
  }
});





module.exports = router;
