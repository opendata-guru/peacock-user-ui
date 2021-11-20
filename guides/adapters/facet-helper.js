/* eslint-disable no-restricted-syntax */
/**
 * @author Thomas Tursics
 * @license SPDX-License-Identifier: Apache-2.0
 */

const createObjectFacet = (resData, options) => {
  const items = [];
  const countItems = {};
  for (const dataset of resData.datasets) {
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

const createArrayFacet = (resData, options) => {
  const items = [];
  const countItems = {};
  for (const dataset of resData.datasets) {
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

const createDataScopeFacet = (resData) => {
  resData.availableFacets.push({
    id: 'dataScope',
    title: 'Data scope',
    items: [],
  });
};

const createCatalogFacets = (resData) => {
  createObjectFacet(resData, {
    id: 'catalog',
    title: 'Catalogues',
    object: 'catalog',
  });
};

const createCategoriesFacets = (resData) => {
  createArrayFacet(resData, {
    id: 'categories',
    title: 'Categories',
    object: 'categories',
  });
};

const createCountryFacets = (resData) => {
  createObjectFacet(resData, {
    id: 'country',
    title: 'Provenance',
    object: 'country',
  });
};

const createFormatFacet = (resData) => {
  createArrayFacet(resData, {
    id: 'format',
    title: 'Formats',
    object: 'distributionFormats',
  });
};

const createKeywordsFacet = (resData) => {
  createArrayFacet(resData, {
    id: 'keywords',
    title: 'Keywords',
    object: 'keywords',
  });
};

const createLicenseFacets = (resData) => {
  const items = [];
  const countItems = {};
  for (const dataset of resData.datasets) {
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

const createScoringFacet = (resData) => {
  resData.availableFacets.push({
    id: 'scoring',
    title: 'Scoring',
    items: [],
  });
};

export const createAvailableFacets = (resData) => {
  createCatalogFacets(resData);
  createCategoriesFacets(resData);
  createCountryFacets(resData);
  createDataScopeFacet(resData);
  createFormatFacet(resData);
  createKeywordsFacet(resData);
  createLicenseFacets(resData);
  createScoringFacet(resData);
};

export const silent = () => {
};
