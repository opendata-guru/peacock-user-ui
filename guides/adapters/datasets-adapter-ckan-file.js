/* eslint-disable no-restricted-syntax */
/**
 * @author Thomas Tursics
 * @license copyright 2021-2022 Thomas Tursics
 *          SPDX-License-Identifier: Apache-2.0
 */

import axios from 'axios';
import { getSingleResponseData } from './ckan-helper';
import { createAvailableFacets, filterFacets } from './facet-helper';
import GLUE_CONFIG from '../../user-config/glue-config';

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
  lazyLoadFiles(lazyload) {
    return new Promise((resolve, reject) => {
      if (lazyload.length > 0) {
        this.loadFile(lazyload.shift())
          .then((loadedDatasets) => {
            this.lazyLoadFiles(lazyload)
              .then((result) => {
                resolve(result.concat(loadedDatasets));
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve([]);
      }
    });
  }

  /**
   * @description Load file once
   */
  loadFile(filePath) {
    return new Promise((resolve, reject) => {
      if (this.datasets) {
        resolve(this.datasets);
        return;
      }

      let reqStr = filePath || `${this.baseUrl}`;
      if (GLUE_CONFIG.enable.services.cacheBusting) {
        reqStr += `?now=${Date.now()}`;
      }

      axios.get(reqStr, {
        params: {},
      })
        .then((response) => {
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
          const lazyFiles = data.lazyload || [];

          this.lazyLoadFiles(lazyFiles)
            .then((lazyResult) => {
              if (result.results.length !== result.count) {
                reject(new Error('Missmatch counting datasets.'));
              } else {
                resolve(result.results.map((dataset) => getSingleResponseData(dataset)).concat(lazyResult));
              }
            });
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
          const dataset = this.datasets.find((data) => data.id === id);
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
