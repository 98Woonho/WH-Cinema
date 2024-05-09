const express = require('express')
const app = express()
const port = 4000
const db = require('./config/db.js')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/movie', (req, res) => {
    db.query(`select * from movie`, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.send(err)
        }
    })
})

app.get('/movie/:currentDate/:sixtyDaysAgoDate', (req, res) => {
    const currentDate = req.params.currentDate
    console.log(currentDate)
    const sixtyDaysAgoDate = req.params.sixtyDaysAgoDate
    db.query(`select * from movie where releaseDate <= '${currentDate}' AND releaseDate >= '${sixtyDaysAgoDate}'`, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.send(err)
        }
    })
})

app.listen(port,()=>{
    console.log(`Server Started ${port}`)
})