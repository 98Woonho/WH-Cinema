const axios = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../config/db.js');
const bcrypt = require('bcrypt');
const tokenUtils = require('../../src/utils/tokenUtils.js');

router.get('/', (req, res) => {
  const { name, birthday, phone } = req.query;
  db.query(`select * from user where name = '${name}' and birthday = '${birthday}' and phone = '${phone}'`, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  })
})

router.get('/token', (req, res) => {
  const { userId } = req.query;
  db.query(`select token from token where userId = '${userId}'`, (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send(err);
    }
  })
})

router.post('/login', (req, res) => {
  const { userId, password } = req.body;

  db.query(`select * from user where userId='${userId}'`, (err, data) => {
    if (!err) {
      if (data.length == 0 || !bcrypt.compareSync(password, data[0].password)) {
        res.status(400).json({ error: '아이디 혹은 비밀번호가 올바르지 않습니다. 다시 한 번 확인해 주세요.' });
      } else {
        const accessToken = tokenUtils.makeAccessToken({userId: userId});
        const refreshToken = tokenUtils.makeRefreshToken();

        res.cookie("authorization", `Bearer ${accessToken}`);

        db.query(`insert into token values('${userId}', '${refreshToken}') ON DUPLICATE KEY UPDATE token='${refreshToken}'`, (err, data) => {
          if (!err) {
            res.status(200).send({userId, accessToken, refreshToken});
          } else {
            res.send(err);
          }
        })
      }
    } else {
      res.send(err);
    }
  })
});

router.post('/join', (req, res) => {
  const { userId, password, name, birthday, phone } = req.body;
  db.query(`select * from user where userId='${userId}'`, (err, data) => {
    if (!err) {
      if (data.length != 0) {
        res.status(409).json({ error: '이미 존재하는 아이디 입니다. 다른 아이디를 입력해 주세요.' });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const role = 'USER';
        db.query(`insert into user values('${userId}', '${hashedPassword}', '${name}', '${birthday}', '${phone}', '${role}')`, (err, data) => {
          if (!err) {
            res.status(201).json({ message: '회원가입이 완료 되었습니다.' });
          } else {
            res.send(err);
          }
        })
      }
    } else {
      res.send(err);
    }
  })
})

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