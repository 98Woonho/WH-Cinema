const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

router.post('/', (req, res) => {
    const { impUid, merchantUid, payMethod, paidAmount, status, ticketingId, userId, payDate } = req.body;

    db.query(`INSERT INTO payment (ticketing_id, imp_uid, merchant_uid, user_id, paid_amount, pay_date, pay_method, status) VALUES('${ticketingId}', '${impUid}', '${merchantUid}', '${userId}', '${paidAmount}', '${payDate}', '${payMethod}', '${status}')`, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.status(200).send();
    })
})


module.exports = router;