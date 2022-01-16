/**
 * @author Thomas Tursics
 * @created 2022-01-02
 * @description Contains helper functions for convert to different formats
 */

function makeTwoDigit(obj) {
  if (obj.toString().length === 1) {
    return `0${obj.toString()}`;
  }
  return obj.toString();
}

function formatDate(date) {
  return `${date.getFullYear()}-${makeTwoDigit((date.getMonth() + 1))}-`
          + `${makeTwoDigit(date.getDate())}T${makeTwoDigit(date.getHours())}:`
          + `${makeTwoDigit(date.getMinutes())}:${makeTwoDigit(date.getSeconds())}`;
}

/**
 * convert the dataset to JSON LD
 */
function getAsJSONLD(obj) {
  const rdf = {
    '@context': {
      dc: 'http://purl.org/dc/elements/1.1/',
      dcat: 'http://www.w3.org/ns/dcat#',
      dct: 'http://purl.org/dc/terms/',
      dcterms: 'http://purl.org/dc/terms/',
      edp: 'https://europeandataportal.eu/voc#',
      foaf: 'http://xmlns.com/foaf/0.1/',
      locn: 'http://www.w3.org/ns/locn#',
      owl: 'http://www.w3.org/2002/07/owl#',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      schema: 'http://schema.org/',
      skos: 'http://www.w3.org/2004/02/skos/core#',
      time: 'http://www.w3.org/2006/time',
      vcard: 'http://www.w3.org/2006/vcard/ns#',
      xsd: 'http://www.w3.org/2001/XMLSchema#',
    },
    '@graph': [
      {
        '@id': 'https://test.de/dataset111',
        '@type': 'dcat:Dataset',
        'dcat:distribution': [
        ],
        'dcterms:description': obj.getDescription,
        'dcterms:issued': {
          '@type': 'xsd:dateTime',
          '@value': formatDate(new Date()),
        },
        'dcterms:language': {
          '@id': 'http://publications.europa.eu/resource/authority/language/ENG',
        },
        'dcterms:modified': {
          '@type': 'xsd:dateTime',
          '@value': formatDate(new Date()),
        },
        'dcterms:title': obj.getTitle,
      },
    ],
  };

  if (Array.isArray(obj.distributions) && obj.distributions.length) {
    let resourceCount = 1;
    obj.distributions.forEach((distribution) => {
      const dist = {
        '@id': `https://test.de/dataset111/resource/${resourceCount}`,
        '@type': 'dcat:Distribution',
        'dcterms:license': distribution.licence,
        'dcterms:description': distribution.description,
        'dcterms:format': {
          '@id': distribution.format,
        },
        'dcterms:title': distribution.title,
        'dcat:accessURL': {
          '@id': distribution.downloadUrl,
        },
      };
      const id = {
        '@id': `https://test.de/dataset111/resource/${resourceCount}`,
      };
      rdf['@graph'].push(dist);
      rdf['@graph'][0]['dcat:distribution'].push(id);
      resourceCount += 1;
    });

    if (Array.isArray(obj.getKeywords) && obj.getKeywords.length > 0 && obj.getKeywords[0] !== '') {
      rdf['@graph'][0]['dcat:keyword'] = obj.getKeywords;
    }

    if (obj.getContactInfo.type !== '' && obj.getContactInfo.name !== '' && obj.getContactInfo.email !== '') {
      const contactPoint = {
        '@type': `vcard:${obj.getContactInfo.type}`,
        'vcard:fn': obj.getContactInfo.name,
        'vcard:hasEmail': {
          '@id': `mailto:${obj.getContactInfo.email}`,
        },
      };
      rdf['@graph'][0]['dcat:contactPoint'] = contactPoint;
    }

    if (obj.getPublisherInfo.name !== '' && obj.getPublisherInfo.type !== '' && obj.getPublisherInfo.homepage !== '') {
      const publisherInfo = {
        '@type': `http://xmlns.com/foaf/0.1/${obj.getPublisherInfo.type}`,
        'foaf:homepage':
        {
          '@id': obj.getPublisherInfo.homepage,
          '@type': '@id',
        },
        'foaf:name': obj.getPublisherInfo.name,
      };
      rdf['@graph'][0]['dct:publisher'] = publisherInfo;
    }

    if (Array.isArray(obj.getCategories) && obj.getCategories.length) {
      rdf['@graph'][0]['dcat:theme'] = obj.themeMapping(obj.getCategories);
    }
  }

  return rdf;
}

/**
 * convert the dataset to CKAN package_search format
 */
function getAsCKAN(obj) {
  const relationshipsAsSubject = [];
  const relationshipsAsObject = [];
  const now = (new Date()).toISOString().substring(0, 23);

  let lang = 'en';
  if (obj.getTranslationMetaData && obj.getTranslationMetaData.details) {
    lang = Object.keys(obj.getTranslationMetaData.details)[0];
  }

  const extras = [
    {
      catalog: obj.getCatalog,
    },
    {
      country: obj.getCountry,
      languages: obj.getLanguages,
    },
    {
      similarDatasets: obj.getSimilarDatasets,
      spatial: obj.getSpatial,
    },
  ];

  const groups = [];
  if (Array.isArray(obj.getCategories) && obj.getCategories.length) {
    obj.getCategories.forEach((category) => {
      groups.push({
        description: '',
        display_name: category.title,
        id: category.id,
        image_display_url: '',
        name: category.title,
        title: category.title,
      });
    });
  } else {
    groups.push({
      description: '',
      display_name: 'display_name',
      id: 'id',
      image_display_url: '',
      name: 'name',
      title: 'title',
    });
  }

  const orgaId = obj.getPublisher.resource.split('/');
  if ((orgaId.length > 1) && (orgaId[orgaId.length - 1] === '')) {
    orgaId.pop();
  }
  const organization = {
    id: orgaId[orgaId.length - 1],
    name: obj.getPublisher.name,
    title: obj.getPublisher.name,
    type: obj.getPublisher.type,
    description: '',
    image_url: '',
    created: '',
    is_organization: true,
    approval_status: 'approved',
    state: 'active',
  };

  const resources = [];
  obj.getDistributions.forEach((distribution, index) => resources.push({
    cache_last_updated: null,
    cache_url: null,
    created: distribution.releaseDate,
    datastore_active: false,
    description: distribution.description[lang],
    format: distribution.format.title,
    hash: '',
    id: distribution.id,
    last_modified: distribution.modificationDate,
    metadata_modified: now,
    mimetype: `text/${distribution.format.id.toLowerCase()}`,
    mimetype_inner: null,
    name: distribution.title[lang],
    package_id: '',
    position: index,
    resource_type: null,
    size: null,
    state: 'active',
    url: distribution.accessUrl[0],
    url_type: null,
  }));

  const tags = [];
  obj.getKeywords.forEach(keyword => tags.push({
    display_name: keyword.title,
    id: keyword.id,
    name: keyword.title,
    state: 'active',
    vocabulary_id: null,
  }));

  const results = [
    {
      author: '',
      author_email: '',
      creator_user_id: '',
      groups,
      id: obj.getID,
      isopen: true,
      license_id: obj.getLicences.id,
      license_title: obj.getLicences.title,
      maintainer: '',
      maintainer_email: '',
      metadata_created: obj.getReleaseDate,
      metadata_modified: obj.getModificationDate,
      name: obj.getIdName,
      notes: obj.getDescription[lang],
      num_resources: resources.length,
      num_tags: tags.length,
      organization,
      owner_org: '',
      private: false,
      relationships_as_object: relationshipsAsObject,
      relationships_as_subject: relationshipsAsSubject,
      resources,
      state: 'active',
      tags,
      title: obj.getTitle[lang],
      type: 'dataset',
      url: '',
      version: '1.0',
      extras,
    },
  ];
  const json = {
    help: 'https://demo.ckan.org/api/3/action/help_show?name=package_search',
    success: true,
    result: {
      count: results.length,
      facets: {},
      results,
      search_facets: {},
      sort: 'score desc, metadata_modified desc',
    },
  };

  return json;
}

// Export all functions as default export.
export {
  getAsCKAN,
  getAsJSONLD,
};
