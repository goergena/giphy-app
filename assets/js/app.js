var animals = ["bunny", "kitten", "corgi", "golden retriever"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayStaticImgs() {

  var searchKey = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=sGuDbhGlSdgnbnuHZW9CUjijao3In49O&q=" + searchKey + "&limit=10&lang=en";
  // var myAPIkey = "";

  // Creating an AJAX call for the specific movie button being clicked
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


$("#gif-view").on("click", ".fig", function(){
  console.log("my click event for my fig button works");
  var selectedImg = $(this).children("img");
  var animateSource = selectedImg.data("animate");
  var stillSource = selectedImg.data("still");
  var state = selectedImg.data("state");
  console.log(animateSource);
  if (selectedImg.data("state")==="still") {
    selectedImg.attr("src", animateSource).data("state", "animated");
  } else {
    selectedImg.attr("src", stillSource).data("state", "still");
  }



})


// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("animal-btn btn btn-outline-info");
    // Adding a data-attribute
    a.attr("data-name", animals[i]);
    // Providing the initial button text
    a.text(animals[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-animal").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var newAnimal = $("#gif-input").val().trim();

  // Adding movie from the textbox to our array
  animals.push(newAnimal);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
  console.log("my add animal button works");
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".animal-btn", displayStaticImgs);

// Calling the renderButtons function to display the intial buttons
renderButtons();

