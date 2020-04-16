
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
    $('.sidenav').sidenav();
    
  });



  $(document).ready(function(){
    $('.modal').modal();
  });
 
 
  
 
