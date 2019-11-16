/* archivo principal de nuestra app */

//dependencias
const http = require('http');

//crear el servidor
const servidor = http.createServer((req, res) => {
  res.end();
});
