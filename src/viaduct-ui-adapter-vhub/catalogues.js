/* eslint-disable no-restricted-syntax */
/**
 * @author Dennis ritter
 * @description
 */

import axios from 'axios';

import catalogueGetters from './getters/catalogue-data-getters';

export default class Catalogues {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * @description GET catalogue by given id.
   * @param id
   */
  getSingle(id) {
    return new Promise((resolve, reject) => {
      const endpoint = `catalogues`;
      const reqStr = `${this.baseUrl}${endpoint}/${id}`;
      axios.get(reqStr, {
        params: {},
      })
      .then((response) => {
        const catalogue = response.data.result;
        const cat = {};
        try {
          cat.count = catalogueGetters.getCount(catalogue);
          cat.country = catalogueGetters.getCountry(catalogue);
          cat.description = catalogueGetters.getDescription(catalogue);
          cat.homepage = catalogueGetters.getHomepage(catalogue);
          cat.id = catalogueGetters.getId(catalogue);
          cat.idName = catalogueGetters.getIdName(catalogue);
          cat.languages = catalogueGetters.getLanguages(catalogue);
          cat.modificationDate = catalogueGetters.getModificationDate(catalogue);
          cat.publisher = catalogueGetters.getPublisher(catalogue);
          cat.releaseDate = catalogueGetters.getReleaseDate(catalogue)
          cat.title = catalogueGetters.getTitle(catalogue);
        }
        catch (error) {
          console.warn('Error in catalogues.js while checking response:', error.message);
        }
        resolve(cat);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  /**
   * @description GET all catalogues matching the given criteria.
   * @param q
   * @param facets
   * @param limit
   * @param offset
   * @param sort
   * @param facetOperator
   * @param facetGroupOperator
   * @returns {Promise}
   */
  get(q, facets, limit, page = 1, sort = 'relevance+asc, last_modified+asc, name+asc', facetOperator = "AND", facetGroupOperator = "AND") {
   
    return new Promise((resolve, reject) => {
      const endpoint = 'search';
      const reqStr = `${this.baseUrl}${endpoint}`;
      axios.get(reqStr, {
        params: {
          q,
          filter: "catalogue",
          sort,
          limit,
          page: page - 1,
          facets,
          facetOperator,
          facetGroupOperator,
          globalAggregation: facetOperator === "OR",
        },
      })
      .then((response) => {
        const resData = {
          availableFacets: [],
          cataloguesCount: response.data.result.count,
          catalogues: [],
        };
        // transform fetched facets
        for (const field of response.data.result.facets) {
          // Check for required field keys
          if (Object.hasOwnProperty.call(field, 'id') &&
              Object.hasOwnProperty.call(field, 'title') &&
              Object.hasOwnProperty.call(field, 'items')) {
            // Transform Items of field to use its id as Obj key for easier search later in app
            const items = [];
            for (const facet of field.items) {
              // Check for required facet/item keys
              if (Object.hasOwnProperty.call(facet, 'id') &&
                Object.hasOwnProperty.call(facet, 'title') &&
                Object.hasOwnProperty.call(facet, 'count')) {
                // Build object for current facet/item
                items.push({
                  'id': facet.id,
                  'count': facet.count,
                  'title': facet.title,
                })
              }
            }
            // Add to response array
            resData.availableFacets.push({
              'id': field.id,
              'title': field.title,
              'items': items,
            })
          }
        }

        // Transform catalogues Data model
        const catalogues = response.data.result.results;
        for (const catalogue of catalogues) {
          try {
            const cat = {};
            cat.count = catalogueGetters.getCount(catalogue);
            cat.country = catalogueGetters.getCountry(catalogue);
            cat.description = catalogueGetters.getDescription(catalogue);
            cat.homepage = catalogueGetters.getHomepage(catalogue);
            cat.id = catalogueGetters.getId(catalogue);
            cat.idName = catalogueGetters.getIdName(catalogue);
            cat.languages = catalogueGetters.getLanguages(catalogue);
            cat.modificationDate = catalogueGetters.getModificationDate(catalogue);
            cat.publisher = catalogueGetters.getPublisher(catalogue);
            cat.releaseDate = catalogueGetters.getReleaseDate(catalogue)
            cat.title = catalogueGetters.getTitle(catalogue);

            resData.catalogues.push(cat);
          }
          catch (error) {
            console.warn('Error in catalogues.js while checking response:', error.message);
            console.error(error.stack);
          }
        }
        resolve(resData);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}
