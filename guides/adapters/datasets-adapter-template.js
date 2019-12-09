/**
 * @author Dennis ritter
 * @description A sample datasets-adapter template.
 */

export default class Datasets {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * @description GET dataset by given id.
   * @param id
   * @return {Promise}
   */
  getSingle(id) {
    return new Promise((resolve, reject) => {
      // 1. Prepare the response data to match the following datamodels
      /**
       * @property dataset
       * @type JSON
       * @description A dataset object.
       * @example dataset = {
         *  categories: [{ id: 'energy', title: 'energy' }, ..],
         *  description: 'This is dataset1',
         *  distributions: [{}],
         *  distributionFormats: ['csv', 'pdf'],
         *  id: 'abc123qwe345',
         *  idName: 'dataset-1',
         *  language: 'EN',
         *  licence: 'ABC Licence',
         *  modificationDate: '2002-02-02T00:00',
         *  publisher: 'Publisher1',
         *  releaseDate: '2001-01-01T00:00',
         *  tags: ['tag1', 'tag2'],
         *  title: 'dataset1',
         * }
       */
      /**
       * @property distributions
       * @type Array
       * @description Distributions of a dataset
       * @example distributions:  [{
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
         * },{..}]
       */
      // 2. resolve the promise with the prepared data matching the datamodels
    });
  }

  /**
   * @description GET all datasets matching the given criteria.
   * @param query {String} - The given query string
   * @param facets {Array} - The active facets
   * @param limit {Number} - The maximum amount of datasets to fetch
   * @param offset {Number} - The number of datasets to skip
   * @returns {Promise}
   */
  get(query, facets, limit, offset) {
    return new Promise((resolve, reject) => {
      // 1. Prepare the response data to match the following datamodels
      /**
       * @property datasets
       * @type Array<JSON>
       * @description An array of datasets.
       * @example datasets = [{
         *  categories: [{ id: 'energy', title: 'energy' }, ..],
         *  description: 'This is dataset1',
         *  distributions: [{}],
         *  distributionFormats: ['csv', 'pdf'],
         *  id: 'abc123qwe345',
         *  idName: 'dataset-1',
         *  language: 'EN',
         *  licence: 'ABC Licence',
         *  modificationDate: '2002-02-02T00:00',
         *  publisher: 'Publisher1',
         *  releaseDate: '2001-01-01T00:00',
         *  tags: ['tag1', 'tag2'],
         *  title: 'dataset1',
         * }, {..}]
       */
      /**
       * @property distributions
       * @type Array
       * @description Distributions of a dataset
       * @example distributions:  [{
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
         * },{..}]
       */
      // 2. resolve the promise with the prepared data matching the datamodels
    });
  }
}
