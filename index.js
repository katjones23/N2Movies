
$(document).ready(function () {
  $('.sidenav').sidenav();
});


//  Recent search storage; put save inside event listener for search button
var searchHistoryBlock = $("<div>").addClass("searchHistoryBlock")
var prevSearches = [];

function init() {
  var storedSearches = JSON.parse(localStorage.getItem("prevSearchesStore"));

  if (storedSearches !== null) {
    prevSearches = storedSearches;
    renderPrevSearches();
  } else {
    return;
  };
};

init();

function renderPrevSearches() {
  $(searchHistoryBlock).empty();

  if (prevSearches.length > 5) {
    prevSearches.splice(0, 1);
  }

  for (var i = 0; i < prevSearches.length; i++) {
    var prevSearch = prevSearches[i];
    var div = $("<div>")

    $(searchHistoryBlock).css("display", "block")
    $(div).text(prevSearch);
    $(div).addClass("searchHistoryItem");
    $(searchHistoryBlock).prepend(div);
  }
}

function localSaveSearch() {
  var div = $("<div>")
  var inputText = ("#zInput").val();

  $(searchHistoryBlock).css("display", "block")
  $(div).text(inputText);
  $(div).addClass("searchHistoryItem");
  $(searchHistoryBlock).prepend(div);

  prevSearches.push(inputText);
  localStorage.setItem("prevSearchesStore", JSON.stringify(prevSearches));

};

localSaveSearch();
