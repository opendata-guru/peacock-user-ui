/**
 * @author Dennis Ritter
 * @description The Main vuex store.
 */

import Vue from 'vue';
import Vuex from 'vuex';
// Import store modules
import catalogues from './modules/catalogues/store';
import catalogueDetails from './modules/catalogue-details/store';
import datasets from './modules/datasets/store';
import datasetDetails from './modules/dataset-details/store';
import distributionDetails from './modules/distribution-details/store';
import datastoreVisualisation from './modules/data-visualisation/datastore-visualisation/store';
import mapsData from './modules/mapsData/store';
import gazetteer from './modules/gazetteer/store';
import geo from './modules/geo/store';
import auth from './modules/auth/store';
import upload from './modules/upload/store';

Vue.use(Vuex);


const state = {};

const actions = {};

const mutations = {};

const getters = {
  /**
   * @description Returns the current route (name).
   * @param state
   */
  getCurrentRoute: state => state.route,
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    catalogues,
    catalogueDetails,
    datasets,
    datasetDetails,
    distributionDetails,
    datastoreVisualisation,
    mapsData,
    gazetteer,
    geo,
    auth,
    upload,
  },
});

export default store;
