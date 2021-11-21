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
  createArrayFacet(datasets, resData, {
    id: 'license',
    title: 'Licenses',
    object: 'licences',
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

export const filterFacets = (datasets, facets) => {
  let data = datasets;

  if (facets.catalog) {
    for (const catalog of facets.catalog) {
      data = data.filter(dataset => String(dataset.catalog.id).toLocaleLowerCase() === catalog.toLocaleLowerCase());
    }
  }

  if (facets.categories) {
    for (const category of facets.categories) {
      data = data.filter(dataset => dataset.categories.find(cat => String(cat.id).toLocaleLowerCase() === category.toLocaleLowerCase()));
    }
  }

  if (facets.country) {
    for (const country of facets.country) {
      data = data.filter(dataset => String(dataset.country.id).toLocaleLowerCase() === country.toLocaleLowerCase());
    }
  }

  if (facets.format) {
    for (const format of facets.format) {
      data = data.filter(dataset => dataset.distributionFormats.find(form => String(form.id).toLocaleLowerCase() === format.toLocaleLowerCase()));
    }
  }

  if (facets.keywords) {
    for (const keyword of facets.keywords) {
      data = data.filter(dataset => dataset.keywords.find(word => String(word.id).toLocaleLowerCase() === keyword.toLocaleLowerCase()));
    }
  }

  if (facets.licence) {
    for (const licence of facets.licence) {
      data = data.filter(dataset => dataset.licences.find(lic => String(lic.id).toLocaleLowerCase() === licence.toLocaleLowerCase()));
    }
  }

  return data;
};
