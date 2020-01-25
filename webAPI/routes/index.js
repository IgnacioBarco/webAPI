var express = require("express");
var router = express.Router();
const Anuncio = require("../models/Anuncio");

router.get("/", async function(req, res, next) {
  try {
    // // Busco el anuncio por ID
    // let result = await Anuncio.list({});
    // if (result) {
    //   // Ok
    //   res.render('index.ejs', {
    //     title: 'webAPI2',
    //     result: result
    //   });
    //   return;
    // }
    // // Si llego aquí es que no se encontró nada
    // next({ status: 404, error: 'Not found' });
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const tag = req.query.tag;
    const precio = req.query.precio;

    const start = parseInt(req.query.start);
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

    if (typeof tag !== "undefined") {
      filter.tags = tag;
    }

    if (typeof precio !== "undefined") {
      filter.precio = {};
      let importes = precio.split("-");

      if (precio.startsWith("-")) {
        filter.precio.$lt = importes[1];
      } else if (precio.endsWith("-")) {
        filter.precio.$gt = importes[0];
      } else if (precio.includes("-")) {
        filter.precio.$gt = importes[0];
        filter.precio.$lt = importes[1];
      } else {
        filter.precio = precio;
      }
    }

    const anuncios = await Anuncio.list({
      filter: filter,
      start,
      limit,
      fields,
      sort
    });

    console.log("lalal" + anuncios + "kkkkk");
    let mensaje = "";

    if (Object.keys(anuncios).length === 0) {
      mensaje = "No hay resultados";
    }

    res.render("index.ejs", {
      title: "webAPI",
      mensaje: mensaje,
      result: anuncios
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async function(req, res, next) {
  try {
    // Se busca el anuncio por el id
    let result = await Anuncio.findById(req.params.id);
    if (result) {
      res.render("detail.ejs", {
        success: true,
        result: result
      });
      // return;
    }

    // Si no encuentra el anuncio
    next({ status: 404, error: "Anuncio no encontrado" });
  } catch (error) {
    // Los errores de validación de usuario NO me interesa loguerarlos
    if (!error.array) console.log(`Error incontrolado: ${error}`);
    next(error);
  }
});

module.exports = router;
