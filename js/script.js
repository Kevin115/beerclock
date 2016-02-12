//######################################################################
// Global Variables
//######################################################################

/**
 * @type {Object}
 */
var d = new Date();

/**
 * @const
 * @type {String}
 */
var beerOClockHour = '17';

/**
 * @const
 * @type {String}
 */
var beerOClockMin = '00';

/**
 * @const
 * @type {String}
 */
var SELECTOR_COUNTDOWN_CONTAINER = document.getElementById("js-content-wrapper__paragraph");

/**
 * @const
 * @type {String}
 */
var SELECTOR_PERCENTAGE_CONTAINER = document.getElementById("js-percentage-wrapper__bar");

/**
 * @const
 * @type {String}
 */
var SELECTOR_BOTTLE_INACTIVE = document.getElementById("js-content-wrapper_beer-bottle__grey");

/**
 * @const
 * @type {String}
 */
var SELECTOR_BOTTLE_ACTIVE = document.getElementById("js-content-wrapper_beer-bottle__color");


/**
 * @const
 * @type {Array}
 */
var dayName = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

/**
 * @const
 * @type {String}
 */
var actuallDay = dayName[d.getDay()];

/**
 *
 * Gets the current time and checks how much time
 * is left until BeerOclock.
 *
 * @type {Function, Object}
 *
 */
function getCurrentTime(){
    var newDate = new Date();
    var seconds = newDate.getSeconds();
    var hours = newDate.getHours();
    var minutes = newDate.getMinutes();

    var minutesLeft;
    var hoursLeft;
    var secondsLeft = setZeroValue(59 - seconds);

    beerOClockMin > minutes ? minutesLeft = setZeroValue((beerOClockMin - minutes) - 1)  : minutesLeft = setZeroValue( 59 - (minutes - beerOClockMin));
    beerOClockHour > hours ? hoursLeft = setZeroValue((beerOClockHour - hours) - 1) : hoursLeft = setZeroValue( 23 - (hours - beerOClockHour));

    var timeLeft = hoursLeft+':'+minutesLeft+':'+secondsLeft;
    return  {timeLeft:timeLeft, hours:hours, minutes:minutes};

}

/**
 *
 * Checks if the time (hours || minutes || seconds)
 * is < 10 and ads a 0 to it if its true
 *
 * @type {Function, undifiend}
 *
 */
function setZeroValue(i) {
    if(i < 10) {
        i = "0" + i;
    }
    return i;
}

/**
 *
 * Checks how much percent is left unitl BeerOclock
 *
 * @type {Function, String}
 *
 */
function howMuchPercent(){
    var hoursMinutes = [setZeroValue(getCurrentTime().hours), setZeroValue(getCurrentTime().minutes)].join('');
    var percentage = (hoursMinutes / (beerOClockHour + beerOClockMin)) * 100 | 0;

    return percentage >= 100 ? '100%' : percentage + '%';
}


/**
 *
 * Checks how much percent is left unitl BeerOclock
 *
 * @type {Function, undifiend}
 *
 */
function BeerOclock(){

    /**
     * @type {Object}
     */
    var message = {
        itsFriday: 'Get your beer game on, it is friday! <br />It is almost time for beer!!<br /> <span>' + getCurrentTime().timeLeft + '</span>',
        notFriday: 'It is not friday, but who cares? Only '+ getCurrentTime().timeLeft + ' left until beer time!',
        itsFridayAndBeerTime: 'Time for beer! Have a nice weekend people!',
        notFridayButBeerTime: 'Time for beer! Have a nice evening and see you tomorrow.'
    };

  // get current time stamp
  var hoursMinutes = [setZeroValue(getCurrentTime().hours), setZeroValue(getCurrentTime().minutes)].join('');
  var beerTime = beerOClockHour + beerOClockMin;

  if(hoursMinutes >= beerTime && actuallDay == 'Friday'){
    SELECTOR_COUNTDOWN_CONTAINER.innerHTML = message.itsFridayAndBeerTime;
  }else if (hoursMinutes >= beerTime && actuallDay != 'Friday') {
    SELECTOR_COUNTDOWN_CONTAINER.innerHTML = message.notFridayButBeerTime;
  }else if(hoursMinutes <= beerTime && actuallDay == 'Friday') {
    SELECTOR_COUNTDOWN_CONTAINER.innerHTML = message.itsFriday;
  }else if(hoursMinutes <= beerTime && actuallDay != 'Friday') {
    SELECTOR_COUNTDOWN_CONTAINER.innerHTML = message.notFriday;
  }


  var o = howMuchPercent().replace('%', '');
  SELECTOR_BOTTLE_INACTIVE.style.height = (100 - o) + '%';
  SELECTOR_BOTTLE_ACTIVE.style.height = howMuchPercent();

  SELECTOR_PERCENTAGE_CONTAINER.style.width = howMuchPercent();
  //SELECTOR_PERCENTAGE_CONTAINER.innerHTML = howMuchPercent();

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
