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

function getActuallTime(){
  var newDate = new Date();
  var seconds = newDate.getSeconds(); //INT
  var hours = newDate.getHours(); //INT
  var minutes = newDate.getMinutes(); //INT

  var minutesLeft;
  var hoursLeft;
  var secondsLeft = setZeroValue(59 - seconds);

  beerOClockMin >= minutes ? minutesLeft = setZeroValue((beerOClockMin - minutes) - 1)  : minutesLeft = setZeroValue( 59 - (minutes - beerOClockMin));
  beerOClockHour >= hours ? hoursLeft = setZeroValue(beerOClockHour - hours) : hoursLeft = setZeroValue( 23 - (hours - beerOClockHour));

  var timeLeft = hoursLeft+':'+minutesLeft+':'+secondsLeft; //INT
  return  {timeLeft:timeLeft, hours:hours, minutes:minutes};

}
function setZeroValue(i) {
    if (i < 10) {
      i = "0" + i;
    }

    return i;
}

function howMuchPercent(){
  var hoursMinutes = [getActuallTime().hours, getActuallTime().minutes];
  var fullTime = hoursMinutes.join('');
  var percentage = ((fullTime / (beerOClockHour + beerOClockMin)) * 100) | 0;

  if(percentage >= 100){
    return '100%';
  } else {
    return percentage + '%';
  }

}

// Functions: check if its beer o'clock
function BeerOclock(){

  // Object with messages
  var message = {
    // Its beer day but not 16 uhr yet
    itsFriday: 'Get your beer game on, it is friday! Only '+ getActuallTime().timeLeft +  ' left until beer time!',
    notFriday: 'It is not friday, but who cares? Only '+ getActuallTime().timeLeft + ' left until beer time!',
    // Its friday or a different day and 16 uhr
    itsFridayAndBeerTime: 'Time for beer! Have a nice weekend people!',
    notFridayButBeerTime: 'Time for beer! Have a nice evening and see you tomorrow.'
  };

  var hoursMinutes = [getActuallTime().hours, getActuallTime().minutes];
  var time = hoursMinutes.join('');
  var beer = beerOClockHour + beerOClockMin;

  if(time >= beer && actuallDay == 'Friday'){
    e.innerHTML = message.itsFridayAndBeerTime;
  }else if (time >= beer && actuallDay != 'Friday') {
    e.innerHTML = message.notFridayButBeerTime;
  }else if(time <= beer && actuallDay == 'Friday') {
    e.innerHTML = message.itsFriday;
  }else if(time <= beer && actuallDay != 'Friday') {
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
