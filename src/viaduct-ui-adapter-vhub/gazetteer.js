/* eslint-disable no-restricted-syntax,max-len */
/**
 * @author Dennis ritter
 * @created 12.09.2018
 * @description
 */

import axios from 'axios';


export default class Gazetteer {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * @description Get a list of suggestions related to the given keyword.
   * @param query (String)
   * @returns {Promise<any>}
   */
  autocomplete(query) {
    const endpoint = 'autocomplete';
    return new Promise((resolve, reject) => {
      axios.get(`${this.baseUrl}${endpoint}`, {
        params: {
          q: query,
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
          reject(error);
        });
    });
  }
}
