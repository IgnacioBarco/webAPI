'use strict';

const mongoose = require('mongoose');

// definimos un esquema
const anunciosSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
}
    //, { collection: 'agentes'} // para saltarse la pluralización
);

// creamos el modelo de agente
const Agente = mongoose.model('Agente', anunciosSchema);

module.exports = Agente;