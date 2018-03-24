$(document).ready(function() {
  // Step One: Create 20 default buttons from array

  var athletes = [
    'LeBron James',
    'Aaron Rodgers',
    'Stephen Curry',
    'Clayton Kershaw',
    'Kristaps Porzingis',
    'J.J. Watt',
    'Russel Westbrook',
    'Mike Trout',
    'Anthony Davis',
    'Aaron Judge',
    'Kevin Durant',
    'Odell Beckham',
    'Tom Brady',
    'Antonio Brown',
    'Jose Altuve',
    'Sidney Crosby',
    'Khalil Mack',
    'Alexander Ovechkin',
    'Serena Williams',
    'Justin Verlander',
    'Roger Federer',
    'Kyrie Irving',
    'Eli Manning',
    'Carmelo Anthony',
    "Le'Veon Bell"
  ];

  for (var i = 0; i < athletes.length; i++) {
    var athleteButton = $('<button>');

    athleteButton.text(athletes[i]);

    athleteButton.attr('class', 'athlete-button');

    athleteButton.attr('data-athlete', athletes[i]);

    athleteButton.attr('data-state', 'still');

    $('#athlete-buttons').append(athleteButton);
  }

  // Step Two: Add on click event for each button

  $('.athlete-button').click(function() {
    $('#athletes').empty();

    var athlete = $(this).attr('data-athlete');
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

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $('<p>').text('Rating: ' + rating);

        var athleteImg = $('<img>');

        athleteImg.attr('src', results[i].images.fixed_height.url);

        gifDiv.prepend(p);
        gifDiv.prepend(athleteImg);

        $('#athletes').append(gifDiv);
      }
    });
  });
});

// Step Three: On click empty gifs

// Step Four: On click populate 10 new gifs

// Step Five: Have form add new button
