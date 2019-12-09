// Import your implemented adapters
import datasetService from './myAdapters/src/datasets';
import distributionService from './myAdapters/src/distributions';

export default {
  api: {
    // The Backend base Url to fetch data from
    baseUrl: 'http://my-base.url.de/api/example/',
  },
  services: {
    // The used services
    datasetService,
    distributionService,
  },
};
