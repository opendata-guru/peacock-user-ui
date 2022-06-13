/**
 * @author Dennis ritter
 * @created 06.07.17
 * @description Contains filters to format Dates.
 */

/**
 * The String to display when the given String is a invalid date String.
 * @type {String}
 */
const INVALID_DATE_STRING = '-';

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function fromNowFunc(i18n, date) {
  const seconds = Math.round((new Date() - date) / 1000);
  const hours = Math.round(seconds / 3600);
  const days = Math.round(seconds / 86400);
  const months = Math.round(seconds / 2592000);
  const years = Math.round(seconds / 31536000);

  if (days >= (1.6 * 365)) {
    return i18n.t('message.moment.years', { years });
  }
  if (days >= (0.9 * 365)) {
    return i18n.t('message.moment.oneYear');
  }

  if (days >= (1.6 * 30)) {
    return i18n.t('message.moment.months', { months });
  }
  if (days >= (0.9 * 30)) {
    return i18n.t('message.moment.oneMonth');
  }

  if (hours >= (1.6 * 24)) {
    return i18n.t('message.moment.days', { days });
  }
  if (hours >= (0.9 * 24)) {
    return i18n.t('message.moment.oneDay');
  }

  return i18n.t('message.moment.today');
}

const dateFilters = {
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
  fromNow(i18n, date) {
    if (date === undefined) {
      return INVALID_DATE_STRING;
    }
    const d = new Date(String(date));
    if (Number.isNaN(d)) {
      return INVALID_DATE_STRING;
    }

    return fromNowFunc(i18n, d);
  },
};

export default dateFilters;
