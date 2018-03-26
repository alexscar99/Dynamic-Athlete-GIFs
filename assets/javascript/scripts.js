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

    $('.athlete-button').click(function() {
      var athlete = $(this).attr('data-athlete');

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
          var gifDiv = $("<div class='item col-md-6' data-state='still'>");

          var rating = results[i].rating;

          var ratingParagraph = $('<p>').text('Rating: ' + rating);

          var athleteImg = $('<img class="gif">');

          var stillImg = results[i].images.fixed_height_still.url;

          athleteImg.attr('src', stillImg);

          athleteImg.attr('data-animate', results[i].images.fixed_height.url);

          athleteImg.attr('data-state', 'still');

          athleteImg.attr('data-still', stillImg);

          gifDiv.append(athleteImg);

          gifDiv.append(ratingParagraph);

          $('#athletes').append(gifDiv);
        }

        $('.gif').on('click', function() {
          var state = $(this).attr('data-state');

          if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
          }
          if (state === 'animate') {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
          }
        });
      });
    });
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
});
