'use strict';

const express = require('express');
require('dotenv').config();
const server = express();
const cors = require('cors');
const weatherData = require('./data/weather.json')



const PORT = process.env.PORT || 3001 ;
server.use(cors());

server.get('/weather', (request,response)=>{
    let lat = request.query.lat;
    let lon= request.query.lon;
    let searchquery=request.query.searchquery;
    let arr = []

    
    try{
    let renderedData =weatherData.find(city=>{
        if( city.city_name.toLowerCase()===searchquery) {
            return city;
        }
    });
    
   renderedData.data.map(city=>{
       let cityData=new Forecast (city.datetime, `Low of ${city.low_temp}, high of ${city.max_temp} with ${city.weather.description}`);
       arr.push(cityData);
   }
)
response.send(arr)}
catch {
    response.send('{"error"  :  "Something went wrong."}');
}



})


server.listen(PORT,()=>{
    console.log(`Listning on PORT ${PORT}`)
})

class Forecast {
 constructor(date, desc){
        this.date = date;
        this.desc=desc;
         
    }

}




