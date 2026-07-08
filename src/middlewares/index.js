const fs = require('fs');
const path = require('path');

const middlewares = {};
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => {
    const middleware = require(path.join(__dirname, file));
    const name = file.split('.')[0];
    middlewares[name] = middleware;
  });

module.exports = middlewares;
