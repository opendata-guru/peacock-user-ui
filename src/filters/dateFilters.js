/**
 * @author Dennis ritter
 * @created 06.07.17
 * @description Contains filters to format Dates.
 */

import moment from 'moment';

/**
 * The String to display when the given String is a invalid date String.
 * @type {String}
 */
const INVALID_DATE_STRING = '-';

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

const dateFilters = {
  setLocale(locale = 'en', formatOptions = {}) {
    moment.updateLocale(locale, formatOptions);
  },
  /**
   * @description Transforms the given date into a US Date Format String
   * @param {date} date - The given date
   * @returns {String}
   */
  formatUS(date) {
    if (date === undefined) {
      return INVALID_DATE_STRING;
    }
    const d = new Date(String(date));
    if (Number.isNaN(d)) {
      return INVALID_DATE_STRING;
    }

    return [
      padTo2Digits(d.getMonth() + 1),
      padTo2Digits(d.getDate()),
      d.getFullYear(),
    ].join('/');
  },
  /**
   * @description Transforms the given date into a US Date Format String
   * @param {date} date - The given date
   * @returns {String}
   */
  formatEU(date) {
    if (date === undefined) {
      return INVALID_DATE_STRING;
    }
    const d = new Date(String(date));
    if (Number.isNaN(d)) {
      return INVALID_DATE_STRING;
    }

    return [
      padTo2Digits(d.getDate()),
      padTo2Digits(d.getMonth() + 1),
      d.getFullYear(),
    ].join('.');
  },
  /**
   * @description Returns a String representing the expired time from the given date to now.
   * @param {date} date - The given date
   * @returns {String}
   */
  fromNow(date) {
    if (date === undefined) return INVALID_DATE_STRING;
    const m = moment(String(date));
    if (m.isValid()) return m.fromNow();
    return INVALID_DATE_STRING;
  },
};

export default dateFilters;
