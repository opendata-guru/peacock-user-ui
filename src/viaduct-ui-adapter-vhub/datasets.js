/**
 * @author Dennis ritter
 * @description
 */

import axios from 'axios';
import { isNil, isArray } from 'lodash';

import datasetGetters from './getters/dataset-data-getters';
import distributionGetters from './getters/distribution-data-getters';

const checkBounds = (bounds) => {
    try {
        let gb = bounds;
        if (isNil(gb)) return undefined;
        // If gb is a string, split to array
        if (!isArray(gb) && typeof gb === 'string') gb = gb.split(',');
        // Check number of elements. we need 4 for latMin, LonMin, LatMax, LonMax
        if (isArray(gb) && gb.length === 4) {
            for (let coord of gb) {
                // Check if items are floats
                if (!parseFloat(coord)) return undefined;
                return gb;
            }
        }
        return undefined;
    } catch (error) {
        console.error(error.message);
        return undefined;
    }
};

const getResponseData = (dataset) => {
    const ds = {};
    ds.catalog = datasetGetters.getCatalog(dataset);
    ds.categories = datasetGetters.getCategories(dataset);
    ds.conformsTo = datasetGetters.getConformsTo(dataset);
    ds.contactPoints = datasetGetters.getContactPoints(dataset);
    ds.country = datasetGetters.getCountry(dataset);
    ds.description = datasetGetters.getDescription(dataset);
    ds.distributions = [];
    ds.distributionFormats = [];
    ds.documentations = datasetGetters.getDocumentations(dataset);
    ds.frequency = datasetGetters.getFrequency(dataset);
    ds.id = datasetGetters.getId(dataset);
    ds.identifiers = datasetGetters.getIdentifiers(dataset);
    ds.idName = datasetGetters.getIdName(dataset);
    ds.keywords = datasetGetters.getKeywords(dataset);
    ds.languages = datasetGetters.getLanguages(dataset);
    ds.landingPages = datasetGetters.getLandingPages(dataset);
    ds.licences = [];
    ds.modificationDate = datasetGetters.getModificationDate(dataset);
    ds.originalLanguage = datasetGetters.getOriginalLanguage(dataset);
    ds.otherIdentifiers = datasetGetters.getOtherIdentifiers(dataset);
    ds.provenances = datasetGetters.getProvenances(dataset);
    ds.publisher = datasetGetters.getPublisher(dataset);
    ds.relatedResources = datasetGetters.getRelatedResources(dataset);
    ds.releaseDate = datasetGetters.getReleaseDate(dataset);
    ds.sources = datasetGetters.getSources(dataset);
    ds.spatial = datasetGetters.getSpatial(dataset);
    ds.translationMetaData = datasetGetters.getTranslationMetaData(dataset);
    ds.title = datasetGetters.getTitle(dataset);
    for (const dist of datasetGetters.getDistributions(dataset)) {
        const distribution = {};
        distribution.accessUrl = distributionGetters.getAccessUrl(dist);
        distribution.description = distributionGetters.getDescription(dist);
        distribution.downloadUrls = distributionGetters.getDownloadUrls(dist);
        distribution.format = distributionGetters.getFormat(dist);
        distribution.id = distributionGetters.getId(dist);
        distribution.languages = distributionGetters.getLanguages(dist);
        distribution.licence = distributionGetters.getLicence(dist);
        distribution.modificationDate = distributionGetters.getModificationDate(dist);
        distribution.releaseDate = distributionGetters.getReleaseDate(dist);
        distribution.title = distributionGetters.getTitle(dist);
        ds.distributions.push(distribution);
        ds.licences.push(distribution.licence);
        ds.distributionFormats.push(distribution.format);
    }
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
            const endpoint = `datasets`;
            const reqStr = `${this.baseUrl}${endpoint}/${id}`;
            axios.get(reqStr, {
                params: {},
            })
                .then((response) => {
                    const dataset = response.data.result;
                    let ds = {};
                    try {
                        ds = getResponseData(dataset);
                    }
                    catch (error) {
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
    get(q, facets, limit, page = 0, sort = 'relevance+asc, last_modified+asc, name+asc', facetOperator = "AND", facetGroupOperator = "AND", geoBounds) {
        // The request parameters
        let params = {
            q,
            filter: "dataset",
            sort,
            limit,
            page: page - 1,
            facets,
            facetOperator,
            facetGroupOperator,
            globalAggregation: facetOperator === "OR",
        };
        // Add geoBounds parameters if the bounds are valid
        const bounds = checkBounds(geoBounds);
        if (!isNil(bounds)) {
            params.bboxMinLat = bounds[0];
            params.bboxMaxLat = bounds[2];
            params.bboxMinLon = bounds[1];
            params.bboxMaxLon = bounds[3];
        }

        return new Promise((resolve, reject) => {
            const endpoint = 'search';
            const reqStr = `${this.baseUrl}${endpoint}`;
            axios.get(reqStr, {
                params,
            })
                .then((response) => {
                    /**
                     * @property availableFacets
                     * @type {availableFacets: Array, datasetsCount, datasets: Array}
                     * @description The set union of all available facets for the .
                     */
                    const resData = {
                        availableFacets: [],
                        datasetsCount: response.data.result.count,
                        datasets: [],
                    };
                    const PLACEHOLDER = 'unknown';
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
                                    });
                                }
                            }
                            // Add to response array
                            resData.availableFacets.push({
                                'id': field.id,
                                'title': field.title,
                                'items': items,
                            });
                        }
                    }

                    // Transform Datasets Data model
                    const datasets = response.data.result.results;

                        for (const dataset of datasets) {
                            /**
                             * @property dataset
                             * @type JSON
                             * @description A dataset object.
                             **/
                            try {
                                let ds = {};
                                ds = getResponseData(dataset);
                                resData.datasets.push(ds);
                            }
                            catch (error) {
                                console.warn('Error in datasets.js while checking response:', error.message);
                                console.error(error.stack);
                            }
                        }
                    resolve(resData);
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    }
    /**
     * @description Get similar datasets to the dataset represented by the provided id.
     * @param id {int} The dataset id to get similar datasets for.
     */
    getSimilarDatasets(id) {
        return new Promise((resolve, reject) => {
            const params = {
                limit: 20,
            };
            const endpoint = 'similarity';
            const reqStr = `https://www.europeandataportal.eu/api/similarities/${endpoint}/${id}`;
            axios.get(reqStr, {
                params,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
    /**
     * @description Autocomplete the given query.
     * @param q {String} The Query to autocomplete.
     */
    autocomplete(q) {
        return new Promise((resolve, reject) => {
            const endpoint = 'autocomplete';
            const reqStr = `${this.baseUrl}${endpoint}`;
            axios.get(reqStr, {
                params: {
                    q,
                },
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

};
