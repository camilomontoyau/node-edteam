const fs = require('fs');
const path = require('path');

const directorioBase = path.join(__dirname, '../data/');

const libData = {
  crear: ({ directorio, archivo, data }, callback) => {
    fs.open(
      directorioBase + directorio + '/' + archivo + '.json',
      'wx',
      (error, fileDescriptor) => {}
    );
  }
};

module.exports = libData;
