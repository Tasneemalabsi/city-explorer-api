'use strict';

const express = require('express');
require('dotenv').config();
const server = express();
const cors = require('cors');
const axios = require('axios');
// const weatherData = require('./data/weather.json')



const PORT = process.env.PORT;
server.use(cors());
server.get('/weather',handleWeatherData);
server.get('/movies',handleMoviesData);


// (`https://api.weatherbit.io/v2.0/current?lat=${lat}&&${lon}key=${process.env.MY_KEY}&&city=${searchquery}`)
async function handleWeatherData (request,response) {
    let lat = request.query.lat;
    let lon= request.query.lon;
    let searchquery=request.query.searchquery;
    // let url = (`https://api.weatherbit.io/v2.0/current?key=${process.env.MY_KEY}&lat=${lat}&lon=${lon}`);
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.MY_KEY}`
    
    let arr = [];
    try{
    let weatherData= await axios.get(url);
    // console.log('the weather data from axios: ', weatherData.data);
    
    
    // let renderedData =weatherData.data.data.find(city=>{
    //     if( parseInt(city.lat)===lat && parseInt(city.lon)===lon) {
    //         return city;
    //     }
    // });
    // console.log('the rendered data for the map:' ,renderedData);
    
   weatherData.data.data.map(city=>{
       let cityData=new Forecast (city.datetime, `Low of ${city.low_temp}, high of ${city.max_temp} with ${city.weather.description}`);
       arr.push(cityData);   }
)
response.send(arr)
    }
    
catch(error) {
    console.log('THE ERROR IS HHHHHHHHH :',error);
    response.send(error);
}
}



// https://api.themoviedb.org/3/search/movie?api_key=&query=city
// localhost:3001/ -
async function handleMoviesData(req,res){
let query= req.query.query;
let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_KEY}&query=${query}`
let arr = [];
try{
    let movieData= await axios.get(url);
    // console.log(movieData.data.results);
    // let renderedData =movieData.data.results.find(location=>{
    //         if( location.title.includes(query.toString()) ) {
    //             console.log(query.toString());
    //             return location;
    //         }
    //     })
        // console.log('the rendered data results are: ',renderedData);
        // console.log('the data from axios are :', movieData.data);
        console.log('the search city is', query);
   movieData.data.results.map(city=>{
    //    console.log('the city object is : ',city);
       
    
       let cityMovieData=new movieDataConst (city.title, city.overview, city.vote_average,city.vote_count,`https://image.tmdb.org/t/p/w500${city.poster_path}`,city.popularity,city.release_date);
       
       arr.push(cityMovieData);   }
)
res.send(arr)
    }
    
catch(error) {
    console.log('THE ERROR IS :',error);
    res.send(error);
}


}

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})

class Forecast {
 constructor(date, description){
        this.date = date;
        this.description=description;
         
    }

}

class movieDataConst {
    constructor(title,overview,average_votes,total_votes,image_url,popularity,released_on){
        this.title=title;
        this.overview=overview;
        this.average_votes=average_votes;
        this.total_votes=total_votes;
        this.image_url=image_url;
        this.popularity=popularity;
        this.released_on=released_on
    }
}




