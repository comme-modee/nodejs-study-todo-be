//task 관련 api를 모아놓는 곳


const express = require('express');
const taskController = require('../controller/task.controller');
const authController = require('../controller/auth.controller');
const router = express.Router(); //express에서 제공하는 Router기능

//Router를 이용해 주소를 명명해준다.
router.post('/', authController.authenticate, taskController.createTask);

router.get('/', taskController.getTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;