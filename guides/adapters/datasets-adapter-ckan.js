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

const getCommonResponseData = (dataset) => {
  const ds = {};

  ds.catalog = {
    id: 0,
    title: 'Default Catalog',
    description: 'CKAN does not define a catalog',
  };
  ds.categories = [];
  for (const group of dataset.groups) {
    ds.categories.push({
      id: group.id ? group.id : 0,
      title: group.display_name,
      resource: undefined,
    });
  }
  // ds.categories = datasetGetters.getCategories(dataset);
  ds.country = {
    id: 'de',
    title: 'Irgendwas',
  };
  ds.distributions = [];
  ds.distributionFormats = [];
  for (const dist of dataset.resources) {
    const distribution = {};
    distribution.accessUrl = dist.access_url;
    if (dist.description) {
      distribution.description = {
        de: dist.description,
      };
    } else {
      distribution.description = {
        en: 'No description given',
      };
    }
    distribution.downloadUrl = [];
    distribution.downloadUrl.push(dist.url);
    const formats = dist.format.split('/');
    distribution.format = {
      id: formats[formats.length - 1],
      title: formats[formats.length - 1],
    };
    distribution.id = dist.id;
    distribution.licence = {
      id: undefined,
      title: dist.license ? dist.license : undefined,
      resource: undefined,
      description: undefined,
      la_url: undefined,
    };
    distribution.modificationDate = dist.last_modified;
    distribution.releaseDate = dist.created;
    distribution.title = {
      de: dist.name,
    };
    ds.distributions.push(distribution);
    ds.distributionFormats.push(distribution.format);
  }
  ds.id = dataset.id;
  ds.idName = dataset.name;
  ds.keywords = [];
  for (const tag of dataset.tags) {
    ds.keywords.push({
      id: tag.id,
      title: tag.display_name,
    });
  }
  ds.languages = [];
  if (dataset.language) ds.languages.push(dataset.language);
  ds.licences = [];
  if (dataset.license_title) ds.licences.push(dataset.license_title);
  ds.modificationDate = dataset.metadata_modified;
  ds.publisher = {
    type: dataset.organization.type,
    name: dataset.organization.title,
    email: undefined,
    resource: undefined,
  };
  ds.releaseDate = dataset.metadata_created;
  ds.title = {
    de: dataset.title,
  };
  ds.translationMetaData = {
    fullAvailableLanguages: [],
    details: {},
    status: undefined,
  };

  return ds;
};

const getResponseData = (dataset) => {
  const ds = getCommonResponseData(dataset);
  /* ds.conformsTo = datasetGetters.getConformsTo(dataset);
  ds.contactPoints = datasetGetters.getContactPoints(dataset);
  ds.documentations = datasetGetters.getDocumentations(dataset);
  ds.frequency = datasetGetters.getFrequency(dataset);
  ds.identifiers = datasetGetters.getIdentifiers(dataset);
  ds.landingPages = datasetGetters.getLandingPages(dataset);
  ds.originalLanguage = datasetGetters.getOriginalLanguage(dataset);
  ds.otherIdentifiers = datasetGetters.getOtherIdentifiers(dataset);
  ds.provenances = datasetGetters.getProvenances(dataset);
  ds.relatedResources = datasetGetters.getRelatedResources(dataset);
  ds.sources = datasetGetters.getSources(dataset);
  ds.spatial = datasetGetters.getSpatial(dataset);
  ds.translationMetaData = datasetGetters.getTranslationMetaData(dataset);
  return ds; */

  ds.conformsTo = [];
  ds.contactPoints = [];
  ds.description = {
    de: dataset.description,
  };

  return ds;
};

const getSingleResponseData = (dataset) => {
  const ds = getCommonResponseData(dataset);

  ds.description = {
    de: dataset.notes,
  };

  return ds;
};

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
            datasetsCount: response.data.contents.result.count,
            datasets: [],
          };
          // Transform Facets Data model
          const searchFacets = response.data.contents.result.search_facets;
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
          const datasets = response.data.contents.result.results;
          for (const dataset of datasets) {
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
