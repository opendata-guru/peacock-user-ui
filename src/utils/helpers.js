/**
 * @author Dennis Ritter
 * @created 11.05.2017
 * @description Contains helper functions for general purposes needed in the Application.
 */

/* eslint-disable no-undef */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import { has } from 'lodash';

/**
 * @description         Returns an array that contains unique values
 *                      of the given properties in the given array.
 * @param { String }    prop   - The key of {array} which values will be unique.
 * @param { [Object] }  array - The array to take keys from.
 * @returns { [*] }     A new Array containing unique values of the {arrays} {key} property
 */
function unique(prop, array) {
  // Filter elements in {array} that do not have a {prop} key.
  return [...new Set(array.filter(
    // Remove duplicates by creating a Set and remove items where {prop} has no value.
    item => Object.prototype.hasOwnProperty.call(item, prop) && !!item[prop],
  )
    // Create a new array containing the {prop} values of each given item.
    .map(item => item[prop]))];
}

/**
 * @description         Returns an image of a flag.
 * @param { String }    countryId - The ID (example: 'en', 'de', 'fr') of a country to get the flag from.
 * @returns { String }  An image, represented by its absolute path.
 */
function getCountryFlagImg(countryId) {
  let img;
  try {
    img = require(`@/assets/img/flags/${countryId.toLowerCase()}.png`);
  } catch (err) {
    img = require('@/assets/img/flags/eu.png');
  }
  return img;
}

/**
 * @description         Checks if a translation for the given prop parameter is available and returns it in the following priority order:
 *                      1. User set locale
 *                      2. Given fallback languages
 *                      3. Any available language
 * @param { Object }    prop - The object that should contain the translations
 * @param { String }    userLocale - The currently set locale.
 * @param { [String] }  fallbacks - The fallback languages to check for, when given locale is not available in given prop
 * @returns { String }  A translated text.
 */
function getTranslationFor(prop, userLocale, fallbacks) {
  if (!prop || typeof prop !== 'object') return undefined;
  // Use language setting of user
  if (has(prop, userLocale)) return prop[userLocale];
  // Iterate over given fallback languages
  if (fallbacks) {
    for (let lang of fallbacks) {
      if (lang) {
        lang = lang.toLowerCase();
        if (has(prop, lang)) return prop[lang];
      }
    }
  }
  // Use the first language in the given property if none of the languages is present
  const key = Object.keys(prop)[0];
  if (key) return prop[key];
  // Use default text if prop does not have any items
  return undefined;
}

/**
 * Truncates a String to a maximum character count of maxChars
 * @param text
 * @param maxChars
 * @param noAppend
 */
function truncate(text, maxChars, noAppend) {
  if (!text) return '';
  const trunc = text.substring(0, maxChars);
  if (noAppend || text.length <= maxChars) return trunc;
  return `${trunc}...`;
}

function stripHTML(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

/**
 * normalizing the dataset id
 * @param str string to be normalized
 */
function normalize(str) {
  const normalized = str.normalize('NFKD');
  return normalized.replace('%', '').replace('\\W', '-').replace('-+', '-').toLowerCase();
}

// Export all functions as default export.
export {
  unique,
  getCountryFlagImg,
  getTranslationFor,
  truncate,
  stripHTML,
  normalize,
};
