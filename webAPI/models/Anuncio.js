"use strict";

const mongoose = require("mongoose");

// definimos un esquema
const anunciosSchema = mongoose.Schema(
  {
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
  }
  //, { collection: 'agentes'} // para saltarse la pluralización
);

anunciosSchema.statics.list = function({ filter, start, limit, fields, sort }) {
  const query = Anuncio.find(filter);
  query.skip(start);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
};

anunciosSchema.statics.tags = function() {
  return ["work", "lifestyle", "motor", "mobile"];
};

// creamos el modelo de agente
const Anuncio = mongoose.model("Anuncio", anunciosSchema);

module.exports = Anuncio;
