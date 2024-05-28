const authController = {};
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        if(!tokenString) {
            throw new Error('invalid token 1');
        }
        const token = tokenString.replace('Bearer ', '')
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if(error) {
                throw new Error('invalid token 2')
            }

            //req에 내용을 추가할 수 있다 --> req에 userId를 추가
            req.userId = payload._id; //기존 req에 값을 더해서 next()할때 넘겨줄 수 있음.
        });
        next();

    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message })
    }
}

module.exports = authController;