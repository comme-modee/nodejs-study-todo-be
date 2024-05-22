const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); //cors에러 해결하기 위한 라이브러리. 자바스크립트는 기본적으로 다른 도메인에서 리소스를 가져오는 걸 보안상 제한한다. 그렇기 때문에 특정 도메인이 안전하다고 허가를 해줘야한다.
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', indexRouter) //api라는 주소로 입장하면 indexRouter를 사용할것이라는 뜻.

const mongoURI = process.env.MONGODB_URI; //몽구스에 만들어질 폴더이름

mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
        console.log('mongoose connected')
    })
    .catch((err) => {
        console.log('DB connection fail', err)
    });

app.listen(process.env.PORT || 5000, () => {
    console.log('server on')
})
