"use strict";

const express = require("express");
const router = express.Router();

const Anuncio = require("../../models/Anuncio");

/**
 * devuelve los anuncios
 * si no lleva params devuelve todos
 * si lleva, los devuelve filtrados
 */
router.get("/", async (req, res, next) => {
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

    res.json({ success: true, anuncios: anuncios });
  } catch (err) {
    next(err);
  }
});

/**
 * devuelve los tags
 */
router.get("/tags", (req, res, next) => {
  try {
    const anuncios = Anuncio.tags();
    // res.json({ success: true, anuncios: anuncios });
    res.json(anuncios);
    res.send("ok");

  } catch (err) {
    next(err);
  }
});

/**
 * crea un nuevo anuncio
 */
router.post("/nuevo", async (req, res, next) => {
  try {
    const data = req.body;
    const anuncio = new Anuncio(data);
    const anuncioGuardado = await anuncio.save();

    res.json({ success: true, result: anuncioGuardado });
  } catch (err) {
    next(err);
  }
});

/**
 * para modificar un anuncio
 */
// router.put('/modificar/:id', async (req, res, next) => {
//   try {
//     const _id = req.params.id;
//     const data = req.body;
//     const anuncioGuardado = await Anuncio.findOneAndUpdate({_id: _id}, data, { new: true }).exec();
//     // new: true --> hace que retorne la versión del agente guardada en la base de datos

//     res.json({ success: true, result: anuncioGuardado });
//   } catch (err) {
//     next(err);
//   }
// });

/**
 * Para borrar un anuncio
 */
// router.delete('/borrar/:id', async (req, res, next) => {
//   try {
//     const _id = req.params.id;
//     await Anuncio.deleteOne({ _id: _id}).exec();
//     res.json({ success: true });

//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
