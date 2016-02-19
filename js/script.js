/* jshint browser: true */
/* jshint node: true */

"use strict";

var $ = require('jquery');
var d = document;

/**
 * @type {String}
 */
var dateStamp = new Date();

/**
 * @const
 * @type {String}
 */
var beerOClockHour = '16';

/**
 * @const
 * @type {String}
 */
var beerOClockMin = '00';

/**
 * @const
 * @type {String}
 */
var SELECTOR_COUNTDOWN_CONTAINER = d.getElementById('js-content-wrapper__paragraph');

/**
 * @const
 * @type {String}
 */
var SELECTOR_PERCENTAGE_CONTAINER = d.getElementById('js-percentage-wrapper__bar');

/**
 * @const
 * @type {String}
 */
var SELECTOR_BOTTLE_INACTIVE = d.getElementById('js-content-wrapper_beer-bottle__grey');

/**
 * @const
 * @type {String}
 */
var SELECTOR_BOTTLE_ACTIVE = d.getElementById('js-content-wrapper_beer-bottle__color');

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
var actuallDay = dayName[dateStamp.getDay()];

var userInputHours = '';
var userInputMinutes = '';

function getInputs(){
  beerOClockHour = d.getElementById('h').value;
  beerOClockMin = d.getElementById('m').value;

  if(beerOClockHour >= 24 || beerOClockMin > 59) {
    window.alert('zuhoch');
    return false;
  }

  beerOclock();
}

d.getElementById("save").addEventListener("click", getInputs, false);

/**
 *
 * Gets the current time and checks how much time
 * is left until BeerOclock.
 *
 * @type {Object}
 * @return {Object}
 *
 */
function checkTime(){
    var newDate = new Date();
    var time = {
                hours: setZeroValue(newDate.getHours()),
                minutes: setZeroValue(newDate.getMinutes())
              };

    var minutesLeft;
    var hoursLeft;

    if (time.hours > beerOClockHour) {
          return true;
      } else {
          hoursLeft = setZeroValue((beerOClockHour - time.hours));
      }

    if (beerOClockMin > time.minutes) {
          minutesLeft = setZeroValue((beerOClockMin - time.minutes));
      } else if (beerOClockMin == time.minutes) {
          minutesLeft = "00";
          hoursLeft = setZeroValue((beerOClockHour - time.hours));
      } else if (beerOClockMin == "00" || beerOClockMin < time.minutes) {
          hoursLeft = setZeroValue((beerOClockHour - time.hours) - 1);
          minutesLeft = setZeroValue(60 - (time.minutes - beerOClockMin));
      } else {
          minutesLeft = setZeroValue(60 - (time.minutes - beerOClockMin));
      }

    var timeLeft = hoursLeft+':'+minutesLeft;
    return  {timeLeft:timeLeft, hours:time.hours, minutes:time.minutes};
}

/**
 *
 * Checks if the time (hours || minutes || seconds)
 * is < 10 and ads a 0 to it if its true
 *
 * @param {value}
 * @type {Object}
 * @return {String}
 *
 */
function setZeroValue(value) {
    if(value < 10) {
        value = '0' + value;
    }
    return value;
}

/**
 *
 * Checks how much percent is left unitl BeerOclock
 *
 * @type {Object}
 *
 */
function howMuchPercent(){
    var hoursMinutes = [checkTime().hours, checkTime().minutes].join('');
    var percentage = (hoursMinutes / (beerOClockHour + beerOClockMin)) * 100 | 0;

    return percentage >= 100 ? '100%' : percentage + '%';
}

/**
 *
 * Checks how much percent is left unitl BeerOclock
 *
 * @type {Object}
 * @return {undefind}
 *
 */
function beerOclock(){
    /**
     * @type {Object}
     */
    var message = {
        itsFriday: 'Get your beer game on, it is friday! <br />It is almost time for beer!!<br /> <span>' + checkTime().timeLeft + '</span>',
        notFriday: 'It is not friday, but who cares? Only '+ checkTime().timeLeft + ' left until beer time!',
        itsFridayAndBeerTime: 'Time for beer! Have a nice weekend people!',
        notFridayButBeerTime: 'Time for beer! Have a nice evening and see you tomorrow.'
    };

    var hoursMinutes = [setZeroValue(checkTime().hours), setZeroValue(checkTime().minutes)].join('');
    var beerTime = beerOClockHour + beerOClockMin;

    if (checkTime() === true && actuallDay == 'Friday'){
        SELECTOR_COUNTDOWN_CONTAINER.innerHTML = message.itsFridayAndBeerTime;
    } else if (checkTime() === true && actuallDay != 'Friday') {
        SELECTOR_COUNTDOWN_CONTAINER.innerHTML = message.notFridayButBeerTime;
    } else if(hoursMinutes <= beerTime && actuallDay == 'Friday') {
        SELECTOR_COUNTDOWN_CONTAINER.innerHTML = message.itsFriday;
    } else if(hoursMinutes <= beerTime && actuallDay != 'Friday') {
        SELECTOR_COUNTDOWN_CONTAINER.innerHTML = message.notFriday;
    }

    SELECTOR_BOTTLE_INACTIVE.style.height = (100 - (howMuchPercent().replace('%', ''))) + '%';
    SELECTOR_BOTTLE_ACTIVE.style.height = howMuchPercent();

    SELECTOR_PERCENTAGE_CONTAINER.style.width = howMuchPercent();
    SELECTOR_PERCENTAGE_CONTAINER.innerHTML = howMuchPercent();

    setTimeout(beerOclock, 10000);

}

//######################################################################
// Start Functions onLoad
//######################################################################

beerOclock();

//#########################################
// JUST FOR THE DEMO
// open/close on click logic
//#########################################

$('.hamburger-icon-wrapper').click(function() {
    if ($(this).hasClass('isActiveIcon')) {
        $('.slide-in-bar').removeClass('isActiveBar');
        $(this).removeClass('isActiveIcon');
    } else {
        $(this).addClass('isActiveIcon');
        $('.slide-in-bar').addClass('isActiveBar');
    }
});
