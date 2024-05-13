const auth = require('../middlewares/authMiddleware.js');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

require('dotenv').config();

router.post('/login', (res) => {
  const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
  const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;

  // 받은 요청에서 db의 데이터를 가져온다 (로그인정보)
  const nickname = 'JY';
  const profile = 'images';
  let token = '';
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  token = jwt.sign(
    {
      type: 'JWT',
      nickname: nickname,
      profile: profile,
    },
    key,
    {
      expiresIn: '15m', // 15분후 만료
      issuer: '토큰발급자',
    }
  );
  // response
  return res.status(200).json({
    code: 200,
    message: 'token is created',
    token: token,
  });
});

router.post('/certification', async (req, res) => {
  const { imp_uid } = req.body;
  try {
    const getToken = await axios.post('https://api.iamport.kr/users/getToken',
      { imp_key: '7582034642764268', imp_secret: 'JxMwheK2PKBrxFxOifDLwwZvdyzjwDERKj4TzStgSZ06Wmg3oQp7h3WjK3nOfdjXsSXF0ZNgCbBWyPrV' },
      { headers: { 'Content-Type': 'application/json' } });

    const { access_token } = getToken.data.response;

    const getCertifications = await axios.get(`https://api.iamport.kr/certifications/${imp_uid}`,
      { headers: { Authorization: access_token } }
    );

    const certificationsInfo = getCertifications.data;

    res.send(certificationsInfo);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;