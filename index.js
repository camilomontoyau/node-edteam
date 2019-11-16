/* archivo principal de nuestra app */

//dependencias
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

//crear el servidor
const servidor = http.createServer((req, res) => {
  // obtener la url desde el request
  const urlParseada = url.parse(req.url, true);
  console.log('urlParseada ', urlParseada);
  //obtenemos la ruta
  const ruta = urlParseada.pathname;
  console.log('ruta ', ruta);
  //remover slashes
  const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');
  console.log('rutaLimpia ', rutaLimpia);
  // Obtener el metodo http
  const metodo = req.method.toLowerCase();
  console.log('metodo ', metodo);
  // Obtenemos los queries de url
  const query = urlParseada.query;
  console.log('query', JSON.stringify(query));
  //Obtenemos los headers
  const headers = req.headers;
  console.log('headers', headers);
  // Obtenemos un payload, si hay
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', data => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();
    console.log('buffer = ', buffer);

    //enviamos la respuesta
    switch (rutaLimpia) {
      case 'hola':
        res.end('ruta hola');
        break;
      default:
        res.end('otra ruta');
    }
  });
});

//el servidor debe mantener el proceso y escuchar peticiones http
servidor.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});
