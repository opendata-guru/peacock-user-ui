/* eslint-disable no-param-reassign */
/**
 * @Publisher Dennis Ritter
 * @description Vuex store for the the details of a dataset.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import {
  has,
  isObject,
  isArray,
} from 'lodash';

Vue.use(Vuex);

// DatasetDetails Module State
/**
 * @property dataset
 * @type JSON
 * @description A dataset object.
 * @example dataset = {
    *  catalog: { title: 'Catalog One', description: 'This is Catalog One.', id: 'catalog-one' },
    *  categories: [{ id: 'energy', title: 'Energy' }, ...],
    *  contactPoints: [{name: 'Benedicto Rebanks', type: 'Individual', resource: 'http://shutterfly.com/varius/integer/ac/leo/pellentesque/ultrices/mattis.js', email: 'brebanks0@posterous.com'}, ...],
    *  country: { title: 'Germany', id: 'DE' },
    *  description: { de: 'This is dataset1', en: 'This is dataset1' },
    *  distributions: [{}],
    *  distributionFormats: [{title: 'PDF', id: 'pdf'}, {title: 'CSV', id: 'csv'}],
    *  frequency: {title: 'Coastal Larkspur', resource: 'http://youtu.be/duis/faucibus.html'},
    *  id: 'abc123qwe345',
    *  identifiers: ['http://topsy.com/duis.aspx'],
    *  idName: 'dataset-1',
    *  keywords: [{ title: 'KEYWORD1', id: 'keyword1'}],
    *  landingPages: ['http://phpbb.com/placerat/praesent/blandit/nam/nulla/integer.json'],
    *  languages: ['de', 'en'],
    *  licences: [{ title: 'Licence One', id: 'licence-1', resource: 'https://asd.com/licence-one' }, ...],
    *  modificationDate: '2002-02-02T00:00',
    *  otherIdentifiers: ['https://gnu.org/blandit/mi/in.xml'],
    *  provenances: [{resource: 'https://diigo.com/cras/non/velit/nec/nisi.jpg', label: 'Label'}, ...],
    *  publisher: { name: 'Publisher One', type: 'organization', resource: 'https://abc.de/res', email: 'asd@123.de' },
    *  relatedResources: ['https://bluehost.com/ac/est/lacinia/nisi/venenatis/tristique/fusce.xml'],
    *  releaseDate: '2001-01-01T00:00',
    *  sources: ['https://hatena.ne.jp/ante/ipsum/primis/in.jpg'],
    *  spatial: { coordinates: [52.526, 13.314], type: 'Point' },
    *  title: { de: 'Der Titel', en: 'The Title' },
 * }
 */
const state = {
  dataset: {
    catalog: {},
    categories: [],
    conformsTo: [],
    contactPoints: [],
    country: {},
    description: {},
    /**
     * @example distributions:  [{
       * accessUrl: 'http://demo-url-to-this-resource.org/someID-123-xyz/blabla',
       * downloadUrl: 'http://demo-url-to-this-resource.org/someID-123-xyz/filename.csv',
       * description: 'A description of this distribution',
       * format: 'csv',
       * id: 'someID-123-xyz',
       * licence: '{ title: 'Licence One', id: 'licence-1', resource: 'https://asd.com/licence-one' }',
       * modificationDate: 2017-05-31T18:33:48.018695,
       * releaseDate: 2017-05-31T18:33:48.018695,
       * title: 'someTitle',
       * urlType: 'download',
     * },{..}]
     */
    distributions: [{}],
    distributionFormats: [{}],
    documentations: [],
    frequency: {},
    id: '',
    identifiers: [],
    idName: '',
    keywords: [],
    landingPages: [],
    languages: [],
    licences: [],
    loading: false,
    modificationDate: '',
    originalLanguage: '',
    otherIdentifiers: [],
    provenances: [],
    publisher: {},
    relatedResources: [],
    releaseDate: '',
    similarDatasets: [],
    sources: [],
    spatial: {},
    translationMetaData: {},
    title: {},
  },
  activeNavigationTab: 0,
  service: null,
};

const getters = {
  getActiveNavigationTab: state => state.activeNavigationTab,
  getCatalog: state => state.dataset.catalog,
  getCategories: state => state.dataset.categories,
  getConformsTo: state => state.dataset.conformsTo,
  getContactPoints: state => state.dataset.contactPoints,
  getCountry: state => state.dataset.country,
  getDescription: state => state.dataset.description,
  getDistributions: state => state.dataset.distributions,
  getDistributionFormats: state => state.dataset.distributionFormats,
  getDocumentations: state => state.dataset.documentations,
  getFrequency: state => state.dataset.frequency,
  getIdentifiers: state => state.dataset.identifiers,
  getID: state => state.dataset.id,
  getIdName: state => state.dataset.idName,
  getLandingPages: state => state.dataset.landingPages,
  getLanguages: state => state.dataset.languages,
  getLicences: state => state.dataset.licences,
  getLoading: state => state.loading,
  getModificationDate: state => state.dataset.modificationDate,
  getOriginalLanguage: state => state.dataset.originalLanguage,
  getOtherIdentifiers: state => state.dataset.otherIdentifiers,
  getProvenances: state => state.dataset.provenances,
  getPublisher: state => state.dataset.publisher,
  getRelatedResources: state => state.dataset.relatedResources,
  getReleaseDate: state => state.dataset.releaseDate,
  getKeywords: state => state.dataset.keywords,
  getService: state => state.service,
  getSimilarDatasets: state => state.dataset.similarDatasets,
  getSources: state => state.dataset.sources,
  getSpatial: state => state.dataset.spatial,
  getTranslationMetaData: state => state.dataset.translationMetaData,
  getTitle: state => state.dataset.title,
};

const actions = {
  /**
   * @description Loads details for the dataset with the given ID.
   * @param commit
   * @param state
   * @param id {String} The dataset ID.
   */
  loadDatasetDetails({ state, commit }, id) {
    commit('SET_LOADING', true);
    return new Promise((resolve, reject) => {
      commit('SET_ID', id);
      const service = getters.getService(state);
      service.getSingle(id)
        .then((response) => {
          commit('SET_CATALOG', response.catalog);
          commit('SET_CATEGORIES', response.categories);
          commit('SET_CONFORMS_TO', response.conformsTo);
          commit('SET_CONTACT_POINTS', response.contactPoints);
          commit('SET_COUNTRY', response.country);
          commit('SET_DESCRIPTION', response.description);
          commit('SET_DISTRIBUTIONS', response.distributions);
          commit('SET_DISTRIBUTION_FORMATS', response.distributionFormats);
          commit('SET_DOCUMENTATIONS', response.documentations);
          commit('SET_FREQUENCY', response.frequency);
          commit('SET_IDENTIFIERS', response.identifiers);
          commit('SET_ID_NAME', response.idName);
          commit('SET_LANDING_PAGES', response.landingPages);
          commit('SET_LANGUAGES', response.languages);
          commit('SET_LICENCES', response.licences);
          commit('SET_MODIFICATION_DATE', response.modificationDate);
          commit('SET_ORIGINAL_LANGUAGE', response.originalLanguage);
          commit('SET_OTHER_IDENTIFIERS', response.otherIdentifiers);
          commit('SET_PROVENANCES', response.provenances);
          commit('SET_PUBLISHER', response.publisher);
          commit('SET_RELATED_RESOURCES', response.relatedResources);
          commit('SET_RELEASE_DATE', response.releaseDate);
          commit('SET_KEYWORDS', response.keywords);
          commit('SET_SOURCES', response.sources);
          commit('SET_SPATIAL', response.spatial);
          commit('SET_TRANSLATION_META_DATA', response.translationMetaData);
          commit('SET_TITLE', response.title);
          commit('SET_LOADING', false);
          resolve();
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
          commit('SET_LOADING', false);
          reject(err);
        });
    });
  },
  /**
   * @description Loads details for the dataset with the given ID. But unlike loaddatasetDetails,
   * the Mutations after the request differ because this function is meant to fetch details for similar datasets of another dataset.
   * @param commit
   * @param state
   * @param id {String} The dataset ID.
   */
  loadSimilarDatasetDetails({ state, commit }, id) {
    commit('SET_LOADING', true);
    return new Promise((resolve, reject) => {
      const service = getters.getService(state);
      service.getSingle(id)
        .then((response) => {
          commit('SET_SD_DESCRIPTION', { id, description: response.description });
          commit('SET_SD_TITLE', { id, title: response.title });
          commit('SET_LOADING', false);
          resolve(response);
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
          commit('SET_LOADING', false);
          reject(err);
        });
    });
  },
  /**
   * @description Fetches similar datasets of the provided dataset id
   * @param id {Int} - The given dataset id
   */
  loadSimilarDatasets({ commit }, id) {
    commit('SET_LOADING', true);
    return new Promise((resolve, reject) => {
      const service = getters.getService(state);
      service.getSimilarDatasets(id)
        .then((response) => {
          commit('SET_SIMILAR_DATASETS', response.data);
          commit('SET_LOADING', false);
          resolve(response.data);
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
          commit('SET_LOADING', false);
          reject(err);
        });
    });
  },
  /**
   * @description Sets the active navigation tab to the index of the selected tab.
   * @param tabIndex {Int} - The given index of the selected tab
   */
  setActiveNavigationTab({ commit }, tabIndex) {
    commit('SET_ACTIVE_NAVIGATION_TAB', tabIndex);
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
  SET_ACTIVE_NAVIGATION_TAB(state, tabIndex) {
    state.activeNavigationTab = tabIndex;
  },
  SET_CATALOG(state, catalog) {
    state.dataset.catalog = catalog;
  },
  SET_CATEGORIES(state, categories) {
    state.dataset.categories = categories;
  },
  SET_CONFORMS_TO(state, conformsTo) {
    state.dataset.conformsTo = conformsTo;
  },
  SET_CONTACT_POINTS(state, contactPoints) {
    state.dataset.contactPoints = contactPoints;
  },
  SET_COUNTRY(state, country) {
    state.dataset.country = country;
  },
  SET_DESCRIPTION(state, description) {
    state.dataset.description = description;
  },
  SET_DISTRIBUTIONS(state, distributions) {
    state.dataset.distributions = distributions;
  },
  SET_DISTRIBUTION_FORMATS(state, distributionFormats) {
    state.dataset.distributionFormats = distributionFormats;
  },
  SET_DOCUMENTATIONS(state, documentations) {
    state.dataset.documentations = documentations;
  },
  SET_FREQUENCY(state, frequency) {
    state.dataset.frequency = frequency;
  },
  SET_ID(state, id) {
    state.dataset.id = id;
  },
  SET_IDENTIFIERS(state, identifiers) {
    state.dataset.identifiers = identifiers;
  },
  SET_ID_NAME(state, idName) {
    state.dataset.idName = idName;
  },
  SET_KEYWORDS(state, keywords) {
    state.dataset.keywords = keywords;
  },
  SET_LANDING_PAGES(state, landingPages) {
    state.dataset.landingPages = landingPages;
  },
  SET_LANGUAGES(state, languages) {
    state.dataset.languages = languages;
  },
  SET_LICENCES(state, licences) {
    state.dataset.licences = licences;
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_MODIFICATION_DATE(state, date) {
    state.dataset.modificationDate = date;
  },
  SET_ORIGINAL_LANGUAGE(state, originalLanguage) {
    state.dataset.originalLanguage = originalLanguage;
  },
  SET_OTHER_IDENTIFIERS(state, otherIdentifiers) {
    state.dataset.otherIdentifiers = otherIdentifiers;
  },
  SET_PROVENANCES(state, provenances) {
    state.dataset.provenances = provenances;
  },
  SET_PUBLISHER(state, publisher) {
    state.dataset.publisher = publisher;
  },
  SET_RELATED_RESOURCES(state, relatedResources) {
    state.dataset.relatedResources = relatedResources;
  },
  SET_RELEASE_DATE(state, date) {
    state.dataset.releaseDate = date;
  },
  SET_SD_DESCRIPTION(state, payload) {
    if (has(payload, 'id') && has(payload, 'description')) {
      const id = payload.id;
      const description = payload.description;
      if (isArray(state.dataset.similarDatasets)) {
        const similarDataset = state.dataset.similarDatasets.filter(el => el.id === id)[0];
        if (isObject(similarDataset)) Vue.set(similarDataset, 'description', description);
      }
    }
  },
  SET_SD_TITLE(state, payload) {
    if (has(payload, 'id') && has(payload, 'title')) {
      const id = payload.id;
      const title = payload.title;
      if (isArray(state.dataset.similarDatasets)) {
        const similarDataset = state.dataset.similarDatasets.filter(el => el.id === id)[0];
        if (isObject(similarDataset)) Vue.set(similarDataset, 'title', title);
      }
    }
  },
  SET_SERVICE(state, service) {
    state.service = service;
  },
  SET_SIMILAR_DATASETS(state, similarDatasets) {
    state.dataset.similarDatasets = similarDatasets;
  },
  SET_SOURCES(state, sources) {
    state.dataset.sources = sources;
  },
  SET_SPATIAL(state, spatial) {
    state.dataset.spatial = spatial;
  },
  SET_TRANSLATION_META_DATA(state, translationMetaData) {
    state.dataset.translationMetaData = translationMetaData;
  },
  SET_TITLE(state, title) {
    state.dataset.title = title;
  },
};

const module = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

export default module;
