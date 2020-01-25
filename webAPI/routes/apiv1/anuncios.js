"use strict";

const express = require("express");
const router = express.Router();

const Anuncio = require("../../models/Anuncio");

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

module.exports = router;
