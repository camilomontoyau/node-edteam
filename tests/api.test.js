const querystring = require('querystring');
const http = require('http');
const assert = require('assert');

const datosEntrada = {
  nombre: 'Vicente',
  apellido: 'Fernandez'
};
const postData = querystring.stringify(datosEntrada);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/usuarios',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  let buffer = '';
  res.on('data', chunk => {
    console.log(`BODY: ${chunk}`);
    buffer += chunk;
  });
  res.on('end', () => {
    console.log('buffer === ', buffer);
    const datosSalida = querystring.parse(buffer);
    assert.strictEqual(datosSalida.nombre, datosEntrada.nombre);
    assert.strictEqual(datosSalida.apellido, datosEntrada.apellido);
  });
});

req.on('error', e => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();
