var currentIndex = 0;
var people = [];
var timerID = null;

$(document).ready(function() {

  // Event Listeners
  $('#next-button').on('click', function() {
    nextPerson();
    resetTimer();
  });

  $('#prev-button').on('click', function() {
    prevPerson();
    resetTimer();
  });

  // Tracker link event listener
  $('#tracker').on('click', '.person-index', function() {
    currentIndex = $(this).data('index');
    $('#person-container').fadeOut(200, function() {
      showPerson();
      resetTimer();
    });
  });

  // Load our data from the server
  getData();

});

// AJAX call to get our data from the server
function getData() {
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
      people = data.mu;
      createTracker();
      showPerson();
      startTimer();
    },
    error: function() {

    },
    timeout: function() {

    }
  });
}

// Updates the DOM with the current person information
function showPerson() {
  $('#person-container').empty();
  $('#person-container').append('<h2>' + people[currentIndex].name + '</h2>');
  var url = "http://github.com/" + people[currentIndex].git_username;
  $('#person-container').append('<p>Github: <a href="' + url + '">' + people[currentIndex].git_username + '</a></p>');
  $('#person-container').append('<p>' + people[currentIndex].shoutout + '</p>');
  $('#person-container').fadeIn(200);
  updateTracker();
}

function nextPerson() {
  $('#person-container').fadeOut(200, function() {
    currentIndex++;
    if(currentIndex >= people.length) {
      currentIndex = 0;
    }
    showPerson();
  });
}

function prevPerson() {
  $('#person-container').fadeOut(200, function() {
    currentIndex--;
    if(currentIndex < 0) {
      currentIndex = people.length - 1;
    }
    showPerson();
  });
}

function createTracker() {
  people.forEach(function(person, index) {
    $('#tracker').append('<li class="person-index">' + index + '</li>');
    $('#tracker').children().last().data('index', index);
  });
}

function updateTracker() {
  $('#tracker').children().each(function(i) {
    if($(this).data('index') == currentIndex) {
      $(this).addClass('current');
    } else {
      $(this).removeClass('current');
    }
  });
}

// Timers
function startTimer() {
  timerID = setInterval(nextPerson, 5000);
}

function stopTimer() {
  clearInterval(timerID);
}

function resetTimer() {
  stopTimer();
  startTimer();
}
