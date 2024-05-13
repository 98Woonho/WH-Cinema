const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const movieRoutes = require('./routes/movieRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/movie', movieRoutes);
app.use('/user', userRoutes);

app.listen(port,()=>{
    console.log(`Server Started ${port}`);
});