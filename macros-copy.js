 /* eslint-disable no-undef */
 /* eslint-disable no-console */
 const {exec} = require('child_process');
 const fs = require('fs-extra');
 const glob = require('glob');
 
 module.exports = function copyMacroFiles(pathOrigin, pathDest) {
   // If you're installing this repo as a dependencies in a kobi app, copy some files in
   console.log('- Copy common macros');
   const macroFolders = glob.sync(`${pathOrigin}/**/`);
 
   // Use fs.rmSync with NodeJS 14 in CI
   fs.rmSync(pathDest, { recursive: true, force: true });
   exec(`rm -rf ${pathDest}`, () => {
     console.log('-- Creating the macro tree in the app sources');
     macroFolders.forEach(folder => {
       const destination = folder.replace(pathOrigin, pathDest);
       console.log(`--- Creating directory: ${destination}`);
       fs.mkdirSync(destination, { recursive: true });
     });
     const macroFiles = glob.sync(`${pathOrigin}/**/*.twig`);
     console.log('-- Copying macro files in target directory');
     macroFiles.forEach(file => {
       const destination = file.replace(pathOrigin, pathDest);
       fs.copySync(file, destination);
     });
   });
 };