'use strict';

const express = require('express');
require('dotenv').config();
const server = express();
// const cors = require('cors');
const weatherData = require('./data/weather.json')



const PORT = process.env.PORT || 3001 ;
// server.use(cors());

server.get('/weather', (request,response)=>{
    let lat = req.query.lat;
    let lon= req.query.lon;

})


server.listen(PORT,()=>{
    console.log(`Listning on PORT ${PORT}`)
})





