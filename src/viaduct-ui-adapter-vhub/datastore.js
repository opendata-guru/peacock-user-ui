/* eslint-disable no-restricted-syntax */
/**
 * @author Dennis ritter
 * @created 12.07.17
 * @description
 */

import axios from 'axios';

export default class Datastore {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  /**
   * @description GET dataset by given id.
   * @param id
   */
  getSingle(id) {
    return new Promise((resolve, reject) => {
      const endpoint = 'datastore_search';
      const reqStr = `${this.baseUrl}${endpoint}`;
      axios.get(reqStr, {
        params: {
          id,
          sort: '_id asc',
          limit: 500,
        },
      })
      .then((response) => {
        const res = response.data.result;
        const resData = {
          records: res.records,
        };
        resolve(resData);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}
