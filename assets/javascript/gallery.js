// API Link and Key :
// https://api.giphy.com/v1/
// OeUY1GxYiTK0ErnO4WPPneJ9y3JbKggw
// sample request format to recreate in HTML: https://api.giphy.com/v1/gifs/search?api_key=OeUY1GxYiTK0ErnO4WPPneJ9y3JbKggw&q= *** subject here *** &limit=9&offset=0&rating=PG&lang=en


// is this even useful? ---> document.getElementById("topics-form").addEventListener("submit", displayTopicInfo);

      // Initial array of topics
      var topics = ["F1 Racing", "Politics", "Calligraphy", "Hamilton", "Coldplay", "T-Shirts"];

      function displayTopicInfo() {

        var userTopic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userTopic + "&api_key=OeUY1GxYiTK0ErnO4WPPneJ9y3JbKggw&limit=8";

        // Creating an AJAX call for the specific topic button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        })

        .done(function(giphyData) {

          // console.log(giphyData); <--// using to keep an eye on API functionality

      // storing the data from the AJAX request in the results variable
        var results = giphyData.data;

        // loop through each topic's results
        for (var i = 0; i < results.length; i++) {

          // Creating a div to hold the topic
          var topicDiv = $("<div class='col-lg-3 col-md-4 col-xs-6'>");
          // Creating an element to retrieve the image/gif and set the state
          var image = $('<img>');
              image.attr('src', results[i].images.fixed_height_still.url);
              image.attr('data-still', results[i].images.fixed_height_still.url);
              // image.attr('data-state', 'still');
              image.addClass('img-thumbnail gif');

              image.attr('data-animate', results[i].images.fixed_height.url);

          // Display the image/gif
          topicDiv.append(image);

          // Getting the rating data
          var rating = results[i].rating;

          // Creating an element to display rating
          var pOne = $("<p class='capitalize'>").text("Rating: " + results[i].rating);

          // Display the rating
          topicDiv.append(pOne);

          // Put new topics above the previous topics
          $("#topics-view").prepend(topicDiv);
        }

        // This function will swap still images for animated ones...<---- doesn't work :(


      });
    }
        $(document).on("click", ".gif", function() {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
      });

      // Function to display topics
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each array topic
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("topic btn btn-success");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a topic button is clicked
      $("#add-topics").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var userTopic = $("#topics-input").val().trim();

        // Adding topic from the textbox to the topics array
        topics.push(userTopic);

        // Calling renderButtons which handles the processing of the array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "topic"
      $(document).on("click", ".topic", displayTopicInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
