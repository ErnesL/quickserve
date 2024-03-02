//import base64 from 'base64-js';
//import connectDB from "@/lib/dbConnect";
//import gridfs from 'gridfs-stream';
//import NumJS from 'numjs';



// Buffer lo usarás en vez de BytesIO
// Bibliotecas gráficas candidatas Chat.js, D3.js, Ploty.js, Highcharts
// PROCESAMIENTO DE IMÁGENES opencv4nodejs Y jsfeat


//Consejos de pillow Jimp, sharp, gm

//API de Canvas de HTML5 o una biblioteca como p5.js.*/

/*const fs = require('fs'); leer archivos
const sharp = require('sharp'); procesado de imagen
const express = require('express');
const app = express();

app.get('/imagen', async (req, res) => {
    try {
        let imagen = await sharp('ruta/a/tu/imagen.jpg')
            .resize(200, 200) // Procesa la imagen como necesites
            .toBuffer();

        let imagenBase64 = Buffer.from(imagen).toString('base64');

        res.send(imagenBase64);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al procesar la imagen');
    }
});

app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000'));

fetch('http://localhost:3000/imagen')
    .then(response => response.text())
    .then(data => {
        let img = document.createElement('img');
        img.src = 'data:image/jpeg;base64,' + data;
        document.body.appendChild(img);
    })
    .catch(error => console.error('Error:', error));*/