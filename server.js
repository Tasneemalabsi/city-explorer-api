'use strict';

const express = require('express');
require('dotenv').config();
const server = express();
const cors = require('cors');
const handleMoviesData = require('./modules/movies.js');
const handleWeatherData = require('./modules/weather.js');


const PORT = process.env.PORT;
server.use(cors());
server.get('/weather',handleWeatherData);
server.get('/movies',handleMoviesData);


server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})






