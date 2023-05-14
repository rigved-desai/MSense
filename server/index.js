const express = require('express')
const app = express();
const {PORT} = require('../server/config/config')
const cors = require('cors');
require('dotenv').config()
const { spawn } = require('child_process');

const lol = async() => {
    await spawn('python', ['modelapi/modelAPI.py']);
}

lol();

const fileUploadRouter = require("./routes/fileUploadRouter");

app.use(cors());
app.use("/", fileUploadRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
