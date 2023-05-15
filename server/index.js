const express = require('express')
const app = express();
const {PORT} = require('./config/config.js')
const cors = require('cors');
require('dotenv').config()
const fileUploadRouter = require("./routes/fileUploadRouter");
app.use(cors());
app.use("/", fileUploadRouter);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

aapp.get('/check', (req, res) => {
    res.json({ result: 'ok' });
});



