/**
 * @author Har Preet Singh
 * @created 10.07.2019
 * @description JWT encode and decode function
 */

/* eslint-disable no-undef */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

/**
 * @description         Returns a JSONObject of a decoded token
 * @param { String }    token   - RTP Token
 * @returns { [*] }     JSON Object of a decoded token
 */
function decode(token) {
  const base64Url = token.split('.')[1];
  return JSON.parse(window.atob(base64Url));
}

function encode() {
  // implementation pending
  return true;
}
// Export all functions as default export.
export {
  decode,
  encode,
};
