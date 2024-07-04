const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

router.get('/', (req, res) => {
    const { title, theaterName, screenHallName, time, userId, screenDate } = req.query;

    if (userId) {
        db.query(`SELECT * FROM ticketing WHERE user_id='${userId}' ORDER BY screen_date`, (err, data) => {
            if (err) {
                return res.send(err);
            }

            res.status(200).send(data);
        })
    } else {
        db.query(`SELECT seat FROM ticketing WHERE movie_title='${title}' AND theater_name='${theaterName}' AND screen_hall_name='${screenHallName}' AND screen_time='${time}' AND screen_date='${screenDate}'`, (err, data) => {
            if (err) {
                return res.send(err);
            }

            res.status(200).send(data);
        })
    }
})

router.post('/', (req, res) => {
    const { theaterName, screenHallName, movieTitle, screenTime, seat, status, screenDate, userId, createdAt } = req.body;

    // 현재 로그인한 계정으로 예약중인 영화가 있는지 확인
    db.query(`SELECT * FROM ticketing WHERE user_id = '${userId}' AND status = '${status}'`, (err, data) => {
        if (err) {
            return res.send(err);
        }

        // data.length === 0 : 현재 로그인 한 계정으로 예약중인 영화가 없으면
        // data.length !== 0 : 현재 로그인 한 계정으로 예약중인 영화가 있으면
        const query = data.length === 0
            ? `INSERT INTO ticketing (theater_name, screen_hall_name, movie_title, screen_time, seat, status, screen_date, user_id, created_at) VALUES ('${theaterName}', '${screenHallName}', '${movieTitle}', '${screenTime}', '${seat}', '${status}', '${screenDate}', '${userId}', '${createdAt}')`
            : `INSERT INTO ticketing VALUES ('${data[0].id}', '${theaterName}', '${screenHallName}', '${movieTitle}', '${screenTime}', '${seat}', '${status}', '${screenDate}', '${userId}', '${createdAt}') on duplicate key update theater_name='${theaterName}' , screen_hall_name='${screenHallName}', movie_title='${movieTitle}', screen_time='${screenTime}', seat='${seat}', status='${status}', screen_date='${screenDate}', user_id='${userId}', created_at='${createdAt}'`;

        db.query(query, (err, data) => {
            if (err) {
                return res.send(err);
            }

            res.status(200).send({ ticketingId: data.insertId, ticketingCreatedAt: createdAt });
        })
    })
});

router.delete('/:id/:status', (req, res) => {
    const { id, status } = req.params;

    console.log(req.params);

    db.query(`DELETE FROM ticketing WHERE id = '${id}' AND status='${status}'`, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.status(200).send();
    })
})

module.exports = router;