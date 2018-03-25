$(document).ready(function() {
  var athletes = [
    'LeBron James',
    'Aaron Rodgers',
    'Stephen Curry',
    'Clayton Kershaw',
    'Kristaps Porzingis',
    'Russel Westbrook',
    'Mike Trout',
    'Anthony Davis',
    'Aaron Judge',
    'Kevin Durant',
    'Odell Beckham',
    'Carmelo Anthony',
    'Tom Brady',
    'Kyrie Irving',
    'Antonio Brown',
    'Jose Altuve',
    'Sidney Crosby',
    'Eli Manning',
    'Alexander Ovechkin',
    'Justin Verlander'
  ];

  var makeButtons = function() {
    $('#athlete-buttons').empty();

    // iterate through athletes array and create a button for each with text, classes, and attributes then append to #athlete-buttons
    for (var i = 0; i < athletes.length; i++) {
      var athleteButton = $('<button>');

      athleteButton.text(athletes[i]);

      athleteButton.addClass('athlete-button btn btn-success');

      athleteButton.attr('data-athlete', athletes[i]);

      athleteButton.attr('data-state', 'still');

      $('#athlete-buttons').append(athleteButton);
    }
  };

  makeButtons();

  // grab input, push it into athletes array, and run function to populate buttons
  var addButton = function() {
    var newAthlete = $('#athlete-input').val();
    athletes.push(newAthlete);
    makeButtons();
  };

  $('#athlete-form').submit(function(event) {
    event.preventDefault();
    addButton();
  });

  $('#athlete-buttons').click(function() {
    $('#athletes').empty();

    var target = event.target;

    var athlete = $(target).attr('data-athlete');

    // Couldn't target the specific class for click event so had to target the ID. But if anybody clicked in the white space then athlete became undefined, showing first 10 random results from API. Set this conditional to circumvent that bug until I find a better solution.
    if (athlete !== undefined) {
      var queryURL =
        'https://api.giphy.com/v1/gifs/search?q=' +
        athlete +
        '&api_key=8j8vTzPXrMnHfZlQqXZYoMSZYUGh7H3F&limit=10';

      $.ajax({
        url: queryURL,
        method: 'GET'
      }).then(function(response) {
        var results = response.data;

        var imgURL = response.data.image_original_url;

        // iterate through 10 times (limit amt) and create new div that has img for gif and paragraph for rating
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item col-md-6'>");

          var rating = results[i].rating;

          var p = $('<p>').text('Rating: ' + rating);

          var athleteImg = $('<img>');

          athleteImg.attr('src', results[i].images.fixed_height.url);

          gifDiv.prepend(p);
          gifDiv.prepend(athleteImg);

          $('#athletes').append(gifDiv);
        }
      });
    }
  });
});
