//######################################################################
// Global Variables
//######################################################################
// create date
var d = new Date();

// Elemeny to add text
var countdownContent = document.getElementById("js-content-wrapper__paragraph");
var el = document.getElementById("js-percentage-wrapper__bar");

// Set BeerOClock time
var beerOClockHour = '23';
var beerOClockMin = '15';

// Array with the weekdays
var dayName = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

// Save actuall day in variable
var actuallDay = dayName[d.getDay()];


//######################################################################
// Functions
//######################################################################

// get the current time and check how much time
// is left until beerOclock.
function getCurrentTime(){
  var newDate = new Date();
  var seconds = newDate.getSeconds();
  var hours = newDate.getHours();
  var minutes = newDate.getMinutes();

  var minutesLeft;
  var hoursLeft;
  var secondsLeft = setZeroValue(59 - seconds);

  beerOClockMin > minutes ? minutesLeft = setZeroValue((beerOClockMin - minutes) - 1)  : minutesLeft = setZeroValue( 59 - (minutes - beerOClockMin));
  beerOClockHour > hours ? hoursLeft = setZeroValue(beerOClockHour - hours) : hoursLeft = setZeroValue( 23 - (hours - beerOClockHour));

  var timeLeft = hoursLeft+':'+minutesLeft+':'+secondsLeft;
  return  {timeLeft:timeLeft, hours:hours, minutes:minutes};

}

// add 0 to current time value if it is below 10
function setZeroValue(i) {
    if(i < 10) {
      i = "0" + i;
    }
    return i;
}

// get percentage till beerOclock
function howMuchPercent(){
  var hoursMinutes = [setZeroValue(getCurrentTime().hours), setZeroValue(getCurrentTime().minutes)];
  var fullTime = hoursMinutes.join('');
  var percentage = (fullTime / (beerOClockHour + beerOClockMin)) * 100 | 0;

  return percentage >= 100 ? '100%' : percentage + '%';
}


// checks if its beer o'clock
function BeerOclock(){

  // Object with messages
  var message = {
    // Its beer day but not 16 uhr yet
    itsFriday: 'Get your beer game on, it is friday! <br />It is almost time for beer!!<br /> <span>' + getCurrentTime().timeLeft + '</span>',
    notFriday: 'It is not friday, but who cares? Only '+ getCurrentTime().timeLeft + ' left until beer time!',
    // Its friday or a different day and 16 uhr
    itsFridayAndBeerTime: 'Time for beer! Have a nice weekend people!',
    notFridayButBeerTime: 'Time for beer! Have a nice evening and see you tomorrow.'
  };

  // get current time stamp
  var hoursMinutes = [setZeroValue(getCurrentTime().hours), setZeroValue(getCurrentTime().minutes)];
  var fullTime = hoursMinutes.join('');
  var beerTime = beerOClockHour + beerOClockMin;

  if(fullTime >= beerTime && actuallDay == 'Friday'){
    countdownContent.innerHTML = message.itsFridayAndBeerTime;
  }else if (fullTime >= beerTime && actuallDay != 'Friday') {
    countdownContent.innerHTML = message.notFridayButBeerTime;
  }else if(fullTime <= beerTime && actuallDay == 'Friday') {
    countdownContent.innerHTML = message.itsFriday;
  }else if(fullTime <= beerTime && actuallDay != 'Friday') {
    countdownContent.innerHTML = message.notFriday;
  }

  var beerBottleGrey = document.getElementById("js-content-wrapper_beer-bottle__grey");
  var beerBottleColor = document.getElementById("js-content-wrapper_beer-bottle__color");

  var o = howMuchPercent().replace('%', '');
  beerBottleGrey.style.height = (100 - o) + '%';
  beerBottleColor.style.height = howMuchPercent();

  el.style.width = howMuchPercent();
  //el.innerHTML = howMuchPercent();

  setTimeout(BeerOclock, 1000);
}

//######################################################################
// Start Functions onLoad
//######################################################################

BeerOclock();

//#########################################
// JUST FOR THE DEMO
// open/close on click logic
//#########################################

$(".hamburger-icon-wrapper").click(function() {
  if ($(this).hasClass("isActiveIcon")) {
    $(".slide-in-bar").removeClass("isActiveBar");
    $(this).removeClass("isActiveIcon");
  } else {
    $(this).addClass("isActiveIcon");
    $(".slide-in-bar").addClass("isActiveBar");
  }
});
