//  Recent search storage
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
  var div = $("<div>")
  var inputText = $("#zInput").val();

  prevMovieSearches.push(inputText);
  localStorage.setItem("prevMovieSearchesStore", JSON.stringify(prevMovieSearches));

  renderPrevSearches();

};

$('.searchBtn').click(function(){
   localSaveSearch();
      })