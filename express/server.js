const auth = require('./middlewares/authMiddleware.js')
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const port = 4000;
const db = require('./config/db.js');
const bodyParser = require('body-parser');

require('dotenv').config();
app.use(bodyParser.json());

app.get('/movie', (req, res) => {
    db.query(`select * from movie`, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    })
});

app.get('/movie/:title', (req, res) => {
    const title = req.params.title;
    db.query(`select * from movie where title = '${title}'`, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    })
});

app.get('/movie/:date1/:date2', (req, res) => {
    const date1 = req.params.date1;
    const date2 = req.params.date2;
    db.query(`select * from movie where releasedate <= '${date1}' AND releasedate >= '${date2}'`, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    })
});

app.post('/user/login', (res) => {
    const key = process.env.SECRET_KEY;
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

app.listen(port,()=>{
    console.log(`Server Started ${port}`);
});