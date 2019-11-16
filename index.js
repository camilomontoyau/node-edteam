/* archivo principal de nuestra app */

//dependencias
const http = require('http');
const https = require('https');
const fs = require('fs');
const servidorUnificado = require('./servidorunificado');

//crear el servidor
const servidor = http.createServer(servidorUnificado);

// servidor https
const servidorHttps = https.createServer(
  {
    cert: fs.readFileSync('./https/cert.pem'),
    key: fs.readFileSync('./https/key.pem')
  },
  servidorUnificado
);

//el servidor debe mantener el proceso y escuchar peticiones http
servidor.listen(3000, () => {
  console.log('El servidor http está escuchando en el puerto 3000');
});

servidorHttps.listen(3001, () => {
  console.log('El servidor https está escuchando en el puerto 3001');
});
