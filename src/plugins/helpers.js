let getMonthRange = (dateStart, dateEnd) => {
  return (
    dateEnd.getMonth() -
    dateStart.getMonth() +
    12 * (dateEnd.getFullYear() - dateStart.getFullYear())
  );
};
//
let parseDateToISO = date => {
  return new Date(date).toISOString().substring(0, 10);
};
let getLastDayDateOfMonth = date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59);
};
let getFirstDayDateOfMonth = date => {
  return new Date(date.getFullYear(), date.getMonth(), 1, 12);
};
let getFollowingMonth = count => date => {
  return new Date(date.getFullYear(), date.getMonth() + count, 15); // возвращает дату с серединой месяца
};
let pipe = (...fns) => x => fns.reduce((v, f) => f(v), x); // https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const buildFlights = dates => {
  // Строим флайты зная общий период, работает по принципу, что 1 фалйт равен 1 календарному месяцу,
  // т.е. даже если флайт начинается в середине месяца, закончится он в его конце, либо в конце периода,
  // если это последний месяц из  помесячной разбивки всего периода.

  dates = Object.assign({}, dates);
  let start = new Date(dates.from),
    end = new Date(dates.to);
  let monthRange = getMonthRange(start, end);
  const flights = [];

  for (let i = 0; i <= monthRange; i++) {
    const index = i;
    let flight = {
      date_start: "",
      date_end: ""
    };
    switch (index) {
      case 0:
        {
          // если первый месяц всего периода
          flight.date_start = parseDateToISO(start);
          flight.date_end = pipe(getLastDayDateOfMonth, parseDateToISO)(start);
        }
        break;
      case monthRange:
        {
          // если последний месяц всего периода
          flight.date_start = pipe(getFirstDayDateOfMonth, parseDateToISO)(end);
          flight.date_end = parseDateToISO(end);
        }
        break;
      default:
        {
          flight.date_start = pipe(
            getFollowingMonth(index),
            getFirstDayDateOfMonth,
            parseDateToISO
          )(start);
          flight.date_end = pipe(
            getFollowingMonth(index),
            getLastDayDateOfMonth,
            parseDateToISO
          )(start);
        }
        break;
    }
    flights.push(flight);
  }
  return flights;
};
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
export { buildFlights, parseDateToISO, pipe, debounce, getRandomInt };
