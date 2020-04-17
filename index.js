const MOVIE_DB_API = 'd1ed99d95a5d38c111b41d8edc21c062';
const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';

$(document).ready(function () {
  $('.sidenav').sidenav();
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('input-field');
  // Instances not called and is causing the JS to stop.  Where should this be called?
  // var instances = M.FormSelect.init(elems, options);
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

function dtddAPI(resultName, modalId) {
  //DtDD API
  var dtddAPIKey = "fa2a38047e3e593c5387a8ba5da60da0"
  var dtddUrl = "https://cors-anywhere.herokuapp.com/https://www.doesthedogdie.com/dddsearch?q="
  var dtddUrlMedia = "https://cors-anywhere.herokuapp.com/https://www.doesthedogdie.com/media/"

  //Get the DDD ID
  $.ajax({
    url: dtddUrl + resultName,
    method: "GET",
    headers: {
      "Accept": "application/json",
      "X-API-Key": dtddAPIKey,
    },
  })
    .then(function (response) {
      var dddID = response.items[0].id;
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
            if (item.yesSum >= item.noSum && item.yesSum !== 0) {
              var topicName = topicItems[index].topic.name
              topics.push(topicName);
            }
          });

          if (topics.includes("a dog dies") || topics.includes("animals are abused") || topics.includes("an animal dies")
            || topics.includes("a cat dies") || topics.includes("a horse dies")) {
            animalDisclaimer = " *depictions of animals hurt or dying* "
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
            violenceDisclaimer = " *disturbing images of/references to violence, injury, or death* "
          };

          if (topics.includes("somone has a seizure") || topics.includes("needles/syringes are used") || topics.includes("there's a hospital scene")
            || topics.includes("someone has cancer") || topics.includes("there's a mental institution scene") || topics.includes("there's body dysmorphia")
            || topics.includes("someone has an anxiety attack") || topics.includes("someone has an eating disorder") || topics.includes("someone miscarries")
            || topics.includes("someone has an abortion") || topics.includes("there's childbirth")) {
            medicalDisclaimer = " *certain medical situations or settings* "
          }

          if (topics.includes("there are spiders") || topics.includes("there are snakes") || topics.includes("there are bugs") || topics.includes("someone cheats")
            || topics.includes("someone is possessed") || topics.includes("there are shower scenes") || topics.includes("there are clowns")
            || topics.includes("there's ghosts") || topics.includes("there are jumpscares") || topics.includes("someone vomits") || topics.includes("there's farting or spitting")
            || topics.includes("there's a claustrophobic scene") || topics.includes("someone gets gaslighted") || topics.includes("there are strobe effects")
            || topics.includes("shaky cam is used") || topics.includes("there are incestuous relationships") || topics.includes("there is sexual content")
            || topics.includes("someone speaks hate speech") || topics.includes("someone is misgendered") || topics.includes("there's fat jokes")
            || topics.includes("there's antisemitism") || topics.includes("there's ableist language or behavior") || topics.includes("Santa (et al) is spoiled")
            || topics.includes("the ending is sad") || topics.includes("alcohol abuse") || topics.includes("there's addiction") || topics.includes("someone uses drugs")) {
            everythingElseDisclaimer = " *other imagery some viewers may not want* "
          }

          if (animalDisclaimer === "" && violenceDisclaimer === "" && medicalDisclaimer === "" && everythingElseDisclaimer === "") {
            return;
          }

          totalDisclaimer = "This may contain: " + animalDisclaimer + violenceDisclaimer + medicalDisclaimer + everythingElseDisclaimer + ".  Please see " + dddMovieURL + " for more information.";

          addDDDtoDOM(modalId, totalDisclaimer);
        })
        .catch(function (error) {
          return;
        })
    })
    .catch(function (error) {
      return;
    })
};


function addDDDtoDOM(modalIdent, dddParaInfo) {
  $('.modal').modal();

  var whichModal = $("#" + modalIdent)
  var dddPara = $("<p>").text(dddParaInfo);

  $(whichModal).append(dddPara);
};

function addResultstoDOM(section, imageSRC, movieTitle, movieReview, movieID, paraInfo) {
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

  // var movieIsRated = $("<div>").addClass("movieIsRated");
  // movieIsRated.text(movieRated);

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
  // $(cardContent).append(movieIsRated);
  $(cardContent).append("<p>Review Rating: </p>");
  $(cardContent).append(movieRating);

  $(cardAction).append(aModalTrigger);
  $(cardAction).append(modalDiv);

  $(modalDiv).append(modalContent);
  $(modalDiv).append(modalFooter);

  $(modalContent).append(h4);
  $(modalContent).append(movieInfo);
  dtddAPI(movieTitle, modalId);

  $(modalFooter).append(aModalClose);
};

$(document).ready(function () {
  $('.modal').modal();
});

//when on the page of a tv show or movie
//recomendations will be based off of the movie id of movie page that you're on when you click on a movie
//similar tv shows will be based off of movie id of the movie/show you're on.


$(document).ready(function () {

  //main search feature

  function multiSearch(search) {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/search/multi?api_key=" + MOVIE_DB_API + "&language=en-US&query=" + search + "&page=1&include_adult=false",
      method: "GET"
    })
      .done(function (searchResult) {
        console.log("this multi search", searchResult);
        var multiSearch = []
        $(".searchResults-moviesRow").empty();
        for (let index = 0; index < 18; index++) {
          var multiSearchData = {}
          multiSearchData.poster_path = "http://image.tmdb.org/t/p/w185/" + searchResult.results[index].poster_path;
          multiSearchData.title = searchResult.results[index].title;
          multiSearchData.vote_average = searchResult.results[index].vote_average;
          multiSearchData.id = searchResult.results[index].id;
          multiSearchData.overview = searchResult.results[index].overview;
          multiSearch.push(multiSearchData);
          if (searchResult.results[index].poster_path !== null && searchResult.results[index].poster_path !== undefined) {
            addResultstoDOM("searchResults-moviesRow", multiSearchData.poster_path, multiSearchData.title, multiSearchData.vote_average, multiSearchData.id, multiSearchData.overview)
          }
        }
        getSimilarMovie(multiSearchData.id);
        // console.log(multiSearch);
      })
  }

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
  // genreSearch(35);


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


  //SIMILAR MOVIES
  function getSimilarMovie(movieID) {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/movie/" + movieID + "/similar?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method: "GET"
    })
      .done(function (movieSimilarResult) {
        console.log(movieSimilarResult.results)
        var similarMovie = []
        $(".similar-moviesRow").empty();
        $(".similar-header").css("display", "block")
        for (let index = 0; index < 18; index++) {
          var similarMovieData = {}
          similarMovieData.poster_path = "http://image.tmdb.org/t/p/w185/" + movieSimilarResult.results[index].poster_path;
          similarMovieData.title = movieSimilarResult.results[index].title;
          similarMovieData.vote_average = movieSimilarResult.results[index].vote_average;
          similarMovieData.id = movieSimilarResult.results[index].id;
          similarMovieData.overview = movieSimilarResult.results[index].overview
          similarMovie.push(similarMovieData);
          addResultstoDOM("similar-moviesRow", similarMovieData.poster_path, similarMovieData.title, similarMovieData.vote_average, similarMovieData.id, similarMovieData.overview)
        }
        // renderMovies(similarMovie);
        console.log(similarMovie)
      })
  }
  // getSimilarMovie('10752'); //added that movie id for testing


  //   function renderMovies(movieArray) {
  //     console.log("render function", movieArray)
  //     for (let index = 0; index < movieArray.length; index++) {
  //       var mainDiv = $("<div>").addClass("cardContent");
  //       var movieTitle = "<p> Title: "+ movieArray[index].title + "</p>";
  //       // need one for getting the poster_path
  //       // need one for overview

  //       //EXAMPLE var day = $("<img>").attr("src", "http://openweathermap.org/img/w/" + forecastData[0].weather[0].icon + ".png");
  //       //EXAMPLE var temp = "<p> Temp: "+ forecastData[index].main.temp + "°F</p>";
  //       //EXAMPLE var forecastHumidity = "<p> Humidity: "+ forecastData[index].main.humidity + "%</p>";
  //       mainDiv.append(movieTitle);
  //       $("#movieHolder").append(mainDiv);
  // }
  //   }

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


  //MOVIES TOP RATED
  function getTopRatedMovies() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/movie/top_rated?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method: "GET"
    })
      .done(function (result) {
        var topRated = []
        for (let index = 0; index < 18; index++) {
          var topRatedMovies = {}
          topRatedMovies.poster_path = "http://image.tmdb.org/t/p/w185/" + result.results[index].poster_path;
          topRatedMovies.title = result.results[index].title;
          topRatedMovies.vote_average = result.results[index].vote_average;
          topRatedMovies.id = result.results[index].id;
          topRatedMovies.overview = result.results[index].overview
          topRated.push(topRatedMovies);
          addResultstoDOM("topRated-moviesRow", topRatedMovies.poster_path, topRatedMovies.title, topRatedMovies.vote_average, topRatedMovies.id, topRatedMovies.overview)
        }
        console.log(topRated);
      })
  }


  //MOVIES POPULAR
  function getPopularMovies() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/movie/popular?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method: "GET"
    })
      .done(function (result) {
        console.log(result.results)
        var popular = []
        for (let index = 0; index < 18; index++) {
          var popularMovies = {}
          popularMovies.poster_path = "http://image.tmdb.org/t/p/w185/" + result.results[index].poster_path;
          popularMovies.title = result.results[index].title;
          popularMovies.vote_average = result.results[index].vote_average;
          popularMovies.id = result.results[index].id;
          popularMovies.overview = result.results[index].overview
          popular.push(popularMovies);
          addResultstoDOM("popular-moviesRow", popularMovies.poster_path, popularMovies.title, popularMovies.vote_average, popularMovies.id, popularMovies.overview)
        }
        console.log(popular);
      })
  }


  //MOVIES TRENDING
  function getTrendingMovies() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/trending/movie/day?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method: "GET"
    })
      .done(function (result) {
        console.log(result.results)
        var trending = []
        for (let index = 0; index < 18; index++) {
          var trendingMovies = {}
          trendingMovies.poster_path = "http://image.tmdb.org/t/p/w185/" + result.results[index].poster_path;
          trendingMovies.title = result.results[index].title;
          trendingMovies.vote_average = result.results[index].vote_average;
          trendingMovies.id = result.results[index].id;
          trendingMovies.overview = result.results[index].overview
          trending.push(trendingMovies);
          addResultstoDOM("trending-moviesRow", trendingMovies.poster_path, trendingMovies.title, trendingMovies.vote_average, trendingMovies.id, trendingMovies.overview)
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


  $('#searchButton').click(function () {
    localSaveSearch();
    var mainSearch = $(this)[0].previousElementSibling.value;
    multiSearch(mainSearch);
  })

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




});
