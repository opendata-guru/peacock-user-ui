/**
 * @author Hapreet Singh
 * @description Vuex store for data to use together with upload component
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  step: null,
  title: '',
  description: '',
  keywords: [],
  category: [],
  distributions: [],
  contact: {
    type: '',
    name: '',
    email: '',
  },
  publisher: {
    type: '',
    name: '',
    homepage: '',
  },
  apiUploadData: '',
  catalogue: '',
};

const getters = {
  getStep: state => state.step,
  getTitle: state => state.title,
  getDescription: state => state.description,
  getKeywords: state => state.keywords,
  getCategory: state => state.category,
  getDistributions: state => state.distributions,
  getContactInfo: state => state.contact,
  getPublisherInfo: state => state.publisher,
  getAPIUploadData: state => state.apiUploadData,
  getCatalogue: state => state.catalogue,
};

const actions = {
  /**
   * @description Sets the Step to which the user currently is on, in upoading route .
   * @param commit
   * @param step - The step number .
   */
  setStep: ({ commit }, step) => {
    commit('SET_STEP', step);
  },
  /**
   * @description store the metadata details of the dataset distribution.
   * @param commit
   * @param dataset - The dataset request containing the form information .
   */
  addDatasetDetails: ({ commit }, dataset) => {
    commit('SET_TITLE', dataset.title);
    commit('SET_DESCRIPTION', dataset.description);
    commit('SET_KEYWORD', dataset.keywords);
    commit('SET_CATEGORY', dataset.category);
    commit('SET_CONTACT', dataset.contact);
    commit('SET_PUBLISHER', dataset.publisher);
    commit('SET_CATALOGUE', dataset.catalogue);
  },
  addDistribution: ({ commit }, distribution) => {
    commit('ADD_DISTRIBUTION', distribution);
  },
  addApiUploadData: ({ commit }, apiData) => {
    commit('ADD_API_UPLOAD_DATA', apiData);
  },
  resetUploadData: ({ commit }, step) => {
    commit('RESET_UPLOAD', step);
  },
};

const mutations = {
  SET_STEP(state, step) {
    state.step = step;
  },
  SET_TITLE(state, title) {
    state.title = title;
  },
  SET_DESCRIPTION(state, description) {
    state.description = description;
  },
  SET_KEYWORD(state, keywords) {
    state.keywords = keywords;
  },
  SET_CATEGORY(state, category) {
    state.category = category;
  },
  SET_CONTACT(state, contact) {
    state.contact.name = contact.name;
    state.contact.type = contact.type;
    state.contact.email = contact.email;
  },
  SET_PUBLISHER(state, publisher) {
    state.publisher.name = publisher.name;
    state.publisher.type = publisher.type;
    state.publisher.homepage = publisher.homepage;
  },
  SET_CATALOGUE(state, catalogue) {
    state.catalogue = catalogue;
  },
  ADD_DISTRIBUTION(state, distribution) {
    state.distributions.push(distribution);
  },
  ADD_API_UPLOAD_DATA(state, apiData) {
    state.apiUploadData = apiData;
  },
  RESET_UPLOAD(state, step) {
    state.step = step;
    state.title = '';
    state.description = '';
    state.keywords = [];
    state.category = [];
    state.contact.name = '';
    state.contact.type = '';
    state.contact.email = '';
    state.publisher.name = '';
    state.publisher.type = '';
    state.publisher.homepage = '';
    state.distributions = [];
    state.apiUploadData = '';
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
