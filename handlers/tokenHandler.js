
const jwt = require('jsonwebtoken');
const User = require('../models/auth');

const tokenDecode = (req) => {
    const bearerHeaser = req.headers['authorization'];
    if (bearerHeaser) {
        const bearer = bearerHeaser.split(' ')[1];
        try {
            const decodedToken = jwt.verify(bearer, process.env.TOKEN_SECRET_KEY);
            return decodedToken;
        } catch (err) {
            console.log(err);
            return false;
        }
    } else {
        return false;
    }
};

exports.verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const user = await User.findById(tokenDecoded.id);
        if (!user) {
            return res.status(403).json('権限がありません');
        }
        req.user = user;
        next();
    } else {
        return res.status(403).json('トークンがありません');
    }
};