/**
 * @author Dennis Ritter
 * @description Vuex store for data to use together with maps like Open Street Maps. (Markers, Tooltips, etc.)
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  suggestions: [],
  service: null,
};

const getters = {
  getSuggestions: state => state.suggestions,
  getService: state => state.service,
};

const actions = {
  /**
   * @description
   */
  autocomplete({ commit, state }, query) {
    return new Promise((resolve, reject) => {
      const service = getters.getService(state);
      service.autocomplete(query)
        .then((response) => {
          const res = response.data.result.results;
          commit('SET_SUGGESTIONS', res);
          resolve(res);
        }).catch((error) => {
          reject(error);
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
  SET_SUGGESTIONS(state, suggestions) {
    state.suggestions = suggestions;
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
