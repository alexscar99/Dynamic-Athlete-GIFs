$(document).ready(function() {
  // Step One: Create 20 default buttons from array
  // function createButtons() {
  // $('#athlete-buttons').empty();

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

  $('#athlete-form').submit(function(event) {
    event.preventDefault();
    $.ajax({
      url: $(this).attr('action'),
      type: 'GET',
      data: $(this).serialize(),
      success: function(data) {
        athletes.push($(this));
      }
    });
  });

  // $('#add-athlete').click(function() {
  //   var newAthlete = $(this);

  //   athletes.push(newAthlete);
  // });

  for (var i = 0; i < athletes.length; i++) {
    var athleteButton = $('<button>');

    athleteButton.text(athletes[i]);

    athleteButton.attr('class', 'athlete-button btn btn-success');

    athleteButton.attr('data-athlete', athletes[i]);

    athleteButton.attr('data-state', 'still');

    $('#athlete-buttons').append(athleteButton);
  }

  //createButtons();

  //createButtons();

  // athletes.forEach(function(element) {
  //   athleteButton = $('<button>');

  //   athleteButton.text(element);

  //   athleteButton.attr('class', 'athlete-button btn btn-success');

  //   athleteButton.attr('data-athlete', element);

  //   athleteButton.attr('data-state', 'still');

  //   $('#athlete-buttons').append(athleteButton);
  // });

  // }

  // createButtons();

  // var newAthlete = $('#athlete-input');

  // $('#add-athlete').click(function() {
  //   athletes.push(newAthlete);
  // console.log(athletes);
  //createButtons();
  // });
  // var addNewButton = function() {
  //   $('#athlete-buttons').empty();
  //   athletes.push(newAthlete);
  //   createButtons();
  // };

  // $('#add-athlete').click(function() {
  //   athletes.push(newAthlete);

  // });

  $('.athlete-button').click(function() {
    $('#athletes').empty();

    // store name of athlete
    var athlete = $(this).attr('data-athlete');

    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      athlete +
      '&api_key=8j8vTzPXrMnHfZlQqXZYoMSZYUGh7H3F&limit=10';
    // https://api.giphy.com/v1/gifs/search?q=LeBron+James&api_key=643756783467863&limit=10
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
  });
});

// Step Three: On click empty gifs

// Step Four: On click populate 10 new gifs in still state

// Step Five: On click animates gifs

// Step Six: Have form add new button
