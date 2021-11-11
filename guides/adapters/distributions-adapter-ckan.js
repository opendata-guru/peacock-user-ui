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
          console.log(response);
          const dist = response.data.result;
          /**
           * @property distribution
           * @type JSON
           * @description A distribution object.
           * @example distribution: {
           * accessUrl: 'http://demo-url-to-this-resource.org/someID-123-xyz/blabla',
           * description: { en: 'A description of this distribution', de: 'Eine Beschreibung der Distribution' },
           * downloadUrls: ['http://demo-url-to-this-resource.org/someID-123-xyz/filename.csv', https://abc.de/res1.csv],
           * format: { title: 'CSV', id: 'csv' },
           * id: '8264d8fc-44eb-4b3d-93af-dc64df5fd9df',
           * licence: { title: 'Licence One', id: 'licence-4', resource: 'https://asd.com/licence-one' },
           * modificationDate: "2018-10-28T19:55:06Z",
           * releaseDate: "2018-10-28T19:55:06Z",
           * title: { en: 'someTitle', de: 'Der Titel' },
           * }
           **/
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
