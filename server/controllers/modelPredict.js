const axios = require('axios')
const modelPort = process.env.MODELPORT || 5000;

exports.predictResult = async(req, res, next) =>  {

    const featureValues = JSON.stringify(req.featureValues);

    axios.post(`https://msensemodelapi.onrender.com/predict`, featureValues)
        .then((response) => {
            let prediction = response.data.prediction;
            if(prediction == 1) 
                return res.status(200).json({result: true, message: "File uploaded and processed successfully!", malware: false});
            else return res.status(200).json({result: true, message: "File uploaded and processed successfully!", malware: true});
        })
        .catch((err) => {console.log(err);}) 
}

