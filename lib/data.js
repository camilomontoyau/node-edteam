const fs = require('fs');
const path = require('path');

const directorioBase = path.join(__dirname, '../data/');

const libData = {
  crear: ({ directorio, archivo, data }, callback) => {
    fs.open(
      directorioBase + directorio + '/' + archivo + '.json',
      'wx',
      (error, fileDescriptor) => {
        if (!error && fileDescriptor) {
          //convertir los datos a string
          const dataString = data;
          fs.writeFile(fileDescriptor, dataString, error2 => {
            if (error2) {
              return callback('Error escribiendo el nuevo archivo');
            }
            fs.close(fileDescriptor, error3 => {
              if (error3) {
                return callback('Error cerrando el nuevo archivo');
              }
              callback(false);
            });
          });
        } else {
          callback('No se pudo crear el archivo, probablemente ya existe');
        }
      }
    );
  },
  obtenerUno: ({ directorio, archivo }, callback) => {
    fs.readFile(
      directorioBase + directorio + '/' + archivo + '.json',
      'utf-8',
      (error, usuario) => {
        if (!error && usuario) {
          console.log('usuario = ', usuario);
          callback(null, usuario);
        } else {
          callback('No se pudo leer el archivo');
        }
      }
    );
  },
  eliminarUno: ({ directorio, archivo }, callback) => {
    fs.unlink(directorioBase + directorio + '/' + archivo + '.json', error => {
      if (error) return callback('Error eliminando usuario');
      callback(null);
    });
  },
  listar: ({ directorio }, callback) => {
    fs.readdir(
      directorioBase + directorio + '/',
      { encoding: 'utf8' },
      (error, usuarios) => {
        console.log('here1');
        if (!error && usuarios) {
          console.log('usuarios = ', usuarios);
          usuarios = usuarios.map(usuario => usuario.split('.')[0]);
          callback(null, usuarios);
        } else {
          console.log('listar-->error-->', error);
          callback('No se pudo obtener información de los usuarios');
        }
      }
    );
  }
};

module.exports = libData;
