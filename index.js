/* archivo principal de nuestra app */

//dependencias
const http = require('http');
const url = require('url');

//crear el servidor
const servidor = http.createServer((req, res) => {
  // obtener la url desde el request
  const urlParseada = url.parse(req.url, true);
  console.log('urlParseada', urlParseada);
  //obtenemos la ruta
  const ruta = urlParseada.pathname;
  console.log('ruta', ruta);
  //enviamos la respuesta
  res.end('Hola mundo desde un servidor de nodejs');
});

//el servidor debe mantener el proceso y escuchar peticiones http
servidor.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});
