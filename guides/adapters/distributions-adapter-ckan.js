/**
 * @author Dennis ritter
 * @description A sample distributions-adapter for a CKAN-Backend-API.
 */

import axios from 'axios';

export default class Distributions {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * @description GET a distribution with the given ID.
   * @returns {Promise}
   */
  getSingle(id) {
    return new Promise((resolve, reject) => {
      const endpoint = 'resource_show';
      const reqStr = `${this.baseUrl}${endpoint}`;
      axios.get(reqStr, {
        params: {
          id,
        },
      })
        .then((response) => {
          const dist = response.data.result;
          const distribution = {};
          distribution.accessUrl = dist.access_url;
          distribution.description = dist.description;
          distribution.downloadUrl = dist.url;
          distribution.format = dist.format;
          distribution.id = dist.id;
          distribution.licence = 'unknown';
          distribution.modificationDate = dist.last_modified;
          distribution.releaseDate = dist.created;
          distribution.title = dist.name;
          distribution.urlType = dist.url_type;
          resolve(distribution);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
