/* eslint-disable no-restricted-syntax */
/**
 * @author Thomas Tursics
 * @license SPDX-License-Identifier: Apache-2.0
 */

const getCommonResponseData = (dataset) => {
  const ds = {};

  ds.catalog = {
    id: 0,
    title: 'Default Catalog',
    description: 'CKAN does not define a catalog',
  };
  ds.categories = [];
  for (const group of dataset.groups) {
    ds.categories.push({
      id: group.id ? group.id : 0,
      title: group.display_name,
      resource: undefined,
    });
  }
  // ds.categories = datasetGetters.getCategories(dataset);
  ds.country = {
    id: 'de',
    title: 'Deutschland',
  };
  ds.distributions = [];
  ds.distributionFormats = [];
  for (const dist of dataset.resources) {
    const distribution = {};
    distribution.accessUrl = dist.access_url;
    if (dist.description) {
      distribution.description = {
        de: dist.description,
      };
    } else {
      distribution.description = {
        en: 'No description given',
      };
    }
    distribution.downloadUrl = [];
    distribution.downloadUrl.push(dist.url);
    const formats = dist.format.split('/');
    distribution.format = {
      id: formats[formats.length - 1],
      title: formats[formats.length - 1],
    };
    distribution.id = dist.id;
    distribution.licence = {
      id: undefined,
      title: dist.license ? dist.license : undefined,
      resource: undefined,
      description: undefined,
      la_url: undefined,
    };
    distribution.modificationDate = dist.last_modified;
    distribution.releaseDate = dist.created;
    distribution.title = {
      de: dist.name,
    };
    ds.distributions.push(distribution);
    ds.distributionFormats.push(distribution.format);
  }
  ds.id = dataset.id;
  ds.idName = dataset.name;
  ds.keywords = [];
  for (const tag of dataset.tags) {
    ds.keywords.push({
      id: tag.id,
      title: tag.display_name,
    });
  }
  ds.languages = [];
  if (dataset.language) ds.languages.push(dataset.language);
  ds.licences = [];
  if (dataset.license_title) ds.licences.push(dataset.license_title);
  ds.modificationDate = dataset.metadata_modified;
  ds.publisher = {
    type: dataset.organization.type,
    name: dataset.organization.title,
    email: undefined,
    resource: undefined,
  };
  ds.releaseDate = dataset.metadata_created;
  ds.title = {
    de: dataset.title,
  };
  ds.translationMetaData = {
    fullAvailableLanguages: [],
    details: {},
    status: undefined,
  };

  return ds;
};

export const getResponseData = (dataset) => {
  const ds = getCommonResponseData(dataset);
  /* ds.conformsTo = datasetGetters.getConformsTo(dataset);
  ds.contactPoints = datasetGetters.getContactPoints(dataset);
  ds.documentations = datasetGetters.getDocumentations(dataset);
  ds.frequency = datasetGetters.getFrequency(dataset);
  ds.identifiers = datasetGetters.getIdentifiers(dataset);
  ds.landingPages = datasetGetters.getLandingPages(dataset);
  ds.originalLanguage = datasetGetters.getOriginalLanguage(dataset);
  ds.otherIdentifiers = datasetGetters.getOtherIdentifiers(dataset);
  ds.provenances = datasetGetters.getProvenances(dataset);
  ds.relatedResources = datasetGetters.getRelatedResources(dataset);
  ds.sources = datasetGetters.getSources(dataset);
  ds.spatial = datasetGetters.getSpatial(dataset);
  ds.translationMetaData = datasetGetters.getTranslationMetaData(dataset);
  return ds; */

  ds.conformsTo = [];
  ds.contactPoints = [];
  ds.description = {
    de: dataset.description,
  };

  return ds;
};

export const getSingleResponseData = (dataset) => {
  const ds = getCommonResponseData(dataset);

  ds.description = {
    de: dataset.notes,
  };

  return ds;
};
