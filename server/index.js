const express = require('express')
const app = express();
const {PORT} = require('../server/config/config')
const cors = require('cors');
require('dotenv').config()
const { spawn } = require('child_process');
const fileUploadRouter = require("./routes/fileUploadRouter");
app.use(cors());
app.use("/", fileUploadRouter);

const lol = async() => {
    await spawn('python', ['modelapi/modelAPI.py']);
    await app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
}

lol();




