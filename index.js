const MOVIE_DB_API = 'd1ed99d95a5d38c111b41d8edc21c062';
const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';

$(document).ready(function () {
  $('.sidenav').sidenav();
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('input-field');
});

$(document).ready(function () {
  $('select').formSelect();
});

function dtddAPI(resultName, modalId) {
  //DtDD API
  var dtddAPIKey = "fa2a38047e3e593c5387a8ba5da60da0";
  var dtddUrl = "https://cors-anywhere.herokuapp.com/https://www.doesthedogdie.com/dddsearch?q=";
  var dtddUrlMedia = "https://cors-anywhere.herokuapp.com/https://www.doesthedogdie.com/media/";

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
      var dddMovieURL = "https://www.doesthedogdie.com/media/" + dddID;

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
          var topicItems = response.topicItemStats;
          var topics = [];
          var animalDisclaimer = "";
          var violenceDisclaimer = "";
          var medicalDisclaimer = "";
          var everythingElseDisclaimer = "";

          // for each item, see if yes > no
          topicItems.forEach(function (item, index) {
            if (item.yesSum >= item.noSum && item.yesSum !== 0) {
              var topicName = topicItems[index].topic.name;
              topics.push(topicName);
            };
          });

          if (topics.includes("a dog dies") || topics.includes("animals are abused") || topics.includes("an animal dies")
            || topics.includes("a cat dies") || topics.includes("a horse dies")) {
            animalDisclaimer = " *depictions of animals hurt or dying* ";
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
            violenceDisclaimer = " *disturbing images of/references to violence, injury, or death* ";
          };

          if (topics.includes("somone has a seizure") || topics.includes("needles/syringes are used") || topics.includes("there's a hospital scene")
            || topics.includes("someone has cancer") || topics.includes("there's a mental institution scene") || topics.includes("there's body dysmorphia")
            || topics.includes("someone has an anxiety attack") || topics.includes("someone has an eating disorder") || topics.includes("someone miscarries")
            || topics.includes("someone has an abortion") || topics.includes("there's childbirth")) {
            medicalDisclaimer = " *certain medical situations or settings* ";
          };

          if (topics.includes("there are spiders") || topics.includes("there are snakes") || topics.includes("there are bugs") || topics.includes("someone cheats")
            || topics.includes("someone is possessed") || topics.includes("there are shower scenes") || topics.includes("there are clowns")
            || topics.includes("there's ghosts") || topics.includes("there are jumpscares") || topics.includes("someone vomits") || topics.includes("there's farting or spitting")
            || topics.includes("there's a claustrophobic scene") || topics.includes("someone gets gaslighted") || topics.includes("there are strobe effects")
            || topics.includes("shaky cam is used") || topics.includes("there are incestuous relationships") || topics.includes("there is sexual content")
            || topics.includes("someone speaks hate speech") || topics.includes("someone is misgendered") || topics.includes("there's fat jokes")
            || topics.includes("there's antisemitism") || topics.includes("there's ableist language or behavior") || topics.includes("Santa (et al) is spoiled")
            || topics.includes("the ending is sad") || topics.includes("alcohol abuse") || topics.includes("there's addiction") || topics.includes("someone uses drugs")) {
            everythingElseDisclaimer = " *other imagery some viewers may not want* ";
          };

          if (animalDisclaimer === "" && violenceDisclaimer === "" && medicalDisclaimer === "" && everythingElseDisclaimer === "") {
            return;
          };

          totalDisclaimer = "This may contain: " + animalDisclaimer + violenceDisclaimer + medicalDisclaimer + everythingElseDisclaimer + ".  Please see " + dddMovieURL + " for more information.";

          addDDDtoDOM(modalId, totalDisclaimer);
        })
        .catch(function (error) {
          return;
        })
    })
    .catch(function (error) {
      return;
    });
};

//Add results from DDD to DOM
function addDDDtoDOM(modalIdent, dddParaInfo) {
  $('.modal').modal();

  var whichModal = $("#" + modalIdent);
  var para = $(whichModal).find(".dddPara")
  $(para).text(dddParaInfo)

  $(para).prepend("<br>")
};

//Add results from TMDB to DOM
function addResultstoDOM(section, imageSRC, movieTitle, movieReview, movieID, paraInfo) {
  $('.modal').modal();

  var modalId = "modal" + movieID;

  var column = $("<div>").addClass("col");
  column.addClass("s6");
  column.addClass("m4");
  column.addClass("l2");

  var card = $("<div>").addClass("card");

  var cardImageDiv = $("<div>").addClass("card-image");

  var cardImage = $("<img>").addClass("picBox");
  cardImage.attr("src", imageSRC);

  var cardContent = $("<div>").addClass("card-content");

  var cardTitle = $("<div>").addClass("cardTitle");
  cardTitle.text(movieTitle);

  var movieRating = $("<div>").addClass("movieRating");
  movieRating.text(movieReview);

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

  var h4 = $("<h4>").text(movieTitle);

  var movieInfo = $("<p>").text(paraInfo);
  var dddPara = $("<p>").text("");
  dddPara.addClass("dddPara")

  var modalFooter = $("<div>").addClass("modal-footer");

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
  $(cardContent).append("<p>Review Rating: </p>");
  $(cardContent).append(movieRating);

  $(cardAction).append(aModalTrigger);
  $(cardAction).append(modalDiv);

  $(modalDiv).append(modalContent);
  $(modalDiv).append(modalFooter);

  $(modalContent).append(h4);
  $(modalContent).append(movieInfo);
  $(modalContent).append(dddPara);
  dtddAPI(movieTitle, modalId);

  $(modalFooter).append(aModalClose);
};

$(document).ready(function () {
  $('.modal').modal();
});

$(document).ready(function () {
  //main search feature
  function multiSearch(search) {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/search/multi?api_key=" + MOVIE_DB_API + "&language=en-US&query=" + search + "&page=1&include_adult=false",
      method: "GET"
    })
      .done(function (searchResult) {
        var multiSearch = [];
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
            addResultstoDOM("searchResults-moviesRow", multiSearchData.poster_path, multiSearchData.title, multiSearchData.vote_average, multiSearchData.id, multiSearchData.overview);
          };
        };
        getSimilarMovie(multiSearchData.id);
      });
  };

  //SIMILAR MOVIES
  function getSimilarMovie(movieID) {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/movie/" + movieID + "/similar?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method: "GET"
    })
      .done(function (movieSimilarResult) {
        var similarMovie = [];
        $(".similar-moviesRow").empty();
        $(".similar-header").css("display", "block");
        for (let index = 0; index < 18; index++) {
          var similarMovieData = {}
          similarMovieData.poster_path = "http://image.tmdb.org/t/p/w185/" + movieSimilarResult.results[index].poster_path;
          similarMovieData.title = movieSimilarResult.results[index].title;
          similarMovieData.vote_average = movieSimilarResult.results[index].vote_average;
          similarMovieData.id = movieSimilarResult.results[index].id;
          similarMovieData.overview = movieSimilarResult.results[index].overview;
          similarMovie.push(similarMovieData);
          addResultstoDOM("similar-moviesRow", similarMovieData.poster_path, similarMovieData.title, similarMovieData.vote_average, similarMovieData.id, similarMovieData.overview);
        };
      });
  };

  //MOVIES TOP RATED
  function getTopRatedMovies() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/movie/top_rated?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method: "GET"
    })
      .done(function (result) {
        var topRated = [];
        for (let index = 0; index < 18; index++) {
          var topRatedMovies = {}
          topRatedMovies.poster_path = "http://image.tmdb.org/t/p/w185/" + result.results[index].poster_path;
          topRatedMovies.title = result.results[index].title;
          topRatedMovies.vote_average = result.results[index].vote_average;
          topRatedMovies.id = result.results[index].id;
          topRatedMovies.overview = result.results[index].overview;
          topRated.push(topRatedMovies);
          addResultstoDOM("topRated-moviesRow", topRatedMovies.poster_path, topRatedMovies.title, topRatedMovies.vote_average, topRatedMovies.id, topRatedMovies.overview);
        };
      });
  };

  //MOVIES POPULAR
  function getPopularMovies() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/movie/popular?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method: "GET"
    })
      .done(function (result) {
        var popular = [];
        for (let index = 0; index < 18; index++) {
          var popularMovies = {}
          popularMovies.poster_path = "http://image.tmdb.org/t/p/w185/" + result.results[index].poster_path;
          popularMovies.title = result.results[index].title;
          popularMovies.vote_average = result.results[index].vote_average;
          popularMovies.id = result.results[index].id;
          popularMovies.overview = result.results[index].overview;
          popular.push(popularMovies);
          addResultstoDOM("popular-moviesRow", popularMovies.poster_path, popularMovies.title, popularMovies.vote_average, popularMovies.id, popularMovies.overview);
        };
      });
  };

  //MOVIES TRENDING
  function getTrendingMovies() {
    $.ajax({
      url: MOVIE_DB_ENDPOINT + "/3/trending/movie/day?api_key=" + MOVIE_DB_API + "&language=en-US&page=1",
      method: "GET"
    })
      .done(function (result) {
        var trending = [];
        for (let index = 0; index < 18; index++) {
          var trendingMovies = {}
          trendingMovies.poster_path = "http://image.tmdb.org/t/p/w185/" + result.results[index].poster_path;
          trendingMovies.title = result.results[index].title;
          trendingMovies.vote_average = result.results[index].vote_average;
          trendingMovies.id = result.results[index].id;
          trendingMovies.overview = result.results[index].overview;
          trending.push(trendingMovies);
          addResultstoDOM("trending-moviesRow", trendingMovies.poster_path, trendingMovies.title, trendingMovies.vote_average, trendingMovies.id, trendingMovies.overview);
        };
      });
  };

  getTopRatedMovies();
  getPopularMovies();
  getTrendingMovies();

  $('#searchButton').click(function () {
    var mainSearch = $(this)[0].previousElementSibling.value;
    multiSearch(mainSearch);
  });
});
