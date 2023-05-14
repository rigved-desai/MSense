const express = require('express')
const fileController = require("../controllers/fileController")
const modelPredict = require('../controllers/modelPredict')

const router = express.Router();

router
    .route("/")
        .post(fileController.featureExtractor, modelPredict.predictResult) 
        
module.exports = router;