const express = require('express')
const app = express()
const port = 4000
const db = require('./config/db.js')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/search/:title', (req, res) => {
    const title = req.params.title
    db.query(`select * from movie where title like '%${title}%'`, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            res.send(err)
        }
    })
})

app.post('/movie', (req, res) => {
    const {title, genre, posters, releaseDate, runtime, plot, rating} = req.body

    db.query(`insert into movie values('${title}', '${genre}', '${posters}', '${releaseDate}', ${runtime}, '${plot}', '${rating}')`, (err, data) => {
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