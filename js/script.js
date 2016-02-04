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
var beerOClock = 17;

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
  var seconds = setZeroValue(newDate.getSeconds()); //INT
  var hours = setZeroValue(newDate.getHours()); //INT
  var minutes = setZeroValue(newDate.getMinutes()); //INT

  // how many minutes until 16:00 Uhr
  var timeLeft = setZeroValue((beerOClock - 1) - hours)+':'+setZeroValue(59 - minutes)+':'+setZeroValue(59 - seconds); //INT

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
  var percentage = (fullTime / ((beerOClock - 1) + '60') * 100) | 0;

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

  if(getActuallTime().hours >= beerOClock && actuallDay == 'Friday'){
    e.innerHTML = message.itsFridayAndBeerTime;
  }else if (getActuallTime().hours >= beerOClock && actuallDay != 'Friday') {
    e.innerHTML = message.notFridayButBeerTime;
  }else if(getActuallTime().hours <= beerOClock && actuallDay == 'Friday') {
    e.innerHTML = message.itsFriday;
  }else if(getActuallTime().hours <= beerOClock && actuallDay != 'Friday') {
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
