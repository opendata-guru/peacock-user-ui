/* eslint-disable no-restricted-syntax */
/**
 * @author Dennis ritter
 * @created 01.08.17
 * @description
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
        const PLACEHOLDER = 'unbekannt';
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
        distribution.accessUrl = dist.access_url ? dist.access_url : undefined;
        distribution.description = dist.description ? dist.description : PLACEHOLDER;
        distribution.downloadUrl = dist.download_urls ? dist.download_urls : undefined;
        distribution.format = dist.format ? dist.format : PLACEHOLDER;
        distribution.id = dist.id;
        distribution.licence = dist.licence ? dist.licence : PLACEHOLDER;
        distribution.modificationDate = dist.modification_date ? dist.modification_date : undefined;
        distribution.releaseDate = dist.release_date ? dist.release_date : undefined;
        distribution.title = dist.title ? dist.name : PLACEHOLDER;
        resolve(distribution);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}
