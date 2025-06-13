
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/auth');

exports.register = async (req, res) => {
    try {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password, 8);
        const userData = {
            ...req.body,
            password: hashedPassword,
        };
        const user = await User.create(userData);
        return res.status(201).json({ message: 'ユーザー登録成功', user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ユーザー登録失敗' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({
                errors: [
                    {
                        path: 'username',
                        msg: 'ユーザー名が無効です',
                    }
                ],
            });
        }
        const passwordVailed = await bcrypt.compare(password, user.password);
        if (!passwordVailed) {
            return res.status(404).json({
                errors: [
                    {
                        path: 'password',
                        msg: 'パスワードが無効です',
                    }
                ],
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });
        return res.status(200).json({ message: 'ログイン成功', user, token });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'ログイン失敗' });
    }
};