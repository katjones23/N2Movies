
  
  const MOVIE_DB_API = 'd1ed99d95a5d38c111b41d8edc21c062';
  const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';

  
$(document).ready(function () {
  $('.sidenav').sidenav();
});


$(document).ready(function () {
  $('select').formSelect();
});


$(document).ready(function () {
  //DtDD API
  var dtddAPIKey = "fa2a38047e3e593c5387a8ba5da60da0"
  var dtddUrl = "https://cors-anywhere.herokuapp.com/https://www.doesthedogdie.com/dddsearch?q="
  var dtddUrlMedia = "https://cors-anywhere.herokuapp.com/https://www.doesthedogdie.com/media/"

  //Get the DDD ID
  $.ajax({
    // test string for search, update once var available
    url: dtddUrl + "old%20yeller",
    method: "GET",
    headers: {
      "Accept": "application/json",
      "X-API-Key": dtddAPIKey,
    },
  })
    .then(function (response) {
      var dddID = response.items[0].id;
      console.log(response)
      var dddMovieURL = "https://www.doesthedogdie.com/media/" + dddID

      //Get topic
      $.ajax({
        url: dtddUrlMedia + dddID,
        method: "GET",
        headers: {
          "Accept": "application/json",
          "X-API-Key": dtddAPIKey,
        },
      })
        .then(function (response) {
          var topicItems = response.topicItemStats
          var topics = [];
          var animalDisclaimer = "";
          var violenceDisclaimer = "";
          var medicalDisclaimer = "";
          var everythingElseDisclaimer = "";

          // for each item, see if yes > no
          topicItems.forEach(function (item, index) {
            if (item.yesSum >= item.noSum) {
              var topicName = topicItems[index].topic.name
              topics.push(topicName);
              console.log("Users report " + topicName)
            }
          });

          if (topics.includes("a dog dies") || topics.includes("animals are abused") || topics.includes("an animal dies")
            || topics.includes("a cat dies") || topics.includes("a horse dies")) {
            animalDisclaimer = "*depictions of animals hurt or dying"
          };

          if (topics.includes("heads get squashed") || topics.includes("someone is burned alive") || topics.includes("teeth are damaged")
            || topics.includes("someone breaks a bone") || topics.includes("there's eye mutilation") || topics.includes("there's finger/toe mutilation")
            || topics.includes("there's shaving/cutting") || topics.includes("there's torture") || topics.includes("someone self harms")
            || topics.includes("a parent dies") || topics.includes("someone is kidnapped") || topics.includes("a kid dies")
            || topics.includes("someone is stalked") || topics.includes("electro-therapy is used") || topics.includes("someone dies by suicide")
            || topics.includes("a pregnant woman dies") || topics.includes("someone is sexually assaulted") || topics.includes("an LGBT person dies")
            || topics.includes("the black guy dies first") || topics.includes("there's gun violence") || topics.includes("there's a nuclear explosion")
            || topics.includes("there's domestic violence") || topics.includes("there's child abuse") || topics.includes("someone falls to their death")
            || topics.includes("there are hangings") || topics.includes("someone is buried alive") || topics.includes("a plane crashes") 
            || topics.includes("someone drowns") || topics.includes("there's blood/gore") || topics.includes("a car crashes") || topics.includes("someone struggles to breathe")
            || topics.includes("a person is hit by a car")) {
            violenceDisclaimer = "*disturbing images of/references to violence, injury, or death"
          };

          if (topics.includes("somone has a seizure") || topics.includes("needles/syringes are used") || topics.includes("there's a hospital scene")
          || topics.includes("someone has cancer") || topics.includes("there's a mental institution scene") || topics.includes("there's body dysmorphia") 
          || topics.includes("someone has an anxiety attack") || topics.includes("someone has an eating disorder") || topics.includes("someone miscarries")
          || topics.includes("someone has an abortion") || topics.includes("there's childbirth")) {
            medicalDisclaimer = "*certain medical situations or settings"
          }

          if (topics.includes("there are spiders") || topics.includes("there are snakes") || topics.includes("there are bugs") || topics.includes("someone cheats") 
          || topics.includes("someone is possessed") || topics.includes("there are shower scenes") || topics.includes("there are clowns") 
          || topics.includes("there's ghosts") || topics.includes("there are jumpscares") || topics.includes("someone vomits") || topics.includes("there's farting or spitting")
          || topics.includes("there's a claustrophobic scene") || topics.includes("someone gets gaslighted") || topics.includes("there are strobe effects")
          || topics.includes("shaky cam is used") || topics.includes("there are incestuous relationships") || topics.includes("there is sexual content") 
          || topics.includes("someone speaks hate speech") || topics.includes("someone is misgendered") || topics.includes("there's fat jokes") 
          || topics.includes("there's antisemitism") || topics.includes("there's ableist language or behavior") || topics.includes("Santa (et al) is spoiled")
          || topics.includes("the ending is sad") || topics.includes("alcohol abuse") || topics.includes("there's addiction") || topics.includes("someone uses drugs")) {
            everythingElseDisclaimer = "*other imagery some viewers may not want"
          }
         
          // in the page, add with br tags to break up groups
          console.log("This may contain: " + animalDisclaimer + violenceDisclaimer + medicalDisclaimer + everythingElseDisclaimer)
          console.log("Please see " + dddMovieURL + " for more information.")
        })
        .catch(function (error) {
          alert("not working")
        })
    })
    .catch(function (error) {
      alert("not working")
    })
})



  $(document).ready(function(){
    
//main search feature

function multiSearch(search) {
  $.ajax({
    url: MOVIE_DB_ENDPOINT + "/3/search/multi?api_key=" + MOVIE_DB_API + "&language=en-US&query=" + search + "&page=1&include_adult=false",
    method:"GET"})
      .done(function(searchResult){
      console.log("this multi search", searchResult);
})
}


//genres give you a genre id
//the id can be used to seach the top rated or popular by genre id
//return the results onto the page of the genre


function genreSearch(genreID) {
  $.ajax({
    url: MOVIE_DB_ENDPOINT + "/3/discover/movie?api_key=" + MOVIE_DB_API + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" + genreID,
    method:"GET"})
    .done(function(searchResult){
      console.log("genre search result", searchResult);
  })
}




//when on the page of a tv show or movie
//recomendations will be based off of the movie id of movie page that you're on when you click on a movie
//similar tv shows will be based off of movie id of the movie/show you're on.



//SIMILAR TV

  function getsimilarTV(tvID) {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/tv/" + tvID +"/similar?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(tvSimilarResult){
        console.log(tvSimilarResult.results)
        var similarTV = []
        for (let index = 0; index < 20; index++) {
            var similarTvData = {}
              similarTvData.poster_path = tvSimilarResult.results[index].poster_path;
              similarTvData.title = tvSimilarResult.results[index].title; 
              similarTvData.vote_average = tvSimilarResult.results[index].vote_average;
        similarTV.push(similarTvData);
      }
      console.log(similarTV);
    })
  }
  //getsimilarTV();


//RECOMMENDED TV
  function getRecommendedTV(tvID) {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/tv/" + tvID +"/recommendations?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(tvRecommendedResult){
        console.log(tvRecommendedResult.results)
        var recommendedTV = []
        for (let index = 0; index < 20; index++) {
            var recommendedTvData = {}
              recommendedTvData.poster_path = tvRecommendedResult.results[index].poster_path;
              recommendedTvData.title = tvRecommendedResult.results[index].title;
              recommendedTvData.vote_average = tvRecommendedResult.results[index].vote_average;
        recommendedTV.push(recommendedTvData);
      }
      console.log(recommendedTV);
    })
  }
  //getRecommendedTV();


//SIMILAR MOVIES
  function getSimilarMovie(movieID) {
    console.log(movieID)
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/movie/" + movieID + "/similar?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(movieSimilarResult){
        console.log(movieSimilarResult.results)
        var similarMovie = []
        for (let index = 0; index < 20; index++) {
            var similarMovieData = {}
              //similarMovieData.poster_path = movieSimilarResult.results[index].poster_path;
              similarMovieData.title = movieSimilarResult.results[index].title;
              similarMovieData.vote_average = movieSimilarResult.results[index].vote_average;
        similarMovie.push(similarMovieData);
      }
      renderMovies(similarMovie);
    })
  }
  getSimilarMovie('10752'); //added that movie id for testing


  function renderMovies(movieArray) {
    console.log("render function", movieArray)
    for (let index = 0; index < movieArray.length; index++) {
      var mainDiv = $("<div>").addClass("cardContent");
      var movieTitle = "<p> Title: "+ movieArray[index].title + "</p>";
      // need one for getting the poster_path
      // need one for overview

      //EXAMPLE var day = $("<img>").attr("src", "http://openweathermap.org/img/w/" + forecastData[0].weather[0].icon + ".png");
      //EXAMPLE var temp = "<p> Temp: "+ forecastData[index].main.temp + "°F</p>";
      //EXAMPLE var forecastHumidity = "<p> Humidity: "+ forecastData[index].main.humidity + "%</p>";
      mainDiv.append(movieTitle);
      $("#movieHolder").append(mainDiv);
}
  } 

//RECOMMENDED MOVIES
  function getRecommendedMovie(movieID) {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/movie/" + movieID + "/recommendations?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(movieRecommendedResult){
        console.log(movieRecommendedResult.results)
        var recommendedMovie = []
        for (let index = 0; index < 20; index++) {
            var recommendedMovieData = {}
              recommendedMovieData.poster_path = movieRecommendedResult.results[index].poster_path;
              recommendedMovieData.title = movieRecommendedResult.results[index].title;
              recommendedMovieData.vote_average = movieRecommendedResult.results[index].vote_average;
        recommendedMovie.push(recommendedMovieData);
      }
      console.log(similarMovie);
    })
  }
  //getRecommendedMovie();

    
//MOVIES TOP RATED
  function getTopRatedMovies() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/movie/top_rated?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(result){
        console.log(result.results)
        var topRated = []
        for (let index = 0; index < 20; index++) {
            var topRatedMovies = {}
              topRatedMovies.poster_path = result.results[index].poster_path;
              topRatedMovies.title = result.results[index].title;
              topRatedMovies.vote_average = result.results[index].vote_average;
        topRated.push(topRatedMovies);
      }
      console.log(topRated);
    })
  }

  function getTopRatedMovies() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/movie/top_rated?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(result){
        console.log(result.results)
        var topRated = []
        for (let index = 0; index < 20; index++) {
            var topRatedMovies = {}
              topRatedMovies.poster_path = result.results[index].poster_path;
              topRatedMovies.title = result.results[index].title;
              topRatedMovies.vote_average = result.results[index].vote_average;
        topRated.push(topRatedMovies);
        dtddAPI(topRatedMovies.title);
      }
      console.log(topRated);
    })
  }


//MOVIES POPULAR
  function getPopularMovies() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/movie/popular?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(result){
        console.log(result.results)
        var popular = []
        for (let index = 0; index < 20; index++) {
            var popularMovies = {}
              popularMovies.poster_path = result.results[index].poster_path;
              popularMovies.title = result.results[index].title;
              popularMovies.vote_average = result.results[index].vote_average;
        popular.push(popularMovies);
      }
      console.log(popular);
    })
  }
    

//MOVIES TRENDING
  function getTrendingMovies () {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/trending/movie/day?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(result){
        console.log(result.results)
        var trending = []
        for (let index = 0; index < 20; index++) {
            var trendingMovies = {}
              trendingMovies.poster_path = result.results[index].poster_path;
              trendingMovies.title = result.results[index].title;
              trendingMovies.vote_average = result.results[index].vote_average;
        trending.push(trendingMovies);
      }
      console.log(trending);
    })
  }
    
//getTopRatedMovies();
//getPopularMovies();
//getTrendingMovies();

  
//TV TOP RATED
  function getTopRatedTv() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/tv/top_rated?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(result){
        console.log(result.results)
        var tvTopRated = []
        for (let index = 0; index < 20; index++) {
            var tvTopRatedTV = {}
              tvTopRatedTV.poster_path = result.results[index].poster_path;
              tvTopRatedTV.title = result.results[index].title;
              tvTopRatedTV.vote_average = result.results[index].vote_average;

          tvTopRated.push(tvTopRatedTV);
      }
      console.log(tvTopRated);
    })
  }
    

//TV POPULAR
  function getPopularTv() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/tv/top_rated?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(result){
        console.log(result.results)
        var tvPopular = []
        for (let index = 0; index < 20; index++) {
            var tvPopularTV = {}
              tvPopularTV.poster_path = result.results[index].poster_path;
              tvPopularTV.title = result.results[index].title;
              tvPopularTV.vote_average = result.results[index].vote_average;
        tvPopular.push(tvPopularTV);
      }
      console.log(tvPopular);
    })
  }
    

//TV TRENDING
  function getTrendingTv() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/trending/tv/day?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(result){
        console.log(result.results)
        var tvTrending = []
        for (let index = 0; index < 20; index++) {
            var tvTrendingTV = {}
              tvTrendingTV.poster_path = result.results[index].poster_path;
              tvTrendingTV.title = result.results[index].title;
              tvTrendingTV.vote_average = result.results[index].vote_average;

          tvTrending.push(tvTrendingTV);
      }
      console.log(tvTrending);
    })
  }

//getTopRatedTv();
//getPopularTv();
//getTrendingTv();


    $('.sidenav').sidenav();
    $('select').formSelect();
    $('#searchButton').click(function(){
      var mainSearch = $(this)[0].previousElementSibling.value;
      multiSearch(mainSearch);
    })

    $('.genreChoice').click(function(){
          console.log("Genre Here")
          var genreResults = $(this).text();
          if (genreResults == 'Comedy') {
            genreSearch(35);
          }
          else if (genreResults == 'Drama') {
            genreSearch(18);
          }
     })

     

     //genreSearch(35); //comedy
    //  genreSearch(18); //drama
    //  genreSearch(28); //action
    //  genreSearch(14); //fantasy
    //  genreSearch(16); //animation
    //  genreSearch(10749); //romance




});

