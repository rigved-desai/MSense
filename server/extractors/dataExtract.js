const {PythonShell} = require('python-shell');
const fs = require("fs");
const {FEATURES} = require('../config/config.js')

exports.PEExtractor = async(options) => {
    try {
        return new Promise((resolve, reject) => {
            PythonShell.run("analysePE.py",options).then(messages => {
            let featureValues = []
            if(messages[0] == "no PE file!" || "file too small!") {
                for(let i =0; i<FEATURES.length; i++) {
                    featureValues.push(0.0);
                }
            }
            else {
                for(let i =0; i<messages.length; i++) {
                    featureValues.push(messages[i]);
                }
            }
            resolve(featureValues);
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