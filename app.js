const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const indexRouter = require('./routes/index')
const app = express();
const MONGODB_URI = process.env.MONGODB_URI_PROD;
const PORT = process.env.PORT;

require('dotenv').config();

app.use(cors());
app.use(bodyParser.json()) //body-parser를 사용해 req 바디를 쉽게 읽어올 수 있다.
app.use('/api', indexRouter) // '/api'로 접속하면 indexRouter를 사용할것이다.

mongoose
    .connect(MONGODB_URI, {useNewUrlParser: true})
    .then(()=>{
        console.log('mongoose connected');
    })
    .catch((err) => {
        console.log('DB connection fail', err);
    })

app.listen(PORT || 5000, () => {
    console.log(`server on ${PORT || 5000}`);
})
