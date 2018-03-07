var animals = ["goldfish", "kitten", "corgi", "golden retriever", "mongoose", "badger", "seal pups", "lion"];

function displayStaticImgs() {

  var searchKey = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=sGuDbhGlSdgnbnuHZW9CUjijao3In49O&q=" + searchKey + "&limit=10&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#gif-view").empty();

    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var animalSpan = $("<span class='animal-item'>");
      var animalFig = $("<figure class='fig'>");

      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var animated = results[i].images.fixed_height.url;
      var still = results[i].images.fixed_height_still.url;

      var animalImage = $("<img>");
      animalImage.attr("src", still);
      animalImage.attr("data-still", still);
      animalImage.attr("data-animate", animated);
      animalImage.attr("data-state", "still");
      animalImage.addClass("animal-image");

      animalFig.append(animalImage);
      animalSpan.append(p);
      animalSpan.append(animalFig);
      $("#gif-view").append(animalSpan);
    }

  });

}

$("#gif-view").on("click", ".fig", function () {;
  var selectedImg = $(this).children("img");
  var animateSource = selectedImg.attr("data-animate");
  var stillSource = selectedImg.attr("data-still");
  var state = selectedImg.attr("data-state");
  if (state === "still") {
    selectedImg.attr("src", animateSource).attr("data-state", "animate");
  } else {
    selectedImg.attr("src", stillSource).attr("data-state", "still");
  }

})


function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < animals.length; i++) {
    var a = $("<button>");
    a.addClass("animal-btn btn btn-outline-info");
    a.attr("data-name", animals[i]);
    a.text(animals[i]);
    $("#buttons-view").append(a);
  }
}


$("#add-animal").on("click", function (event) {
  event.preventDefault();
  var newAnimal = $("#gif-input").val().trim();
  animals.push(newAnimal);
  renderButtons();
});


$(document).on("click", ".animal-btn", displayStaticImgs);
renderButtons();
