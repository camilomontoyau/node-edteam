/* archivo principal de nuestra app */

//dependencias
const http = require('http');
const servidorUnificado = require('./servidorunificado');

//crear el servidor
const servidor = http.createServer(servidorUnificado);

//el servidor debe mantener el proceso y escuchar peticiones http
servidor.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});
