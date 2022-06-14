/**
 * @author Dennis Ritter
 * @description Vuex store for the the details of a resource.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  datastore: {
    id: '',
    records: [],
  },
  service: null,
};

const getters = {
  getId: (state) => state.datastore.id,
  getRecords: (state) => state.datastore.records,
  getService: (state) => state.service,
};

const actions = {
  /**
   * @description Loads the data from a datastore.
   * @param state
   * @param commit
   * @param id - The id of the Datastore to get the data from
   * @returns {Promise}
   */
  loadData({ state, commit }, id) {
    return new Promise((resolve, reject) => {
      commit('SET_ID', id);
      const service = getters.getService(state);
      service.getSingle(id)
        .then((response) => {
          commit('SET_RECORDS', response.records);
          resolve();
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error.message);
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
  SET_ID(state, id) {
    state.datastore.id = id;
  },
  SET_RECORDS(state, records) {
    state.datastore.records = records;
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
