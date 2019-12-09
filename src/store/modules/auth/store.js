/* eslint-disable no-param-reassign */
/**
 * @Publisher Har Preet Singh
 * @description Vuex store for the the details of a Auth.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  auth: {
    authenticated: false,
  },
  service: null,
  rtptoken: '',
};

const getters = {
  securityAuth: state => state.auth,
  getRTPToken: state => state.rtptoken,
};

const actions = {
  /**
   * @description Login
   * @param commit
   * @param keycloakAuth - keycloack object
   */
  authLogin({ commit }, keycloakAuth) {
    commit('SECURITY_AUTH', keycloakAuth);
  },
  /**
   * @description logout
   * @param commit
   * @param keycloakAuth - keycloack object
   */
  authLogout({ commit }, keycloakAuth) {
    commit('SECURITY_AUTH', keycloakAuth);
    commit('RTP_TOKEN', '');
  },
  /**
   * @description RTP token store
   * @param commit
   * @param rtptoken - rtptoken
   */
  rtpToken({ commit }, rtptoken) {
    commit('RTP_TOKEN', rtptoken);
  },
};

const mutations = {
  SECURITY_AUTH(state, keycloakAuth) {
    state.auth = keycloakAuth;
  },
  RTP_TOKEN(state, rtpToken) {
    state.rtptoken = rtpToken;
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
