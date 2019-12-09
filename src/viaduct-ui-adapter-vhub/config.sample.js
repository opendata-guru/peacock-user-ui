/* eslint-disable no-restricted-syntax */
/**
 * @author Dennis ritter
 * @description Sample configuration file for Viaduct-UI CKAN Adapters.
 *              Copy this file and rename it to 'config.js' to define configurable parameters.
 */

/**
 * @description Defines title and order of Facetfields (Groups for facets)
 */
const FACET_FIELD_TITLE_MAPPING = {
  "organization": {
    "title": "Organizations",
    "sortIndex": 0,
  },
  "tags": {
    "title": "Tags",
    "sortIndex": 3,
  },
  "groups": {
    "title": "Groups",
    "sortIndex": 1,
  },
  "license_id": {
    "title": "Licences",
    "sortIndex": 2,
  },
  "res_format": {
  "title:": "Format",
  "sortIndex": 4,
  }
};

export { FACET_FIELD_TITLE_MAPPING }
