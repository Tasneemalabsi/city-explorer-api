const axios = require('axios');
module.exports = handleMoviesData;
let inMemory={};

async function handleMoviesData(req,res){
    let query= req.query.query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_KEY}&query=${query}`
    let arr = [];


   if (inMemory[query] !== undefined) {
        console.log(' cache hit , data in cache memory');
        res.send(inMemory[query]);
    }

    else {
        console.log(' cache miss , send req to unsplash API');
    try{
        let movieData= await axios.get(url);
        
            console.log('the search city is', query);
       movieData.data.results.map(city=>{
           
        
           let cityMovieData=new movieDataConst (city.title, city.overview, city.vote_average,city.vote_count,`https://image.tmdb.org/t/p/w500${city.poster_path}`,city.popularity,city.release_date);
           
           arr.push(cityMovieData);   }
    )
          inMemory[query] = arr;
         res.send(arr);
         console.log(arr);
        }
        
    catch(error) {
        console.log('THE ERROR IS :',error);
        res.send(error);
    }
    
    
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
