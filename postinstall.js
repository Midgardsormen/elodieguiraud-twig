 /* eslint-disable no-undef */
 /* eslint-disable no-console */
 const path = require('path');
 const copyMacroFiles = require('./macros-copy');
 
 console.log('// templates postInstall //');

  const pathOrigin = 'node_modules/wp-midgardsormen/templates/macros/'; 
  const pathDest = 'templates/macros/common/';

  copyMacroFiles(pathOrigin, pathDest);
  console.log(' - templates postInstall: stop');