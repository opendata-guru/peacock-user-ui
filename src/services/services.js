/**
 * @author Dennis ritter
 * @description Register services and constants in the injector.
 * @license Copyright 2019 Fraunhofer FOKUS
 *          Modifications copyright 2021 Thomas Tursics
 *          SPDX-License-Identifier: Apache-2.0
 */


// import vue-inject
import injector from 'vue-inject';

// Import glue-config.js
/* eslint-disable-next-line */
import { glueConfig as GLUE_CONFIG } from '../../config/user-configs';
// import impressumComp

export default (envConfig) => {
  injector.constant('baseUrl', envConfig.api.baseUrl);
  injector.constant('gazetteerBaseUrl', envConfig.api.gazetteerBaseUrl);
  injector.constant('uploadBaseUrl', envConfig.api.uploadBaseUrl);
  injector.constant('keycloak', envConfig.keycloak);
  injector.constant('rtp', envConfig.rtp);
  injector.constant('authToken', envConfig.api.authToken);
  injector.service('DatasetService', ['baseUrl'], GLUE_CONFIG.services.datasetService);
  injector.service('CatalogueService', ['baseUrl'], GLUE_CONFIG.services.catalogueService);
  injector.service('DistributionService', ['baseUrl'], GLUE_CONFIG.services.distributionService);
  if (GLUE_CONFIG.services.mapService) injector.service('MapService', ['baseUrl'], GLUE_CONFIG.services.mapService);
  if (GLUE_CONFIG.services.datastoreService) injector.service('DatastoreService', ['baseUrl'], GLUE_CONFIG.services.datastoreService);
  if (GLUE_CONFIG.services.gazetteerService) injector.service('GazetteerService', ['gazetteerBaseUrl'], GLUE_CONFIG.services.gazetteerService);
  if (GLUE_CONFIG.services.uploadService) injector.service('uploadService', ['uploadBaseUrl', 'authToken'], GLUE_CONFIG.services.uploadService);
  if (GLUE_CONFIG.services.authService) injector.service('authService', ['keycloak', 'rtp'], GLUE_CONFIG.services.authService);
  if (GLUE_CONFIG.services.jsonldService) injector.service('jsonldService', GLUE_CONFIG.services.jsonldService);
};
