/* jshint browser: true */
/* jshint node: true */

"use strict";

var $ = require('jquery');
var d = document;

/**
 * @const
 * @type {String}
 */
var beerOClockHour = '18';

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
 * @type {String}
 */
var SELECTOR_USER_INPUT_HOURS = d.getElementById('js-user-input-hours');

/**
 * @const
 * @type {String}
 */
var SELECTOR_USER_INPUT_MINUTES = d.getElementById('js-user-input-minutes');

/**
 * @const
 * @type {Button}
 */
var SELECTOR_USER_INPUT_SAVE_BUTTON = d.getElementById('js-user-input-save');

function getInputs(){

  // variables to check if user added a time
  var userInputHours = SELECTOR_USER_INPUT_HOURS.value;
  var userInputMinutes = SELECTOR_USER_INPUT_MINUTES.value;

  // rewrite time variables with user input
  beerOClockHour = SELECTOR_USER_INPUT_HOURS.value;
  beerOClockMin = SELECTOR_USER_INPUT_MINUTES.value;

  if(beerOClockHour > 24 || beerOClockMin > 59) {
    window.alert('Please select a proper time');
    return;
  } else if (isNaN(beerOClockMin || beerOClockHour)) {
    window.alert('Please type in a number');
    return;
  } else if (userInputHours === '' || userInputMinutes === '') {
    window.alert('Please type in a time to start');
    return;
  }

  beerOclock();
}

SELECTOR_USER_INPUT_SAVE_BUTTON.addEventListener("click", getInputs, false);

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

    var minutesLeft = setZeroValue(60 - (time.minutes - beerOClockMin));
    var hoursLeft = setZeroValue((beerOClockHour - time.hours));

    if (beerOClockMin > time.minutes) {
          minutesLeft = setZeroValue((beerOClockMin - time.minutes));
      } else if (beerOClockMin == time.minutes) {
          minutesLeft = "00";
      } else if (beerOClockMin == "00" || beerOClockMin < time.minutes) {
          hoursLeft = setZeroValue((beerOClockHour - time.hours) - 1);
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

    var percentLeft = howMuchPercent();
    var timeToBeer = checkTime().timeLeft;
    var actuallFullTime = [checkTime().hours, checkTime().minutes].join('');

    var userSetTime = beerOClockHour + beerOClockMin;

    if (actuallFullTime >= userSetTime){
        SELECTOR_COUNTDOWN_CONTAINER.innerHTML = 'beer time baby';
    } else if(actuallFullTime <= userSetTime)  {
        SELECTOR_COUNTDOWN_CONTAINER.innerHTML = timeToBeer;
    }

    SELECTOR_BOTTLE_INACTIVE.style.height = (100 - (percentLeft.replace('%', ''))) + '%';
    SELECTOR_BOTTLE_ACTIVE.style.height = percentLeft;

    SELECTOR_PERCENTAGE_CONTAINER.style.width = percentLeft;
    SELECTOR_PERCENTAGE_CONTAINER.innerHTML = percentLeft;

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
