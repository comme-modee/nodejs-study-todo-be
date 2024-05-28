//user 관련 api를 모아놓는 곳


const express = require('express');
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');
const router = express.Router(); //express에서 제공하는 Router기능

//Router를 이용해 주소를 명명해준다.
router.post('/', userController.createUser);
router.post('/login', userController.loginWithEmail);

//토큰을 통해 유저 id를 빼내고, 그 아이디로 유저 객체 찾아서 보내주기
//authController에서 token 정보 확인하고 next() 미들웨어를 통해 userController로 넘김
router.get('/me', authController.authenticate, userController.getUser)

module.exports = router;