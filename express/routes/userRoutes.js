const axios = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../config/db.js');
const bcrypt = require('bcrypt');
const tokenUtils = require('../../src/utils/tokenUtils.js');
const jwt = require('jsonwebtoken');

// formData 요청을 위한 모듈
const multer = require('multer');
const upload = multer();

router.get('/', (req, res) => {
  const { name, birthday, phone, userId } = req.query;

  let query = 'SELECT user_id, name, birthday, phone, role FROM user';

  if (userId) {
    query += ` WHERE user_id = '${userId}'`;
  }

  if (!userId) {
    query += ` WHERE name = '${name}' and birthday = '${birthday}' and phone = '${phone}'`;
  }

  db.query(query, (err, data) => {
    if (err) {
      res.send(err);
    }

    res.send(data);
  });
})

router.get('/verify', (req, res) => {
  const cookies = req.cookies;

  if (!cookies.refresh || !cookies.access) { // refresh cookie || access cookie가 없을 때 (쿠키가 만료 되어서 사라졌거나, 강제로 쿠키를 삭제한 경우)
    res.status(401).send();
    return;
  }

  const accessToken = cookies.access.split('Bearer ')[1];
  const refreshToken = cookies.refresh.split('Bearer ')[1];
  const accessVerifyResult = tokenUtils.verify(accessToken);

  // 1-1 . accessToken이 만료 되었을 때
  if (!accessVerifyResult) {

    // 2. accessToken의 payload에 있는 userId를 가져와서, db에서 해당 유저의 refreshToken을 가져옴.

    const decodedToken = jwt.decode(accessToken); // accessToken을 decode해서 payload 정보 가져오기
    const userId = decodedToken.userId; // payload에 있는 userId

    // 3. 쿠키에 있는 refreshToken을 가져와서 db에 있는 refreshToken이랑 비교 함.
    db.query(`SELECT token FROM token WHERE user_id = '${userId}'`, (err, data) => {
      if (!err) {
        const dbRefreshToken = data[0].token;

        if (refreshToken === dbRefreshToken) { // 3-1. 같다! 그러면 refreshToken의 유효성 검증을 함.
          const refreshVerifyResult = tokenUtils.refreshVerify(refreshToken);
          if (!refreshVerifyResult.ok) { // 4. refreshToken이 만료 되었을 때 로그아웃 처리
            res.status(401).send();
          } else { // 5. refreshToken이 유효하면 accessToken을 재발급 후 쿠키에 저장
            const newAccessToken = tokenUtils.makeAccessToken({ userId: userId });
            res.cookie('access', `Bearer ${newAccessToken}`, { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true });
            res.status(200).send();
          }
        } else { // 3-2. 다르다? 로그아웃 처리 
          res.status(401).send();
        }
      } else { // db에서 refreshToken 가져오는데 오류가 발생
        res.send(err);
      }
    })
  } else {
    // 1-2. accessToken이 만료 되지 않았을 때
    res.status(200).send();
  }
})


router.get('/accessVerify', (req, res) => {
  const { accessToken } = req.query;

  const result = tokenUtils.verify(accessToken);

  res.send(result);
})

router.get('/refreshVerify', (req, res) => {
  const { refreshToken } = req.query;

  const result = tokenUtils.refreshVerify(refreshToken);

  res.send(result);
})

router.get('/refreshToken', (req, res) => {
  const { userId } = req.query;
  db.query(`SELECT token FROM token WHERE user_id = '${userId}'`, (err, data) => {
    if (err) {
      res.send(err);
    }

    res.send(data[0].token);
  })
})

router.get('/accessTokenPayload', (req, res) => {
  const cookies = req.cookies;

  if (!cookies.refresh || !cookies.access) { // refresh cookie || access cookie가 없을 때 (쿠키가 만료 되어서 사라졌거나, 강제로 쿠키를 삭제한 경우)
    res.status(401).send();
    return;
  }
  const accessToken = cookies.access.split('Bearer ')[1];

  const result = tokenUtils.getAccessTokenPayload(accessToken);

  res.send(result);
})

router.post('/login', upload.none(), (req, res) => {
  const { userId, password, rememberMe } = req.body;

  db.query(`SELECT * FROM user WHERE user_id='${userId}'`, (err, data) => {
    if (!err) {
      if (data.length == 0 || !bcrypt.compareSync(password, data[0].password)) {
        res.status(400).send();
      } else {
        const accessToken = tokenUtils.makeAccessToken({ userId: userId });
        const refreshToken = tokenUtils.makeRefreshToken({ userId: userId }, rememberMe ? '7d' : '1d');

        res.cookie("access", `Bearer ${accessToken}`, { httpOnly: true, maxAge: 7 * 24 * 3600 * 1000 });
        res.cookie("refresh", `Bearer ${refreshToken}`, { httpOnly: true, maxAge: rememberMe ? 7 * 24 * 3600 * 1000 : 24 * 3600 * 1000 });

        db.query(`insert into token values('${userId}', '${refreshToken}') ON DUPLICATE KEY UPDATE token='${refreshToken}'`, (err, data) => {
          if (!err) {
            res.status(200).send();
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

router.post('/join', upload.none(), (req, res) => {
  const { userId, password, name, birthday, phone } = req.body;
  db.query(`SELECT * FROM user WHERE user_id='${userId}'`, (err, data) => {
    if (!err) {
      if (data.length != 0) {
        res.status(409).json({ msg: '이미 존재하는 아이디 입니다. 다른 아이디를 입력해 주세요.' });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const role = 'USER';
        db.query(`insert into user values('${userId}', '${hashedPassword}', '${name}', '${birthday}', '${phone}', '${role}')`, (err, data) => {
          if (!err) {
            res.status(201).json({ msg: '회원가입이 완료 되었습니다.' });
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

// 로그아웃 시 jwt 쿠키 삭제
router.post('/logout', (req, res) => {
  res.clearCookie('access', { httpOnly: true });
  res.clearCookie('refresh', { httpOnly: true });
  res.status(200).send();
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

router.patch('/', (req, res) => {
  const { newUserId, currentUserId, newPassword, currentPassword, newName, newPhone } = req.body;

  // 아이디 변경 시
  if (newUserId) {

    // 변경할려는 userId와 같은 userId의 데이터 SELECT
    db.query(`SELECT * FROM user WHERE user_id='${newUserId}'`, (err, data) => {
      if (err) {
        return res.send(err);
      }

      // 데이터가 존재 할 때
      if (data.length > 0) {
        return res.status(409).json({ msg: '이미 존재하는 아이디 입니다. 다른 아이디를 입력해 주세요.' });
      }

      // 데이터가 존재하지 않을 때 userId UPDATE
      db.query(`UPDATE user SET user_id='${newUserId}' WHERE user_id='${currentUserId}'`, (err, data) => {
        if (err) {
          res.send(err);
        }

        res.status(200).json({ msg: '아이디가 변경 되었습니다. 로그인을 다시 해주세요.' });
      })
    })
  }

  // 비밀번호 변경 시
  if (newPassword) {
    db.query(`SELECT * FROM user WHERE user_id='${currentUserId}'`, (err, data) => {
      if (err) {
        return res.send(err);
      }

      if (!bcrypt.compareSync(currentPassword, data[0].password)) {
        return res.status(401).json({ msg: '현재 비밀번호가 일치하지 않습니다. 확인 후 다시 입력 해주세요.' });
      }

      if (bcrypt.compareSync(newPassword, data[0].password)) {
        return res.status(400).json({ msg: '현재 비밀번호와 동일한 비밀번호 입니다. 다른 비밀번호를 입력해 주세요.' });
      }

      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

      db.query(`UPDATE user SET password='${hashedNewPassword}' WHERE user_id='${currentUserId}'`, (err, data) => {
        if (err) {
          res.send(err);
        }

        res.status(200).json({ msg: '비밀번호가 변경 되었습니다. 로그인을 다시 해주세요.' });
      })
    })
  }

  if (newName && newPhone) {
     db.query(`UPDATE user SET name='${newName}', phone='${newPhone}' WHERE user_id='${currentUserId}'`, (err, data) => {
      if (err) {
        res.send(err);
      }

      res.status(200).json({ msg: '이름 및 휴대폰 번호가 변경 되었습니다. 로그인을 다시 해주세요.'});
     })
  }
})

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;

  db.query(`DELETE FROM user WHERE user_id='${userId}'`, (err, data) => {
    if (err) {
      res.send(err);
    }

    res.status(200).send();
  })
})

module.exports = router;