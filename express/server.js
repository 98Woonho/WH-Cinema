const express = require('express')
const app = express()
const port = 4000
const db = require('./config/db.js')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/movie', (req, res) => {
    db.query(`select * from movie`, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    })
})

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
})

app.listen(port,()=>{
    console.log(`Server Started ${port}`);
})