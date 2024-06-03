const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
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
    return accessToken;
};

// refreshToken 발급 함수
exports.makeRefreshToken = (Object, expiresIn) => {
    const refreshToken = jwt.sign(
        Object,
        REFRESH_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: expiresIn
        }
    );
    return refreshToken;
};

// refresh token 유효성 검사
exports.refreshVerify = (token) => {
    try {
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
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

// exports.getAccessTokenPayload = (token) => {
//     const decodedToken = jwt.decode(token); // accessToken을 decode해서 payload 정보 가져오기
//     const userId = decodedToken.userId; // payload에 있는 userId
//     return userId;
// };