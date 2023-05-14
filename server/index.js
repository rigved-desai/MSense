const express = require('express')
const app = express();
const {PORT} = require('./config/config.js')
const cors = require('cors');
require('dotenv').config()
const { spawn } = require('child_process');
const fileUploadRouter = require("./routes/fileUploadRouter");
app.use(cors());
app.use("/", fileUploadRouter);

spawn('python', ['modelapi/modelAPI.py']);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));



