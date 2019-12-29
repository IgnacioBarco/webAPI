'use strict';

const db = require('./lib/connectMongoose');
const mongoose = require('mongoose');
const Anuncio = require('./models/Anuncio')
const fs = require('fs');

initDB();


async function initDB() {
    db.once('open', async function () {
        try {
            await Anuncio.deleteMany({});

            let dump = JSON.parse(fs.readFileSync('./anuncios.json', 'utf8'));
            let items = [];
            for (let i = 0; i < dump.anuncios.length; i++) {
                items.push(new Anuncio({ ...dump.anuncios[i] }));
            }

            await Anuncio.insertMany(items);

            console.log('Se han cargado ' + items.length + ' anuncios');

            return process.exit(0);

        } catch (err) {
            console.log('Error al inicializar la base de datos!', err);
            return process.exit(1);

        }
    });
}