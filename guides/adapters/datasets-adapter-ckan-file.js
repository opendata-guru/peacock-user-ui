/* eslint-disable no-restricted-syntax */
/**
 * @author Thomas Tursics
 * @license SPDX-License-Identifier: Apache-2.0
 */

import axios from 'axios';
import { getSingleResponseData, getResponseData } from './ckan-helper';
import { createAvailableFacets } from './facet-helper';

function sortTitleAsc(a, b) {
  return String(a.title).localeCompare(b.title);
}

function sortTitleDesc(a, b) {
  return String(b.title).localeCompare(a.title);
}

function sortModificationDate(a, b) {
  return new Date(b.metadata_modified) - new Date(a.metadata_modified);
}

function sortReleaseDate(a, b) {
  return new Date(b.metadata_created) - new Date(a.metadata_created);
}

export default class Datasets {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.datasets = null;
  }

  /**
   * @description Load file once
   */
  loadFile() {
    return new Promise((resolve, reject) => {
      if (this.datasets) {
        resolve(this.datasets);
        return;
      }

      const reqStr = `${this.baseUrl}`;
      axios.get(reqStr, {
        params: {},
      })
        .then((response) => {
          const data = response.data;
          if (!data) {
            throw new Error('no data found');
          }

          let result = undefined;
          if (data.contents) {
            result = data.contents.result;
          } else {
            result = data.result;
          }
          if (!result) {
            throw new Error('no result found');
          }

          if (result.results.length !== result.count) {
            reject(new Error('Missmatch counting datasets.'));
          } else {
            this.datasets = result.results;
            resolve(this.datasets);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @description GET dataset by given id.
   * @param id
   */
  getSingle(id) {
    return new Promise((resolve, reject) => {
      const endpoint = 'package_show';
      const reqStr = `${this.baseUrl}${endpoint}?id=${id}`;
      axios.get(reqStr, {
        params: {},
      })
        .then((response) => {
          const dataset = response.data.contents.result;
          let ds = {};
          try {
            ds = getSingleResponseData(dataset);
          } catch (error) {
            console.warn('Error in datasets.js while checking response:', error.message);
            console.error(error.stack);
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
   * @param q
   * @param facets
   * @param limit
   * @param page
   * @param sort
   * @param facetOperator
   * @param facetGroupOperator
   * @param geoBounds
   * @returns {Promise}
   */
  get(q, facets, limit, page = 0, sort = 'relevance+asc, last_modified+asc, name+asc'/* , facetOperator = "AND", facetGroupOperator = "AND", geoBounds */) {
    return new Promise((resolve, reject) => {
      this.loadFile()
        .then(() => {
          const query = q.trim().toLowerCase();
          let datasets = this.datasets;

          datasets = datasets.filter((dataset) => {
            if (query === '') {
              return true;
            }
            if (dataset.title.toLowerCase().indexOf(query) !== -1) {
              return true;
            }
            if (dataset.notes.toLowerCase().indexOf(query) !== -1) {
              return true;
            }
            return false;
          });

          const sortOption = sort.split(',')[0].split('+');
          if (sortOption.length === 2) {
            if (sortOption[0] === 'relevance') {
              // do nothing on 'relevance'
            } else if (sortOption[0] === 'modification_date') {
              datasets.sort(sortModificationDate);
            } else if (sortOption[0] === 'release_date') {
              datasets.sort(sortReleaseDate);
            } else if (sortOption[1] === 'asc') {
              datasets.sort(sortTitleAsc);
            } else {
              datasets.sort(sortTitleDesc);
            }
          }

          const resData = {
            availableFacets: [],
            datasetsCount: datasets.length,
            datasets: [],
          };

          console.log(facets);

          // TODO map all data to getResponseData(..)
          // createAvailableFacets(resData);

          const start = (page - 1) * limit;
          const end = Math.min(start + limit, resData.datasetsCount);
          for (let d = start; d < end; d += 1) {
            resData.datasets.push(getResponseData(datasets[d]));
          }

          createAvailableFacets(resData);

          resolve(resData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
