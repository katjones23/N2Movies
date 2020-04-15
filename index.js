
  
  const MOVIE_DB_API = 'd1ed99d95a5d38c111b41d8edc21c062';
  const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';


  $(document).ready(function(){
    
//need to figure out how to do the main search feature

function multiSearch(search) {
  $.ajax({
    url: MOVIE_DB_ENDPOINT + "/3/search/multi?api_key=" + MOVIE_DB_API + "&language=en-US&query=" + search + "&page=1&include_adult=false",
    method:"GET"})
      .done(function(searchResult){
      console.log("this multi search", searchResult);
})
}

//change number of results to 20

//genres give you a genre id
//the id can be used to seach the top rated or popular by genre id
//return the results onto the page of the genre


function genreSearch(genreID) {
  $.ajax({
    url: MOVIE_DB_ENDPOINT + "/3/discover/movie?api_key=" + MOVIE_DB_API + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" + genreID,
    method:"GET"})
    .done(function(searchResult){
      console.log("genre search comedy", searchResult);
  })
}
genreSearch(35);

//when on the page of a tv show or movie
//recomendations will be based off of the movie id of movie page that you're on when you click on a movie
//similar tv shows will be based off of movie id of the movie/show you're on.

//look at kat's new pull request

    
//MOVIES TOP RATED
  function getTopRatedMovies() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/movie/top_rated?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(result){
        console.log(result.results)
        var topRated = []
        for (let index = 0; index < 5; index++) {
            var topRatedMovies = {}
              topRatedMovies.poster_path = result.results[index].poster_path;
              topRatedMovies.title = result.results[index].title;
              topRatedMovies.vote_average = result.results[index].vote_average;
        topRated.push(topRatedMovies);
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
        for (let index = 0; index < 5; index++) {
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
        for (let index = 0; index < 5; index++) {
            var trendingMovies = {}
              trendingMovies.poster_path = result.results[index].poster_path;
              trendingMovies.title = result.results[index].title;
              trendingMovies.vote_average = result.results[index].vote_average;
        trending.push(trendingMovies);
      }
      console.log(trending);
    })
  }
    
getTopRatedMovies();
getPopularMovies();
getTrendingMovies();

  
//TV TOP RATED
  function getTopRatedTv() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/tv/top_rated?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(result){
        console.log(result.results)
        var tvTopRated = []
        for (let index = 0; index < 5; index++) {
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
        for (let index = 0; index < 5; index++) {
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
  function getTrendingTv(params) {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/trending/tv/day?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method:"GET"})
      .done(function(result){
        console.log(result.results)
        var tvTrending = []
        for (let index = 0; index < 5; index++) {
            var tvTrendingTV = {}
              tvTrendingTV.poster_path = result.results[index].poster_path;
              tvTrendingTV.title = result.results[index].title;
              tvTrendingTV.vote_average = result.results[index].vote_average;

          tvTrending.push(tvTrendingTV);
      }
      console.log(tvTrending);
    })
  }

getTopRatedTv();
getPopularTv();
getTrendingTv();


    $('.sidenav').sidenav();
    $('select').formSelect();
    $('#searchButton').click(function(){
     var mainSearch = $(this)[0].previousElementSibling.value;
     multiSearch(mainSearch);
        })
 
    
  
  // document.addEventListener('DOMContentLoaded', function() {
    // var elems = document.querySelectorAll('input-field');
    // var instances = M.FormSelect.init(elems, options);
  // });




});