/**
 * @author Dennis ritter
 * @description A sample distributions-adapter template.
 */

export default class Distributions {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * @description GET distribution by the given id.
   * @param id
   * @return {Promise}
   */
  getSingle(id) {
    return new Promise((resolve, reject) => {
      // 1. Prepare the response data to match the following datamodels
      /**
       * @property distribution
       * @type Object
       * @description A Distribution of a dataset
       * @example distribution = {
         * accessUrl: 'http://demo-url-to-this-resource.org/someID-123-xyz/blabla',
         * downloadUrl: 'http://demo-url-to-this-resource.org/someID-123-xyz/filename.csv',
         * description: 'A description of this distribution',
         * format: 'csv',
         * id: 'someID-123-xyz',
         * licence: 'ABC Licence',
         * modificationDate: 2017-05-31T18:33:48.018695,
         * releaseDate: 2017-05-31T18:33:48.018695,
         * title: 'someTitle',
         * urlType: 'download',
         * }
       */
      // 2. resolve the promise with the prepared data matching the datamodels
    });
  }
}
