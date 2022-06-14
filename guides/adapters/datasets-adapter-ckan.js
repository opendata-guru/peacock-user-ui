/* eslint-disable no-restricted-syntax */
/**
 * @author Dennis ritter
 * @description A sample datasets-adapter for a CKAN-Backend-API.
 * @license Modifications copyright 2021-2022 Thomas Tursics
 *          SPDX-License-Identifier: Apache-2.0
*/

import axios from 'axios';
import { getSingleResponseData, getResponseData } from './ckan-helper';

function buildQueryString(query, facets) {
  let queryString = query;
  Object.keys(facets).forEach((field) => {
    let facet;
    for (facet of facets[field]) {
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
      const reqStr = `${this.baseUrl}${endpoint}?id=${id}`;
      axios.get(reqStr, {
        params: {},
      })
        .then((response) => {
          const dataset = response.data.contents ? response.data.contents.result : response.data.result;
          let ds = {};
          try {
            ds = getSingleResponseData(dataset);
          } catch (error) {
            console.warn('Error in datasets-adapter-ckan.js while checking response:', error.message); // eslint-disable-line no-console
            console.error(error.stack); // eslint-disable-line no-console
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
  get(q, facets, limit, page = 0 /* , sort = 'relevance+asc, last_modified+asc, name+asc', facetOperator = "AND", facetGroupOperator = "AND", geoBounds */) {
    // The request parameters
    const params = `q=${buildQueryString(q, facets)}`
      // + `&sort=${ searchParams.sort }`
      + `&rows=${limit}`
      + `&start=${page - 1}`
      + '&facet.field=["tags", "groups"]';

    return new Promise((resolve, reject) => {
      const endpoint = 'package_search';
      const reqStr = `${this.baseUrl}${endpoint}?${params}`;
      axios.get(reqStr, {
        params: {},
      })
        .then((response) => {
          /**
           * @property availableFacets
           * @type JSON
           * @description The set union of all available facets for the .
           */
          const resData = {
            availableFacets: [],
            datasetsCount: response.data.contents ? response.data.contents.result.count : response.data.result.count,
            datasets: [],
          };
          // Transform Facets Data model
          const searchFacets = response.data.contents ? response.data.contents.result.search_facets : response.data.result.search_facets;
          Object.keys(searchFacets).forEach((field) => {
            if (searchFacets[field].items.length > 0) {
              const newField = {};
              newField.title = searchFacets[field].title;
              newField.items = [];
              let f;
              for (f of searchFacets[field].items) {
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
          const datasets = response.data.contents ? response.data.contents.result.results : response.data.result.results;
          let dataset;
          for (dataset of datasets) {
            /**
             * @property dataset
             * @type JSON
             * @description A dataset object.
             */
            let ds = {};
            ds = getResponseData(dataset);
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
