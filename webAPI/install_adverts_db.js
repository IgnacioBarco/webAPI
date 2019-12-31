'use strict';

const db = require('./lib/connectMongoose');
const mongoose = require('mongoose');
const Anuncio = require('./models/Anuncio')
const fs = require('fs');

initDB();

async function initDB() {
    db.once('open', async function () {
        let err = 'error al borrar los anuncios antiguos ';  
        try {
            //borramos todos los anuncios anteriores
            await Anuncio.deleteMany({});
            

            //cargamos los anuncios del archivo en items
            err = 'Error al cargar los anuncios desde el fichero ';
            let dump = JSON.parse(fs.readFileSync('./anuncios.json', 'utf8'));
            let items = [];
            for (let i = 0; i < dump.anuncios.length; i++) {
                items.push(new Anuncio({ ...dump.anuncios[i] }));
            }
            
            //insertamos los anuncios
            err = 'Error al insertar los anuncios a la base de datos ';
            await Anuncio.insertMany(items);
            console.log('Se han cargado ' + items.length + ' anuncios');

            return process.exit(0);

        } catch (error) {
            console.log('Error al inicializar la base de datos! ', err, error);
            return process.exit(1);

        }
    });
}