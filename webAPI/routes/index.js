var express = require("express");
var router = express.Router();
const Anuncio = require("../models/Anuncio");

/**
 * devuelve los anuncios
 * si no lleva params devuelve todos
 * si lleva, los devuelve filtrados
 */
router.get("/", async function(req, res, next) {
  try {
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

    /**
     * -x menos de x
     * x- mas de x
     * x-y entre x e y
     * x ese valor 
     */
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

/**
 * muestra una página con los detalles del anuncio
 */
router.get("/:id", async function(req, res, next) {
  try {
    const _id = req.params.id;
    let result = {};
    result = await Anuncio.findById(_id);

    if (Object.keys(result).length === 0) {
      next({ status: 404, error: "No existe ningun anuncio con ese id" });
    }

    res.render("detail.ejs", {
      success: true,
      result: result
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
