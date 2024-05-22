//user 관련 api를 모아놓는 곳


const express = require('express');
const userController = require('../controller/user.controller');
const router = express.Router(); //express에서 제공하는 Router기능

//Router를 이용해 주소를 명명해준다.
router.post('/', userController.createUser);
router.post('/login', userController.loginWithEmail);

module.exports = router;