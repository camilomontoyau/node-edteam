/* archivo principal de nuestra app */

//dependencias
const http = require('http');

//crear el servidor
const servidor = http.createServer((req, res) => {
  res.end();
});

//el servidor debe mantener el proceso y escuchar peticiones http
servidor.listen(3000, () => {
  console.log('El servidor está escuchando en el puerto 3000');
});
