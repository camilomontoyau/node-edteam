const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const _data = require('./lib/data');
const _identificador = require('./lib/identificador');

const enrutador = {
  ejemplo: (data, callback) => {
    callback(200, JSON.stringify({ mensaje: 'esto es un ejemplo' }));
  },
  noEncontrado: (data, callback) => {
    callback(404, JSON.stringify({ mensaje: 'recurso no encontrado' }));
  },
  usuarios: (data, callback) => {
    switch (data.metodo) {
      case 'post':
        const identificador = _identificador();
        _data.crear(
          { directorio: data.ruta, archivo: identificador, data: data.payload },
          error => {
            if (error) {
              callback(500, JSON.stringify({ error }));
            } else {
              callback(201, data.payload);
            }
          }
        );

        break;

      default:
        callback(404, {
          mensaje: `no puedes usar ${data.metodo} en ${data.ruta}`
        });
        break;
    }
  }
};

const servidorUnificado = (req, res) => {
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

    const data = {
      ruta: rutaLimpia,
      query,
      metodo,
      headers,
      payload: buffer
    };

    //enviamos la respuesta
    let handler;
    if (rutaLimpia && enrutador[rutaLimpia]) {
      handler = enrutador[rutaLimpia];
    } else {
      handler = enrutador.noEncontrado;
    }

    handler(data, (statusCode = 200, respuesta) => {
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(respuesta);
    });
  });
};

module.exports = servidorUnificado;
