const express = require('express');
const router = express.Router(); //express에서 제공하는 Router기능
const taskApi = require('./task.api');
const userApi = require('./user.api');

router.use('/tasks', taskApi); //tasks라는 주소로 url호출이 왔다면 taskApi로 넘어간다.
router.use('/user', userApi); //user라는 주소로 url호출이 왔다면 userApi로 넘어간다.

module.exports = router;