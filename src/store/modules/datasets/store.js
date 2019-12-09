/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/**
 * @author Dennis Ritter
 * @description Vuex store for the datasets module
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// Module Constants
/**
 * @description The Default amount of Datasets per page.
 * @type {number}
 */
const RESULTS_PER_PAGE = 15;

// Datasets Module State
const state = {
  /**
   * @property datasets
   * @type Array
   * @description An array of datasets.
   * @example datasets = [{
   *  catalogue: { title: 'Catalogue One', description: 'This is Catalogue One.', id: "catalogue-one" },
   *  categories: [{ id: 'energy', title: 'Energy' }, ..],
   *  country: { title: 'Germany', id: 'FR' },
   *  description: 'This is dataset1',
   *  distributions: [{}],
   *  distributionFormats: [{title: 'PDF', id: 'pdf'}, {title: 'CSV', id: 'csv'}],
   *  id: 'abc123qwe345',
   *  idName: 'dataset-1',
   *  keywords: { someCategory1: ['kw1', 'kw2'], category2['someKeyword']},
   *  languages: ["de", "en"],
   *  licence: {},
   *  modificationDate: '2002-02-02T00:00',
   *  publisher: { name: 'Publisher One', type: 'organization', resource: 'https://abc.de/res', email: 'asd@123.de' },
   *  releaseDate: '2001-01-01T00:00',
   *  title: { de: 'Der Titel', en: 'The Title' },
   * }, {...}, ]
   */
  datasets: [],
  loading: false,
  searchParameters: {
    // Text entered in the search input field
    query: '',
    limit: RESULTS_PER_PAGE,
    offset: 0,
    // The Facets to filter for
    facets: [],
    facetOperator: 'AND',
    facetGroupOperator: 'AND',
    datasetGeoBounds: undefined,
    sort: 'relevance+desc',
  },
  /**
   * @property availableFacets
   * @type Array
   * @description The set union of all available facets for the .
   * @example availableFacets = [
   *  {
   *    items: [{
   *      count: 42,
   *      title: 'facet1',
   *      id: 'facet-1',
   *    }, {..}],
   *    id: 'tagsId'
   *    title: 'tags',
   *  }, {..}]
   */
  availableFacets: [],
  page: 1,
  // The total number of datasets available with last request
  pageCount: 1,
  datasetsCount: 0,
  // The Service that implemented server requests for Datasets
  service: null,
};

const GETTERS = {
  getDatasets: state => state.datasets,
  getDatasetsCount: state => state.datasetsCount,
  getQuery: state => state.searchParameters.query,
  getLimit: state => state.searchParameters.limit,
  getLoading: state => state.loading,
  getOffset: state => state.searchParameters.offset,
  getFacets: state => state.searchParameters.facets,
  getFacetOperator: state => state.searchParameters.facetOperator,
  getFacetGroupOperator: state => state.searchParameters.facetGroupOperator,
  getDatasetGeoBounds: state => state.searchParameters.datasetGeoBounds,
  getAvailableFacets: state => state.availableFacets,
  getPage: state => state.page,
  getPageCount: state => state.pageCount,
  getService: state => state.service,
  getSort: state => state.searchParameters.sort,
};

const actions = {
  /**
   * @description Load all datasets matching the given parameters.
   * @param commit
   * @param state
   * @param options {Object} - Given search parameters
   * @param options.query {String} - The given query string
   * @param options.facets {Array} - The active facets
   * @param options.limit {Number} - The maximum amount of datasets to fetch
   * @param options.page {Number} - The current page
   * @param options.sort {String} - The sort method to use
   * @param options.geoBounds {Array} - The given bounds to setup a spatial search for
   * @param options.append {Boolean} - Decides whether current datasets in state will be replaced or fetched datasets appended.
   */
  loadDatasets(
    { commit, state },
    {
      query = GETTERS.getQuery(state),
      facets = GETTERS.getFacets(state),
      limit = RESULTS_PER_PAGE,
      page = GETTERS.getPage(state),
      // offset = (GETTERS.getPage(state) - 1) * limit,
      sort = GETTERS.getSort(state),
      facetOperator = GETTERS.getFacetOperator(state),
      facetGroupOperator = GETTERS.getFacetGroupOperator(state),
      geoBounds = GETTERS.getDatasetGeoBounds(state),
      append = false,
    },
  ) {
    commit('SET_LOADING', true);
    const gb = geoBounds;
    if (gb instanceof Array && gb[0] && gb[1]) {
      geoBounds = `${gb[0][0]},${gb[0][1]},${gb[1][0]},${gb[1][1]}`;
    } else {
      geoBounds = undefined;
    }
    return new Promise((resolve, reject) => {
      // commit('SET_OFFSET', offset);
      const service = GETTERS.getService(state);
      service.get(query, facets, limit, page, sort, facetOperator, facetGroupOperator, geoBounds)
        .then((response) => {
          commit('SET_AVAILABLE_FACETS', response.availableFacets);
          commit('SET_DATASETS_COUNT', response.datasetsCount);
          if (append) commit('ADD_DATASETS', response.datasets);
          else commit('SET_DATASETS', response.datasets);
          commit('SET_LOADING', false);
          resolve();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
          commit('SET_LOADING', false);
          reject(error);
        });
    });
  },
  /**
   * @description Loads more datasets.
   * @param commit
   * @param state
   * @param {number} amount - The amount of datasets to add.
   */
  // eslint-disable-next-line no-unused-vars
  loadAdditionalDatasets({ commit, state }, amount = RESULTS_PER_PAGE) {
    // const offset = GETTERS.getOffset(state) + amount;
    // commit('SET_OFFSET', offset);
    const page = GETTERS.getPage(state);
    const datasetsCount = GETTERS.getDatasetsCount(state);
    // If there are no more Datasets to load, cancel.
    // if (offset < datasetsCount) {
    // actions.loadDatasets({ commit, state }, { page, append: true });
    // }
    actions.loadDatasets({ commit, state }, { page, append: true });
  },
  /**
   * @description Autocomplete a query String by using a autocompletion service
   * @param commit
   * @param q {String} The Query to autocomplete
   */
  autocompleteQuery({ commit }, q) {
    const service = GETTERS.getService(state);
    // If autocomplete function does not exist in this service -> Abort
    if (typeof service.autocomplete !== 'function') return;
    /* eslint-disable consistent-return */
    return new Promise((resolve, reject) => {
      service.autocomplete(q)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  /**
   * @description Replace the current state facets by the given facets
   * @param commit
   * @param facets {Array} - The given facets
   */
  setFacets({ commit }, facets) {
    if (facets) commit('SET_FACETS', facets);
  },
  /**
   * @description Add the given facet to the states facets.
   * @param commit
   * @param params {Object} - The wrapped action parameters.
   * @param params.field {String} - The field of the given facet
   * @param params.facet {String} - The facet to add
   */
  addFacet({ commit }, { field, facet }) {
    commit('ADD_FACET', { field, facet });
  },
  /**
   * @description Remove the given facet from the states facets.
   * @param commit
   * @param params {Object} - The wrapped action parameters.
   * @param params.field {String} - The field of the given facet
   * @param params.facet {String} - The facet to remove
   */
  removeFacet({ commit }, { field, facet }) {
    commit('REMOVE_FACET', { field, facet });
  },
  /**
   * @description Remove the given facet from the states facets.
   * @param commit
   * @param operator {String} - The facet operator to set. Possible Operators : ['AND', 'OR'].
   */
  setFacetOperator({ commit }, operator) {
    commit('SET_FACET_OPERATOR', operator);
  },
  /**
   * @description Remove the given facet from the states facets.
   * @param commit
   * @param operator {String} - The facet operator to set. Possible Operators : ['AND', 'OR'].
   */
  setFacetGroupOperator({ commit }, operator) {
    commit('SET_FACET_GROUP_OPERATOR', operator);
  },
  /**
   * @description Handles page changes by through URL query.
   * @param commit
   * @param state
   * @param page {String} The given page number as a String
   */
  setPage({ commit }, page) {
    commit('SET_PAGE', page);
  },
  setPageCount({ commit }, count) {
    commit('SET_PAGE_COUNT', count);
  },
  /**
   * @description Replace the current state query by the given query
   * @param commit
   * @param query {String} - The given query
   */
  setQuery({ commit }, query) {
    commit('SET_QUERY', query);
  },
  /**
   * @description Replace the current sort method
   * @param commit
   * @param sort {String} - The given sort method to use now
   */
  setSort({ commit }, sort) {
    commit('SET_SORT', sort);
  },
  /**
   * @description Increases the limit that is stored in the state
   * @param commit
   * @param state
   * @param amount {Number} - The amount to add to the current state limit
   */
  incLimit({ commit, state, getters }, amount = RESULTS_PER_PAGE) {
    const limit = getters.getLimit(state) + amount;
    commit('SET_LIMIT', limit);
  },
  setDatasetGeoBounds({ commit }, bounds) {
    commit('SET_DATASET_GEO_BOUNDS', bounds);
  },
  setLoading({ commit }, isLoading) {
    commit('SET_LOADING', isLoading);
  },
  /**
   * @description Sets the Service to use when loading data.
   * @param commit
   * @param service - The service to use.
   */
  useService({ commit }, service) {
    commit('SET_SERVICE', service);
  },
};

const mutations = {
  SET_DATASETS(state, data) {
    state.datasets = data;
  },
  ADD_DATASETS(state, data) {
    state.datasets = state.datasets.concat(data);
  },
  SET_LIMIT(state, limit) {
    state.searchParameters.limit = limit;
  },
  SET_OFFSET(state, offset) {
    state.searchParameters.offset = offset;
  },
  SET_FACETS(state, facets) {
    state.searchParameters.facets = facets;
  },
  ADD_FACET(state, { field, facet }) {
    // If the facetField is not defined in state..
    if (!Object.prototype.hasOwnProperty.call(state.searchParameters.facets, field)) {
      // ..define it by assigning an array containing {value} in it
      state.searchParameters.facets[field] = [facet];
    } else {
      state.searchParameters.facets[field].push(facet);
    }
  },
  REMOVE_FACET(state, { field, facet }) {
    const index = state.searchParameters.facets[field].indexOf(facet);
    state.searchParameters.facets[field].splice(index, 1);
  },
  SET_DATASET_GEO_BOUNDS(state, bounds) {
    state.searchParameters.datasetGeoBounds = bounds;
  },
  SET_AVAILABLE_FACETS(state, facets) {
    state.availableFacets = facets;
  },
  SET_DATASETS_COUNT(state, datasetsCount) {
    state.datasetsCount = datasetsCount;
  },
  SET_FACET_OPERATOR(state, operator) {
    state.searchParameters.facetOperator = operator;
  },
  SET_FACET_GROUP_OPERATOR(state, operator) {
    state.searchParameters.facetGroupOperator = operator;
  },
  SET_PAGE(state, page) {
    state.page = page;
  },
  SET_PAGE_COUNT(state, count) {
    state.pageCount = count;
  },
  SET_QUERY(state, query) {
    state.searchParameters.query = query;
  },
  SET_SERVICE(state, service) {
    state.service = service;
  },
  SET_SORT(state, sort) {
    state.searchParameters.sort = sort;
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
};

const module = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters: GETTERS,
};

export default module;
