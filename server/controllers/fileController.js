const formidable = require('formidable');
const dataExtract = require('../extractors/dataExtract');
const pathJoin = require('path');
const scriptDir = pathJoin.join(__dirname, '../pyscripts');

const fail = (res) => {
    return res.status(200).json({result: false, message: "File upload failed, please try again!"})
}

exports.featureExtractor = (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.parse(req,  async(err, fields, files) => {

            path = files.file.filepath;
            const options = {
                args: [path],
                scriptPath: scriptDir
            }

            Promise.all([
                dataExtract.PEExtractor(options) // add byteExtractor and asmExtractor later
                    .catch(err => {
                        console.log('PEExtractor failed: ', err);
                        return false;
                    })
            ])
            .then(([result1]) => {
                if (!result1) return fail(res); // update result values when byteExtractor is ready
                else {
                    req.featureValues = result1
                    return next();
                }
            })
            .catch(err => {
                console.log('One of the functions failed: ', err);
                return fail(res);
            });
            
    });
}