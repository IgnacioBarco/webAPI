'use strict';

const mongoose = require('mongoose');

// definimos un esquema
const anunciosSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: String,
    foto: String
    //,
    //tags: [String]
}
    //, { collection: 'agentes'} // para saltarse la pluralización
);

// creamos el modelo de agente
const Anuncio = mongoose.model('Anuncio', anunciosSchema);

module.exports = Anuncio;