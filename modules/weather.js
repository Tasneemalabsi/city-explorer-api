const axios = require('axios');
module.exports = handleWeatherData;


async function handleWeatherData (request,response) {
    let lat = request.query.lat;
    let lon= request.query.lon;
    let searchquery=request.query.searchquery;
    // let url = (`https://api.weatherbit.io/v2.0/current?key=${process.env.MY_KEY}&lat=${lat}&lon=${lon}`);
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.MY_KEY}`
    
    let arr = [];
    try{
    let weatherData= await axios.get(url);
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



class Forecast {
 constructor(date, description){
        this.date = date;
        this.description=description;
         
    }

}