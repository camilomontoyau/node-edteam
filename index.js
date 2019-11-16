/* archivo principal de nuestra app */

//dependencias
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

//crear el servidor
const servidor = http.createServer();

const enrutador = {
  ejemplo: (data, callback) => {
    callback(200, { mensaje: 'esto es un ejemplo' });
  },
  noEncontrado: (data, callback) => {
    callback(404, { mensaje: 'recurso no encontrado' });
  }
};

//el servidor debe mantener el proceso y escuchar peticiones http
servidor.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});
