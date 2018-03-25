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

  var addButton = function() {
    var newAthlete = $('#athlete-input').val();
    athletes.push(newAthlete);
    makeButtons();
  };

  $('#athlete-form').submit(function(event) {
    // don't refresh page on form submit
    event.preventDefault();
    addButton();
  });

  $('#athlete-buttons').click(function() {
    var target = event.target;

    var athlete = $(target).attr('data-athlete');

    /* When click event was on the added class, nothing happened for any of the buttons. But when I made the on click event for #athlete-buttons (id of entire div), clicking in the white space of the div would make the athlete variable undefined, so the AJAX call would still return 10 random gifs (query would be blank). Set this conditional to circumvent that bug until I find a better solution. */
    if (athlete !== undefined) {
      $('#athletes').empty();

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
