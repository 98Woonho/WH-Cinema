const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const axios = require('axios');
const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// accessToken 발급 함수
exports.makeAccessToken = (Object) => {
    const accessToken = jwt.sign(
        Object,
        ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' }
    );
    console.log('accessToken : ' + accessToken);
    return accessToken;
};

// refreshToken 발급 함수
exports.makeRefreshToken = (expiresIn) => {
    const refreshToken = jwt.sign(
        {},
        REFRESH_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: expiresIn
        }
    );
    console.log('refresh token : ' + refreshToken);
    return refreshToken;
};

// refresh token 유효성 검사
exports.refreshVerify = async (token, userId) => {
    await axios.get('/user/token', { params: { userId: userId } })
        .then(res => {
            const { token } = res.data;
            jwt.verify(token, REFRESH_TOKEN_SECRET)
        })
        .catch(err => {
            console.log(err);
        });
};

// access token 유효성 검사
exports.verify = (token) => {
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        return {
            ok: true,
            id: decoded.id
        };
    } catch (error) {
        return {
            ok: false,
            message: error.message,
        };
    }
};