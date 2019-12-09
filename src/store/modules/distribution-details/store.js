/**
 * @author Dennis Ritter
 * @description Vuex store for the the details of a distribution.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * @example distribution: {
 *  accessUrl: 'http://demo-url-to-this-distribution.org/someID-123-xyz/blabla',
 *  description: 'This is the description of a distribution.'
 *  downloadUrl: 'http://demo-url-to-this-distribution.org/someID-123-xyz/filename.csv',
 *  format: 'csv',
 *  id: 'someID-123-xyz',
 *  modificationDate: 2017-05-31T18:33:48.018695,
 *  releaseDate: 2017-05-31T18:33:48.018695,
 *  title: 'someTitle',
 *  urlType: 'type of the url',
 * }
 */
const state = {
  distribution: {
    accessUrl: '',
    description: '',
    downloadUrl: '',
    format: '',
    id: '',
    licence: '',
    modificationDate: '',
    releaseDate: '',
    title: '',
    urlType: '',
  },
  service: null,
};

const getters = {
  getAccessUrl: state => state.distribution.accessUrl,
  getDescription: state => state.distribution.description,
  getDownloadUrl: state => state.distribution.downloadUrl,
  getFormat: state => state.distribution.format,
  getId: state => state.distribution.id,
  getLicence: state => state.distribution.licence,
  getModificationDate: state => state.distribution.modificationDate,
  getReleaseDate: state => state.distribution.releaseDate,
  getTitle: state => state.distribution.title,
  getUrlType: state => state.distribution.urlType,
  getService: state => state.service,
};

const actions = {
  /**
   * @description Loads details for the distribution with the given ID.
   * @param commit
   * @param state
   * @param id {String} The resource ID.
   */
  loadDistributionDetails({ state, commit }, id) {
    return new Promise((resolve, reject) => {
      commit('SET_ID', id);
      const service = getters.getService(state);
      service.getSingle(id)
        .then((response) => {
          commit('SET_ACCESS_URL', response.accessUrl);
          commit('SET_DESCRIPTION', response.description);
          commit('SET_FORMAT', response.format);
          commit('SET_MODIFICATION_DATE', response.modificationDate);
          commit('SET_RELEASE_DATE', response.releaseDate);
          commit('SET_TITLE', response.title);
          commit('SET_DOWNLOAD_URL', response.downloadUrl);
          commit('SET_URL_TYPE', response.urlType);
          resolve();
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.error(err);
          reject(err);
        });
    });
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
  SET_ACCESS_URL(state, url) {
    state.distribution.accessUrl = url;
  },
  SET_DESCRIPTION(state, description) {
    state.distribution.description = description;
  },
  SET_DOWNLOAD_URL(state, url) {
    state.distribution.downloadUrl = url;
  },
  SET_FORMAT(state, format) {
    state.distribution.format = format;
  },
  SET_ID(state, id) {
    state.distribution.id = id;
  },
  SET_MODIFICATION_DATE(state, date) {
    state.distribution.modificationDate = date;
  },
  SET_RELEASE_DATE(state, date) {
    state.distribution.releaseDate = date;
  },
  SET_SERVICE(state, service) {
    state.service = service;
  },
  SET_TITLE(state, title) {
    state.distribution.title = title;
  },
  SET_URL_TYPE(state, urlType) {
    state.distribution.urlType = urlType;
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
