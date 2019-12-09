/* eslint-disable no-restricted-syntax */
/**
 * @author Dennis ritter
 * @description A sample datasets-adapter for a CKAN-Backend-API.
 */

import axios from 'axios';

function buildQueryString(query, facets) {
  let queryString = query;
  Object.keys(facets).forEach((field) => {
    for (const facet of facets[field]) {
      queryString += ` ${field}:${facet}`;
    }
  });
  return queryString;
}

export default class Datasets {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * @description GET dataset by given id.
   * @param id
   */
  getSingle(id) {
    return new Promise((resolve, reject) => {
      const endpoint = 'package_show';
      const reqStr = `${this.baseUrl}${endpoint}`;
      axios.get(reqStr, {
        params: {
          id,
        },
      })
        .then((response) => {
          const dataset = response.data.result;
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
          const ds = {};
          ds.categories = [];
          ds.description = dataset.notes;
          ds.distributions = [];
          ds.distributionFormats = [];
          ds.id = dataset.id;
          ds.idName = dataset.name;
          if (dataset.language) ds.language = dataset.language[0].label;
          else ds.language = 'unknown';
          ds.licence = dataset.license_title;
          ds.modificationDate = dataset.metadata_modified;
          ds.publisher = dataset.organization.title;
          ds.releaseDate = dataset.metadata_created;
          ds.tags = [];
          ds.title = dataset.title;
          for (const group of dataset.groups) {
            ds.categories.push(group.display_name);
          }
          for (const resource of dataset.resources) {
            if (resource.format) ds.distributionFormats.push(resource.format);
          }
          for (const tag of dataset.tags) {
            ds.tags.push(tag.display_name);
          }
          /**
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
          for (const dist of dataset.resources) {
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
            ds.distributions.push(distribution);
          }
          resolve(ds);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @description GET all datasets matching the given criteria.
   * @param query
   * @param facets
   * @param limit
   * @param offset
   * @returns {Promise}
   */
  get(query, facets, limit, offset) {
    return new Promise((resolve, reject) => {
      const endpoint = 'package_search';
      const reqStr = `${this.baseUrl}${endpoint}`;
      const queryString = buildQueryString(query, facets);
      axios.get(reqStr, {
        params: {
          q: queryString,
          // sort: searchParams.sort,
          rows: limit,
          start: offset,
          'facet.field': '["tags", "groups"]',
        },
      })
        .then((response) => {
          /**
           * @property availableFacets
           * @type JSON
           * @description The set union of all available facets for the .
           * @example availableFacets = [
           *  {
           *    items: [{
           *      count: 42,
           *      title: 'facet1',
           *      idName: 'facet-1',
           *    }, {..}],
           *    title: 'tags',
           *  }, {..}]
           */
          const resData = {
            availableFacets: [],
            datasetsCount: response.data.result.count,
            datasets: [],
          };
          // Transform Facets Data model
          const searchFacets = response.data.result.search_facets;
          Object.keys(searchFacets).forEach((field) => {
            if (searchFacets[field].items.length > 0) {
              const newField = {};
              newField.title = searchFacets[field].title;
              newField.items = [];
              for (const f of searchFacets[field].items) {
                const facet = {};
                facet.count = f.count;
                facet.idName = f.name;
                facet.title = f.display_name;
                newField.items.push(facet);
              }
              resData.availableFacets.push(newField);
            }
          });
          // Transform Datasets Data model
          const datasets = response.data.result.results;
          for (const dataset of datasets) {
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
            const ds = {};
            ds.categories = [];
            ds.description = dataset.notes;
            ds.distributions = [];
            ds.distributionFormats = [];
            ds.id = dataset.id;
            ds.idName = dataset.name;
            if (dataset.language) ds.language = dataset.language[0].label;
            else ds.language = 'unknown';
            ds.licence = dataset.license_title;
            ds.modificationDate = dataset.metadata_modified;
            ds.publisher = dataset.organization.title;
            ds.releaseDate = dataset.metadata_created;
            ds.tags = [];
            ds.title = dataset.title;
            for (const group of dataset.groups) {
              ds.categories.push(group.display_name);
            }
            for (const dist of dataset.resources) {
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
              ds.distributions.push(distribution);
              if (dist.format) ds.distributionFormats.push(dist.format);
            }
            for (const tag of dataset.tags) {
              ds.tags.push(tag.display_name);
            }
            resData.datasets.push(ds);
          }
          resolve(resData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
