/* eslint-disable no-param-reassign */
/**
 * @Publisher Dennis Ritter
 * @description Vuex store for the the details of a catalogue.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  catalogue: {

  },
  service: null,
};

const getters = {
  getCatalogue: state => state.catalogue,
  getCatalogueService: state => state.service,
};

const actions = {
  /**
   * @description Loads details for the dataset with the given ID.
   * @param commit
   * @param state
   * @param id {String} The dataset ID.
   */
  loadCatalogue({ state, commit }, id) {
    return new Promise((resolve, reject) => {
      const service = getters.getCatalogueService(state);
      service.getSingle(id)
        .then((response) => {
          commit('SET_CATALOGUE', response);
          resolve(response);
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
  useCatalogueService({ commit }, service) {
    commit('SET_SERVICE', service);
  },
};

const mutations = {
  SET_CATALOGUE(state, catalogue) {
    state.catalogue = catalogue;
  },
  SET_SERVICE(state, service) {
    state.service = service;
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
