/*
 * @license Copyright 2019 Fraunhofer FOKUS
 *          Modifications copyright 2021 Thomas Tursics
 *          SPDX-License-Identifier: Apache-2.0
 */

import Vue from 'vue';
import Router from 'vue-router';
import VueHead from 'vue-head';

import Home from '@/components/Home';
import Datasets from '@/components/Datasets';
import DatasetDetailsDataset from '@/components/EDP2-datasetDetails-dataset';
import DatasetDetailsCategories from '@/components/EDP2-datasetDetails-categories';
import DatasetDetailsSimilarDatasets from '@/components/EDP2-datasetDetails-similarDatasets';
import DatasetDetailsActivityStream from '@/components/EDP2-datasetDetails-activityStream';
// import DistributionDetails from '@/components/DistributionDetails';
import Imprint from '@/components/Imprint';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import MapBasic from '@/components/MapBasic';

/* eslint-disable */
import store from './store/index';
import GLUE_CONFIG from '../user-config/glue-config';
import { decode } from './utils/jwt';

const DatasetDetails = () => import(/* webpackChunkName: "datasetDetails" */'@/components/EDP2-datasetDetails');
const UploadPage = () => import(/* webpackChunkName: "uploadPage" */'@/components/Upload/EDP2-uploadPage');
const Catalogues = () => import(/* webpackChunkName: "catalogues" */'@/components/Catalogues');
const NotFound = () => import(/* webpackChunkName: "notFound" */'@/components/404-NotFound');
const Unauthorized = () => import(/* webpackChunkName: "unauthorized" */'@/components/401-Unauthorized');

Vue.use(Router);
Vue.use(VueHead);

const title = GLUE_CONFIG.title;

let router = new Router({
  base: GLUE_CONFIG.routerOptions.base,
  mode: GLUE_CONFIG.routerOptions.mode,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: to => {
        if (to.hash && to.hash.startsWith('#/')) {
          // Backward compatibility with Hash mode URLs
          // Redirect to History mode URL by removing the hashtag
          let url = document.createElement("a");
          url.href = `${window.location.protocol}//${window.location.host}${to.hash.slice(1)}`

          // Prevent redirection loop
          return url.pathname === '/' ? {name: 'Datasets'} : url.pathname;
        }
        return {name: 'Datasets'};
      },
      meta: {
        title,
      },
    },
    {
      path: '/datasets',
      name: 'Datasets',
      component: Datasets,
      meta: {
        title,
      },
      // props: { infiniteScrolling: false, pagination: true },
    },
    {
      path: '/catalogues',
      name: 'Catalogues',
      component: Catalogues,
      meta: {
        title,
      },
      // props: { infiniteScrolling: false, pagination: true },
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title,
      },
    },
    {
      path: '/imprint',
      name: 'Imprint',
      component: Imprint,
      title,
    },
    {
      path: '/privacypolicy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy,
      meta: {
        title,
      },
    },
    {
      path: '/maps',
      name: 'MapBasic',
      component: MapBasic,
      meta: {
        title,
      },
    },
    {
      path: '/error401',
      name: 'Unauthorized',
      component: Unauthorized,
      meta: {
        title,
      },
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title,
      },
    },
  ],
  scrollBehavior(savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});

if (GLUE_CONFIG.keycloak.enableLogin) {
  router.addRoutes([
    {
      path: '/upload',
      name: 'upload',
      component: UploadPage,
      props: {
        activeStep: 1,
      },
      meta: {
        title,
        requiresAuth: true,
      },
    },
  ]);
}

let routeDataset = {
  path: '/datasets/:ds_id',
  component: DatasetDetails,
  children: [
    {
      path: '',
      name: 'DatasetDetailsDataset',
      components: {
        datasetDetailsSubpages: DatasetDetailsDataset,
      },
      meta: {
        title,
      },
    },
  // {
  //   path: 'distributions/:dist_id',
  //   name: 'DistributionDetails',
  //   component: DistributionDetails,
  //   meta: {
  //     title,
  //   },
  // },
  ],
  meta: {
    title,
  },
};
if (GLUE_CONFIG.enable.dataset.categories) {
  routeDataset.children.push({
    path: 'categories',
    name: 'DatasetDetailsCategories',
    components: {
      datasetDetailsSubpages: DatasetDetailsCategories,
    },
    meta: {
      title,
    },
  });
}
if (GLUE_CONFIG.enable.dataset.similarDatasets) {
  routeDataset.children.push({
    path: 'similarDatasets',
    name: 'DatasetDetailsSimilarDatasets',
    components: {
      datasetDetailsSubpages: DatasetDetailsSimilarDatasets,
    },
    meta: {
      title,
    },
  });
}
if (GLUE_CONFIG.enable.dataset.activityStream) {
  routeDataset.children.push({
    path: 'activityStream',
    name: 'DatasetDetailsActivityStream',
    component: {
      datasetDetailsSubpages: DatasetDetailsActivityStream,
    },
    meta: {
      title,
    },
  });
}
router.addRoutes([routeDataset]);

router.beforeEach((to, from, next) => {
  // Hash mode backward-compatibility

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const auth = store.state.auth.auth;
    if (!auth.authenticated) {
      next('/error401');
    } else {
      // Checking the role allowed in rtpToken
      const rtpToken = decode(store.state.auth.rtptoken);
      rtpToken.realm_access.roles.forEach((role) => {
        if (role === 'provider') {
          // check or update the token on each request which needed authentication
          auth.updateToken(10).success((success) => {
            store.dispatch('auth/authLogin', auth);
            next();
          }).error((error) => {
            console.log('error on token '+ error); // eslint-disable-line
          });
        } else {
          // unauthorized
        }
      });
    }
  } else {
    document.title = to.meta.title;
    next();
  }
});

export default router;
