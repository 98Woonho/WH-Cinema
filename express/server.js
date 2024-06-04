const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const movieRoutes = require('./routes/movieRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const theaterRoutes = require('./routes/theaterRoutes.js');
const ticketingRoutes = require('./routes/ticketingRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/movie', movieRoutes);
app.use('/user', userRoutes);
app.use('/theater', theaterRoutes);
app.use('/ticketing', ticketingRoutes);
app.use('/payment', paymentRoutes);

app.listen(port,()=>{
    console.log(`Server Started ${port}`);
});