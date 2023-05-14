const express = require('express')
const app = express();
const {PORT} = require('../server/config/config')
const cors = require('cors');
require('dotenv').config()
const { spawn } = require('child_process');

const modelAPI = spawn('python', ['modelAPi/modelAPI.py']);

const fileUploadRouter = require("./routes/fileUploadRouter");
const { model } = require('@tensorflow/tfjs');

app.use(cors());
app.use("/", fileUploadRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

modelAPI.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  modelAPI.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  modelAPI.on('close', (code) => {
    console.log(`FastAPI server exited with code ${code}`);
  });