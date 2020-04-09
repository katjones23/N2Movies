
$(document).ready(function () {
  $('.sidenav').sidenav();
});



document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('input-field');
  var instances = M.FormSelect.init(elems, options);
});

$(document).ready(function () {
  $('select').formSelect();
});

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
        // for each item, see if yes > no
        topicItems.forEach(function(item, index) {
          if (item.yesSum >= item.noSum) {
            var topicName = topicItems[index].topic.name
            console.log("Users report " + topicName)
          }
        });
      })
      .catch(function (error) {
        //push "no results found to page"
      })
  })
  .catch(function (response) {
    //push "no results found to page"
  })



