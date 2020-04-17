const MOVIE_DB_API = 'd1ed99d95a5d38c111b41d8edc21c062';
const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';

$(document).ready(function () {
  $('.sidenav').sidenav();
});

$(document).ready(function () {
  $('select').formSelect();
});

//  Recent search storage
// ******div with class searchHistoryBlock needs to be added to HTML as well as styling for div and the search items
var searchHistoryBlock = $(".searchHistoryBlock");
var prevMovieSearches = [];

function init() {
  var storedSearches = JSON.parse(localStorage.getItem("prevMovieSearchesStore"));

  if (storedSearches !== null) {
    prevMovieSearches = storedSearches;
    renderPrevSearches();
  } else {
    return;
  };
};

init();

function renderPrevSearches() {
  $(searchHistoryBlock).empty();

  if (prevMovieSearches.length > 5) {
    prevMovieSearches.splice(0, 1);
  }

  for (var i = 0; i < prevMovieSearches.length; i++) {
    var prevSearch = prevMovieSearches[i];
    var div = $("<div>")

    $(searchHistoryBlock).css("display", "block")
    $(div).text(prevSearch);
    $(div).addClass("searchHistoryItem");
    $(searchHistoryBlock).prepend(div);
  }
}

function localSaveSearch() {
  var inputText = $("#zInput").val();
  
  prevMovieSearches.push(inputText);
  localStorage.setItem("prevMovieSearchesStore", JSON.stringify(prevMovieSearches));

  renderPrevSearches();

};

// ******PLEASE SEE HERE FOR MODS FOR PUSHING TO CARDS
function addResultstoDOM(section, imageSRC, movieTitle, movieRated, movieReview, movieID, paraInfo) {
  $('.modal').modal();

  var modalId = "modal" + movieID
  
  var column = $("<div>").addClass("col");
  column.addClass("s6")
  column.addClass("m4")
  column.addClass("l2")
  
  var card = $("<div>").addClass("card");
  
  var cardImageDiv = $("<div>").addClass("card-image");

  var cardImage = $("<img>").addClass("picBox");
  cardImage.attr("src", imageSRC);

  var cardContent = $("<div>").addClass("card-content");
  
  var cardTitle = $("<div>").addClass("cardTitle");
  cardTitle.text(movieTitle);
  
  var movieIsRated = $("<div>").addClass("movieIsRated");
  movieIsRated.text(movieRated);
  
  var movieRating = $("<div>").addClass("movieRating");
  movieRating.text(movieReview)
  
  var cardAction = $("<div>").addClass("card-action");
  
  var aModalTrigger = $("<a>").addClass("waves-effect");
  aModalTrigger.addClass("waves-light");
  aModalTrigger.addClass("btn");
  aModalTrigger.addClass("modal-trigger");
  aModalTrigger.attr("href", "#" + modalId);
  aModalTrigger.text("More Info");

  var modalDiv = $("<div>").addClass("modal");
  modalDiv.attr("id", modalId);
  modalDiv.attr("tabindex", 0); 
          
  var modalContent = $("<div>").addClass("modal-content");
  
  var h4 = $("<h4>").text(movieTitle)
  
  var movieInfo = $("<p>").text(paraInfo)
  
  var modalFooter = $("<div>").addClass("modal-footer")
  
  var aModalClose = $("<a>").addClass("modal-close");
  aModalClose.addClass("waves-effect");
  aModalClose.addClass("waves-green");
  aModalClose.addClass("btn-flat");
  aModalClose.attr("href", "#!");
  aModalClose.text("Close");

  $("." + section).append(column);

  $(column).append(card);

  $(card).append(cardImageDiv);
  $(card).append(cardContent);
  $(card).append(cardAction);

  $(cardImageDiv).append(cardImage);

  $(cardContent).append(cardTitle);
  $(cardContent).append(movieIsRated);
  $(cardContent).append(movieRating);

  $(cardAction).append(aModalTrigger);
  $(cardAction).append(modalDiv);

  $(modalDiv).append(modalContent);
  $(modalDiv).append(modalFooter);

  $(modalContent).append(h4);
  $(modalContent).append(movieInfo);

  $(modalFooter).append(aModalClose);
};

$(document).ready(function(){
  $('.modal').modal();
});

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
        localSaveSearch();
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