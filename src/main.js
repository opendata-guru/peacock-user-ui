/**
 * @license Copyright 2019 Fraunhofer FOKUS
 *          Modifications copyright 2021 Thomas Tursics
 *          SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable import/first,import/newline-after-import,no-undef */
// import IE Promise polyfill
import '@babel/polyfill';
import 'es6-promise/auto';
// import vuex-router-sync. see: https://github.com/vuejs/vuex-router-sync
import { sync } from 'vuex-router-sync';
// import vue-progressbar. see: https://github.com/hilongjw/vue-progressbar
import VueProgressBar from 'vue-progressbar';
// import vue-i18n
import VueI18n from 'vue-i18n';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import vue-inject
import injector from 'vue-inject';
// from validation package
import VeeValidate from 'vee-validate';
// Import Font Awesome Icons Library for vue
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGoogle,
  faGooglePlus,
  faGooglePlusG,
  faFacebook,
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons';
import {
  faComment,
  faExternalLinkAlt,
  faPlus,
  faMinus,
  faArrowDown,
  faArrowUp,
  faInfoCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import main user configurations (glueConfig) and i18n configurations
/* eslint-disable-next-line */
import { glueConfig as GLUE_CONFIG, i18n as I18N_CONFIG } from '../config/user-configs';
// import vue-router
import router from './router';
// import vuex store
import store from './store/index';
import App from './App';
// import dateFilters to set moment.js locale + formatOptions. see: https://momentjs.com/docs/#/i18n/changing-locale/
// eslint-disable-next-line import/no-extraneous-dependencies
import dateFilters from './filters/dateFilters';
import RuntimeConfiguration from './utils/runtimeconfig';
// Configured language
const LOCALE = GLUE_CONFIG.locale;

// Set locale for dateFilters (moment.js)
dateFilters.setLocale(LOCALE);
// vue-i18n setup -- docs: https://kazupon.github.io/vue-i18n/en/started.html
Vue.use(VueI18n);
// const I18N = require('./i18n/i18n.json');
const i18n = new VueI18n({
  locale: LOCALE,
  fallbackLocale: 'en',
  messages: I18N_CONFIG,
  silentTranslationWarn: true,
});

Vue.use(RuntimeConfiguration, { baseConfig: GLUE_CONFIG, debug: false });

// Bootstrap requirements to use js-features of bs-components
require('@popperjs/core');
require('bootstrap');
require('./styles/styles.sass');
// OpenStreetMaps popup styles
require('leaflet/dist/leaflet.css');

// Tell Vue about vue-progressbar
const progressBarOptions = {
  thickness: '5px',
  autoRevert: false,
  transition: {
    speed: '1.0s',
    opacity: '0.5s',
    termination: 1000,
  },
};
// form validation package
Vue.use(VeeValidate);
Vue.use(VueProgressBar, progressBarOptions);
// Tell Vue about vue-inject
Vue.use(injector, { components: true });
import services from './services/services';
services(Vue.prototype.$env);

// Sync store and router
sync(store, router);

library.add(faGoogle, faGooglePlus, faGooglePlusG, faFacebook, faFacebookF, faInstagram, faTwitter, faLinkedinIn, faComment, faExternalLinkAlt, faPlus, faMinus, faArrowDown, faArrowUp, faInfoCircle, faExclamationTriangle);
Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
});
