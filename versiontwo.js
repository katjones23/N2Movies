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

// add to addResultstoDOM(); once content rating is available
var movieIsRated = $("<div>").addClass("movieIsRated");
movieIsRated.text(movieRated);

$(cardContent).append(movieIsRated);

//genres give you a genre id
//the id can be used to seach the top rated or popular by genre id
//return the results onto the page of the genre

function genreSearch(genreID) {
    $.ajax({
        url: MOVIE_DB_ENDPOINT + "/3/discover/movie?api_key=" + MOVIE_DB_API + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" + genreID,
        method: "GET"
    })
        .done(function (searchResult) {
            console.log("genre search result", searchResult);
        })
}
genreSearch(35);

//when on the page of a tv show or movie
//recomendations will be based off of the movie id of movie page that you're on when you click on a movie
//similar tv shows will be based off of movie id of the movie/show you're on.

//SIMILAR TV

function getsimilarTV(tvID) {
    $.ajax({
        url: MOVIE_DB_ENDPOINT + "/3/tv/" + tvID + "/similar?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
        method: "GET"
    })
        .done(function (tvSimilarResult) {
            console.log(tvSimilarResult.results)
            var similarTV = []
            $(".similar-moviesRow").empty();
            for (let index = 0; index < 20; index++) {
                var similarTvData = {}
                similarTvData.poster_path = "http://image.tmdb.org/t/p/w185/" + tvSimilarResult.results[index].poster_path;
                similarTvData.title = tvSimilarResult.results[index].title;
                similarTvData.vote_average = tvSimilarResult.results[index].vote_average;
                similarTvData.id = tvSimilarResult.results[index].id;
                similarTvData.overview = tvSimilarResult.results[index].overview;
                similarTV.push(similarTvData);
                addResultstoDOM("similar-moviesRow", similarTvData.poster_path, similarTvData.title, similarTvData.vote_average, similarTvData.id, similarTvData.overview)
            }
            console.log(similarTV);
        })
}
// getsimilarTV();


//RECOMMENDED TV
function getRecommendedTV(tvID) {
    $.ajax({
        url: MOVIE_DB_ENDPOINT + "/3/tv/" + tvID + "/recommendations?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
        method: "GET"
    })
        .done(function (tvRecommendedResult) {
            console.log(tvRecommendedResult.results)
            var recommendedTV = []
            $(".recommended-moviesRow").empty();
            for (let index = 0; index < 20; index++) {
                var recommendedTvData = {}
                recommendedTvData.poster_path = "http://image.tmdb.org/t/p/w185/" + tvRecommendedResult.results[index].poster_path;
                recommendedTvData.title = tvRecommendedResult.results[index].title;
                recommendedTvData.vote_average = tvRecommendedResult.results[index].vote_average;
                recommendedTvData.id = tvRecommendedResult.results[index].id;
                recommendedTvData.overview = tvRecommendedResult.results[index].overview;
                recommendedTV.push(recommendedTvData);
                addResultstoDOM("recommended-moviesRow", recommendedTvData.poster_path, recommendedTvData.title, recommendedTvData.vote_average, recommendedTvData.id, recommendedTvData.overview)
            }
            console.log(recommendedTV);
        })
}
// getRecommendedTV();


//RECOMMENDED MOVIES
function getRecommendedMovie(movieID) {
    $.ajax({
        url: MOVIE_DB_ENDPOINT + "/3/movie/" + movieID + "/recommendations?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
        method: "GET"
    })
        .done(function (movieRecommendedResult) {
            console.log(movieRecommendedResult.results)
            var recommendedMovie = []
            $(".recommended-moviesRow").empty();
            $(".recommended-header").css("display", "block")
            for (let index = 0; index < 18; index++) {
                var recommendedMovieData = {}
                recommendedMovieData.poster_path = "http://image.tmdb.org/t/p/w185/" + movieRecommendedResult.results[index].poster_path;
                recommendedMovieData.title = movieRecommendedResult.results[index].title;
                recommendedMovieData.vote_average = movieRecommendedResult.results[index].vote_average;
                recommendedMovieData.id = movieRecommendedResult.results[index].id;
                recommendedMovieData.overview = movieRecommendedResult.results[index].overview
                recommendedMovie.push(recommendedMovieData);
                addResultstoDOM("recommended-moviesRow", recommendedMovieData.poster_path, recommendedMovieData.title, recommendedMovieData.vote_average, recommendedMovieData.id, recommendedMovieData.overview)
            }
            console.log(recommendedMovie);
        })
}
// getRecommendedMovie();

//TV TOP RATED
function getTopRatedTv() {
    $.ajax({
        url: MOVIE_DB_ENDPOINT + "/3/tv/top_rated?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
        method: "GET"
    })
        .done(function (result) {
            console.log(result.results)
            var tvTopRated = []
            for (let index = 0; index < 18; index++) {
                var tvTopRatedTV = {}
                tvTopRatedTV.poster_path = "http://image.tmdb.org/t/p/w185/" + result.results[index].poster_path;
                tvTopRatedTV.title = result.results[index].name;
                tvTopRatedTV.vote_average = result.results[index].vote_average;
                tvTopRatedTV.id = result.results[index].id;
                tvTopRatedTV.overview = result.results[index].overview
                tvTopRated.push(tvTopRatedTV);
                addResultstoDOM("topRated-moviesRow", tvTopRatedTV.poster_path, tvTopRatedTV.title, tvTopRatedTV.vote_average, tvTopRatedTV.id, tvTopRatedTV.overview)
            }
            console.log(tvTopRated);
        })
}


//TV POPULAR
function getPopularTv() {
    $.ajax({
        url: MOVIE_DB_ENDPOINT + "/3/tv/top_rated?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
        method: "GET"
    })
        .done(function (result) {
            console.log(result.results)
            var tvPopular = []
            for (let index = 0; index < 18; index++) {
                var tvPopularTV = {}
                tvPopularTV.poster_path = "http://image.tmdb.org/t/p/w185/" + result.results[index].poster_path;
                tvPopularTV.title = result.results[index].name;
                tvPopularTV.vote_average = result.results[index].vote_average;
                tvPopularTV.id = result.results[index].id;
                tvPopularTV.overview = result.results[index].overview
                tvPopular.push(tvPopularTV);
                addResultstoDOM("popular-moviesRow", tvPopularTV.poster_path, tvPopularTV.title, tvPopularTV.vote_average, tvPopularTV.id, tvPopularTV.overview)
            }
            console.log(tvPopular);
        })
}


//TV TRENDING
function getTrendingTv() {
    $.ajax({
        url: MOVIE_DB_ENDPOINT + "/3/trending/tv/day?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
        method: "GET"
    })
        .done(function (result) {
            console.log(result.results)
            var tvTrending = []
            for (let index = 0; index < 18; index++) {
                var tvTrendingTV = {}
                tvTrendingTV.poster_path = "http://image.tmdb.org/t/p/w185/" + result.results[index].poster_path;
                tvTrendingTV.title = result.results[index].name;
                tvTrendingTV.vote_average = result.results[index].vote_average;
                tvTrendingTV.id = result.results[index].id;
                tvTrendingTV.overview = result.results[index].overview
                tvTrending.push(tvTrendingTV);
                addResultstoDOM("trending-moviesRow", tvTrendingTV.poster_path, tvTrendingTV.title, tvTrendingTV.vote_average, tvTrendingTV.id, tvTrendingTV.overview)
            }
            console.log(tvTrending);
        })
}

// getTopRatedTv();
// getPopularTv();
// getTrendingTv()

$('.genreChoice').click(function () {
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

// Add to search button function
localSaveSearch();
