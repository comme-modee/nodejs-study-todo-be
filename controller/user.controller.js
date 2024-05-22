const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //name기준으로 user을 찾는다. (이미 가입되어있는지 확인)
        const user = await User.findOne({name:name})

        //중복된 user가 있다면 throw 에러
        if(user) {
            throw new Error('이미 가입이 된 유저입니다')
        }

        //패스워드 암호화
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        //새 유저 저장
        const newUser = new User({ name, email, password:hash });
        await newUser.save();
        res.status(200).json({ status: 'success', userData: newUser });

    } catch (error) {
        res.status(400).json({ status: 'fail', error: error });
    }
}

userController.loginWithEmail = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name: name }, "-createdAt -updatedAt -__v");

        if (!user) {
            throw new Error('해당 유저를 찾을 수 없습니다.');
        }

        const isMatch = await bcrypt.compare(password, user.password); // 비동기 비교

        if (!isMatch) {
            throw new Error('이름과 비밀번호가 일치하지 않습니다.');
        }

        const token = user.generateToken();
        return res.status(200).json({ status: 'success', user, token });

    } catch (error) {
        res.status(400).json({ status: 'fail', error: error.message });
    }
}

module.exports = userController;