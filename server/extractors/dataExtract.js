const {PythonShell} = require('python-shell');
const fs = require("fs");
const {FEATURES} = require('../config/config.js')

exports.PEExtractor = async(options) => {
    try {
        return new Promise((resolve, reject) => {
            PythonShell.run("analysePE.py",options).then(messages => {
            const writeStream = fs.createWriteStream('./features/PEfeatures.csv');
            const pathName = writeStream.path;
            for(let i =0; i<FEATURES.length; i++) {
                if(i == FEATURES.length-1) writeStream.write(`${FEATURES[i]}`);
                else writeStream.write(`${FEATURES[i]};`)
            }
            writeStream.write('\n');
            if(messages[0] == "no PE file!") {
                for(let i =0; i<FEATURES.length; i++) {
                    if(i == FEATURES.length-1) writeStream.write(`0.0`);
                    else writeStream.write(`0.0;`)
                }
            }
            else {
                for(let i =0; i<messages.length; i++) {
                    if(i == messages.length-1) writeStream.write(`${messages[i]}`);
                    else writeStream.write(`${messages[i]};`)
                }
            }
            
            writeStream.end();

                writeStream.on('finish', () => {
                    console.log(`wrote PE file data to .CSV successfully ${pathName}`);
                    resolve(true);
                });
        
                writeStream.on('error', (err) => {
                    console.error(`Error writing PE file data ${pathName} => ${err}`);
                    reject(false);
                });
            });
    })
    }
    catch(err) {
        console.log(err)
        return false;
    }
}

// NEED TO CHANGE BELOW FUNCTION TO PROCESS THE BYTES AND CREATE A .CSV FILE

exports.byteExtractor = async(path) => {
    try {
    return new Promise((resolve, reject) => {
        const outputPath = './features/bytes.bin';
        const buffer = fs.readFileSync(path);
        const byteArray = new Uint8Array(buffer);

        const writeStream = fs.createWriteStream(outputPath);

        writeStream.write(Buffer.from(byteArray.buffer));

        writeStream.end();

        writeStream.on('finish', () => {
          console.log('Byte array data written successfully:', outputPath);
          resolve(true);
        });
  
        writeStream.on('error', (error) => {
          console.error('Error writing byte array data:', error);
          reject(false);
        });
      });
    } catch (err) {
      console.log(err);
      return false;
    }
}

// exports.asmExtractor =  (path) => {

// }