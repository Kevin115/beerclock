//######################################################################
// Global Variables
//######################################################################
// create date
var d = new Date();

// Elemeny to add text
var e = document.getElementById("headline-wrapper__content");
var ele = document.getElementById("bottom-wrapper");
var el = document.getElementById("js");

// Set BeerOClock time
var beerOClockHour = '15';
var beerOClockMin = '60';

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

  beerOClockMin >= minutes ? minutesLeft = setZeroValue((beerOClockMin - minutes) - 1)  : minutesLeft = setZeroValue( 59 - (minutes - beerOClockMin));
  beerOClockHour >= hours ? hoursLeft = setZeroValue(beerOClockHour - hours) : hoursLeft = setZeroValue( 23 - (hours - beerOClockHour));

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
    itsFriday: 'Get your beer game on, it is friday! Only '+ getCurrentTime().timeLeft +  ' left until beer time!',
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
    e.innerHTML = message.itsFridayAndBeerTime;
  }else if (fullTime >= beerTime && actuallDay != 'Friday') {
    e.innerHTML = message.notFridayButBeerTime;
  }else if(fullTime <= beerTime && actuallDay == 'Friday') {
    e.innerHTML = message.itsFriday;
  }else if(fullTime <= beerTime && actuallDay != 'Friday') {
      e.innerHTML = message.notFriday;
  }

  el.style.width = howMuchPercent();
  el.innerHTML = howMuchPercent();

  setTimeout(BeerOclock, 1000);
}



//######################################################################
// Start Functions onLoad
//######################################################################

BeerOclock();
