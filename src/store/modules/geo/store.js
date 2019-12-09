/* eslint-disable no-param-reassign */
/**
 * @author Dennis Ritter
 * @description Vuex store for geo operations
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// GeoBounds Module State
const state = {
  geoBounds: {},
  holdedGeoBounds: {},
};

const getters = {
  getGeoBoundsById: state => senderId => state.geoBounds[senderId],
  getHoldedGeoBoundsById: state => senderId => state.holdedGeoBounds[senderId],
  getGeoBounds: state => state.geoBounds,
};

const actions = {
  resetGeoBoundsForId({ commit }, boundsId) {
    commit('SET_GEO_BOUNDS', { undefined, boundsId });
  },
  setGeoBoundsForId({ commit }, { bounds, boundsId }) {
    commit('SET_GEO_BOUNDS', { bounds, boundsId });
  },
  resetHoldedGeoBoundsForId({ commit }, boundsId) {
    commit('SET_HOLDED_GEO_BOUNDS', { undefined, boundsId });
  },
  setHoldedGeoBoundsForId({ commit }, { bounds, boundsId }) {
    commit('SET_HOLDED_GEO_BOUNDS', { bounds, boundsId });
  },
};

const mutations = {
  SET_GEO_BOUNDS(state, { bounds, boundsId }) {
    Vue.set(state.geoBounds, boundsId, bounds);
  },
  SET_HOLDED_GEO_BOUNDS(state, { bounds, boundsId }) {
    // console.log(`Mutating Holded Geo Bounds: ${boundsId}:${bounds}`);
    Vue.set(state.holdedGeoBounds, boundsId, bounds);
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
