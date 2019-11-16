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
          const dataString = JSON.stringify(data);
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
  }
};

module.exports = libData;
