/* eslint-disable no-restricted-syntax */
/**
 * @author Thomas Tursics
 * @license SPDX-License-Identifier: Apache-2.0
 */

const createObjectFacet = (datasets, resData, options) => {
  const items = [];
  const countItems = {};
  for (const dataset of datasets) {
    if (!countItems[dataset[options.object].id]) {
      countItems[dataset[options.object].id] = {
        count: 0,
        title: dataset[options.object].title,
      };
    }
    countItems[dataset[options.object].id].count += 1;
  }
  Object.keys(countItems).forEach((key) => {
    items.push({
      count: countItems[key].count,
      id: key,
      title: countItems[key].title,
    });
  });

  resData.availableFacets.push({
    id: options.id,
    title: options.title,
    items,
  });
};

const createArrayFacet = (datasets, resData, options) => {
  const items = [];
  const countItems = {};
  for (const dataset of datasets) {
    for (const object of dataset[options.object]) {
      if (!countItems[object.id]) {
        countItems[object.id] = {
          count: 0,
          title: object.title,
        };
      }
      countItems[object.id].count += 1;
    }
  }
  Object.keys(countItems).forEach((key) => {
    items.push({
      count: countItems[key].count,
      id: key,
      title: countItems[key].title,
    });
  });

  resData.availableFacets.push({
    id: options.id,
    title: options.title,
    items,
  });
};

const createDataScopeFacet = (datasets, resData) => {
  resData.availableFacets.push({
    id: 'dataScope',
    title: 'Data scope',
    items: [],
  });
};

const createCatalogFacets = (datasets, resData) => {
  createObjectFacet(datasets, resData, {
    id: 'catalog',
    title: 'Catalogues',
    object: 'catalog',
  });
};

const createCategoriesFacets = (datasets, resData) => {
  createArrayFacet(datasets, resData, {
    id: 'categories',
    title: 'Categories',
    object: 'categories',
  });
};

const createCountryFacets = (datasets, resData) => {
  createObjectFacet(datasets, resData, {
    id: 'country',
    title: 'Provenance',
    object: 'country',
  });
};

const createFormatFacet = (datasets, resData) => {
  createArrayFacet(datasets, resData, {
    id: 'format',
    title: 'Formats',
    object: 'distributionFormats',
  });
};

const createKeywordsFacet = (datasets, resData) => {
  createArrayFacet(datasets, resData, {
    id: 'keywords',
    title: 'Keywords',
    object: 'keywords',
  });
};

const createLicenseFacets = (datasets, resData) => {
  const items = [];
  const countItems = {};
  for (const dataset of datasets) {
    for (const license of dataset.licences) {
      countItems[license] = (countItems[license] || 0) + 1;
    }
  }
  Object.keys(countItems).forEach((key) => {
    let id = 'unknown';
    if (key === 'Datenlizenz Deutschland - Namensnenung 2.0') {
      id = 'DL-DE BY 2.0';
    }

    items.push({
      count: countItems[key],
      id,
      title: key,
    });
  });

  resData.availableFacets.push({
    id: 'license',
    title: 'Licenses',
    items,
  });
};

const createScoringFacet = (datasets, resData) => {
  resData.availableFacets.push({
    id: 'scoring',
    title: 'Scoring',
    items: [],
  });
};

export const createAvailableFacets = (datasets, resData) => {
  createCatalogFacets(datasets, resData);
  createCategoriesFacets(datasets, resData);
  createCountryFacets(datasets, resData);
  createDataScopeFacet(datasets, resData);
  createFormatFacet(datasets, resData);
  createKeywordsFacet(datasets, resData);
  createLicenseFacets(datasets, resData);
  createScoringFacet(datasets, resData);
};

export const silent = () => {
};
