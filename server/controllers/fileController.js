const formidable = require('formidable');
const dataExtract = require('../extractors/dataExtract');
const pathJoin = require('path');
const scriptDir = pathJoin.join(__dirname, '../pyscripts');

// const success = (res) => {
//     return res.status(200).json({result: true, message: "File uploaded and processed successfully!"});
// }

const fail = (res) => {
    return res.status(200).json({result: false, message: "File upload failed, please try again!"})
}

exports.featureExtractor = (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req,  async(err, fields, files) => {
            path = files.file.filepath;
            console.log(scriptDir);
            const options = {
                args: [path],
                scriptPath: scriptDir
            }
            Promise.all([
                dataExtract.PEExtractor(options)
                    .catch(err => {
                        console.log('PEExtractor failed: ', err);
                        return false;
                    }),
                dataExtract.byteExtractor(path)
                    .catch(err => {
                        console.log('byteExtractor failed: ', err);
                        return false;
                    })
            ])
            .then(([result1, result2]) => {
                console.log(result1);
                console.log(result2);
                if (!result1) return fail(res); // update when byteExtractor is ready
                else next();
            })
            .catch(err => {
                console.log('One of the functions failed: ', err);
                return fail(res);
            });
            
    });
}