const axios = require('axios')
const modelPort = process.env.MODELPORT || 5000;

exports.predictResult = async(req, res, next) =>  {
    axios.get(`http://localhost:${modelPort}/predict`) // change in prod
        .then((response) => {
            let prediction = response.data.prediction;
            if(prediction == 1) return res.status(200).json({result: true, message: "File uploaded and processed successfully!", malware: false});
            else return res.status(200).json({result: true, message: "File uploaded and processed successfully!", malware: true});
        })
        .catch((err) => {throw err;}) 
}

