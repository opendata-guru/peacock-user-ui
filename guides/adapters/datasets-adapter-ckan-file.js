/* eslint-disable no-restricted-syntax */
/**
 * @author Thomas Tursics
 * @license SPDX-License-Identifier: Apache-2.0
 */

import axios from 'axios';
import { getSingleResponseData } from './ckan-helper';
import { createAvailableFacets, filterFacets } from './facet-helper';

function sortTitleAsc(a, b) {
  return String(a.title.de).localeCompare(b.title.de);
}

function sortTitleDesc(a, b) {
  return String(b.title.de).localeCompare(a.title.de);
}

function sortModificationDate(a, b) {
  return new Date(b.modificationDate) - new Date(a.modificationDate);
}

function sortReleaseDate(a, b) {
  return new Date(b.releaseDate) - new Date(a.releaseDate);
}

export default class Datasets {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.datasets = null;
  }

  /**
   * @description lazy Load file (used internally)
   */
  lazyLoadFile(data, result, index) {
    return new Promise((resolve, reject) => {
      if (index < data.lazyload.length) {
        axios.get(data.lazyload[index])
          .then((lazyResponse) => {
            result.results.push(lazyResponse.data);

            this.lazyLoadFile(data, result, index + 1)
              .then((newResult) => {
                resolve(newResult);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve(result);
      }
    });
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
          function finish(result) {
            if (result.results.length !== result.count) {
              reject(new Error('Missmatch counting datasets.'));
            } else {
              resolve(result.results.map(dataset => getSingleResponseData(dataset)));
            }
          }

          const data = response.data;
          if (!data) {
            throw new Error('no data found');
          }

          let result;
          if (data.contents) {
            result = data.contents.result;
          } else {
            result = data.result;
          }
          if (!result) {
            result = {
              count: 0,
              results: [],
            };
          }

          // my own additional property
          if (data.lazyload) {
            result.count += data.lazyload.length;
            this.lazyLoadFile(data, result, 0)
              .then(() => {
                finish(result);
              });
          } else {
            finish(result);
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
      this.loadFile()
        .then((loadedDatasets) => {
          this.datasets = loadedDatasets;
          const dataset = this.datasets.find(data => data.id === id);
          resolve(dataset);
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
        .then((loadedDatasets) => {
          this.datasets = loadedDatasets;
          const query = q.trim().toLowerCase();
          let datasets = this.datasets;

          datasets = datasets.filter((dataset) => {
            if (query === '') {
              return true;
            }
            if (dataset.title && dataset.title.de && (dataset.title.de.toLowerCase().indexOf(query) !== -1)) {
              return true;
            }
            if (dataset.description && dataset.description.de && (dataset.description.de.toLowerCase().indexOf(query) !== -1)) {
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

          datasets = filterFacets(datasets, facets);

          const resData = {
            availableFacets: [],
            datasetsCount: datasets.length,
            datasets: [],
          };

          createAvailableFacets(datasets, resData);

          const start = (page - 1) * limit;
          const end = Math.min(start + limit, resData.datasetsCount);
          for (let d = start; d < end; d += 1) {
            resData.datasets.push(datasets[d]);
          }

          resolve(resData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
