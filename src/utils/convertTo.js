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
  const extras = [];
  const relationshipsAsSubject = [];
  const relationshipsAsObject = [];

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

  const resources = [
    {
      cache_last_updated: null,
      cache_url: null,
      created: '2021-11-30T07:50:22.007373',
      datastore_active: false,
      description: '',
      format: 'CSV',
      hash: '',
      id: 'b7d2ff43-c675-4690-a8a8-efc52cafeebf',
      last_modified: '2021-11-30T07:50:21.969820',
      metadata_modified: '2021-11-30T07:51:27.036922',
      mimetype: 'application/x-empty',
      mimetype_inner: null,
      name: 'test.csv',
      package_id: 'a74de57d-5d2a-4899-a498-44035c01fab6',
      position: 0,
      resource_type: null,
      size: 0,
      state: 'active',
      url: 'https://demo.ckan.org/dataset/a74de57d-5d2a-4899-a498-44035c01fab6/resource/b7d2ff43-c675-4690-a8a8-efc52cafeebf/download/test.csv',
      url_type: 'upload',
    },
    {
      cache_last_updated: null,
      cache_url: null,
      created: '2021-11-30T07:51:27.056260',
      datastore_active: true,
      description: '',
      format: 'CSV',
      hash: '',
      id: '00b375bd-ff4f-46b2-93bc-e38b2e89e79b',
      last_modified: '2021-11-30T07:51:26.999836',
      metadata_modified: '2021-11-30T07:51:27.037202',
      mimetype: 'text/csv',
      mimetype_inner: null,
      name: 'test1.csv',
      package_id: 'a74de57d-5d2a-4899-a498-44035c01fab6',
      position: 1,
      resource_type: null,
      size: 12,
      state: 'active',
      url: 'https://demo.ckan.org/dataset/a74de57d-5d2a-4899-a498-44035c01fab6/resource/00b375bd-ff4f-46b2-93bc-e38b2e89e79b/download/test1.csv',
      url_type: 'upload',
    },
  ];
  /* const resources2 = [
    {
      cache_last_updated: null,
      cache_url: null,
      created: '2021-04-09T14:31:09.032858',
      datastore_active: true,
      description: 'This is a sample resource added via url.',
      format: 'CSV',
      hash: '',
      id: 'e687245d-7835-44b0-8ed3-0827de123895',
      last_modified: null,
      metadata_modified: '2021-04-09T14:31:09.021596',
      mimetype: 'text/csv',
      mimetype_inner: null,
      name: 'sample-linked.csv',
      package_id: 'c322307a-b871-44fe-a602-32ee8437ff04',
      position: 0,
      resource_type: null,
      size: null,
      state: 'active',
      url: 'https://raw.githubusercontent.com/datopian/CKAN_Demo_Datasets/main/resources/org1_sample.csv',
      url_type: null,
    },
    {
      cache_last_updated: null,
      cache_url: null,
      created: '2021-04-09T14:31:45.092631',
      datastore_active: true,
      description: 'Sample csv (uploaded).',
      format: 'CSV',
      hash: '',
      id: 'b53c9e72-6b59-4cda-8c0c-7d6a51dad12a',
      last_modified: '2021-04-09T16:13:57.353205',
      metadata_modified: '2021-04-09T16:13:57.367140',
      mimetype: 'application/csv',
      mimetype_inner: null,
      name: 'sample.csv',
      package_id: 'c322307a-b871-44fe-a602-32ee8437ff04',
      position: 1,
      resource_type: null,
      size: 6731,
      state: 'active',
      url: 'https://demo.ckan.org/dataset/c322307a-b871-44fe-a602-32ee8437ff04/resource/b53c9e72-6b59-4cda-8c0c-7d6a51dad12a/download/sample.csv',
      url_type: 'upload',
    },
    {
      cache_last_updated: null,
      cache_url: null,
      created: '2021-04-09T16:21:17.140402',
      datastore_active: true,
      description: 'Sample views for csv.',
      format: 'CSV',
      hash: '',
      id: '9ce6650b-6ff0-4a52-9b10-09cfc29bbd7e',
      last_modified: '2021-04-09T16:21:17.106693',
      metadata_modified: '2021-04-13T12:41:06.751746',
      mimetype: null,
      mimetype_inner: null,
      name: 'views.csv',
      package_id: 'c322307a-b871-44fe-a602-32ee8437ff04',
      position: 2,
      resource_type: null,
      size: 32773,
      state: 'active',
      url: 'https://demo.ckan.org/dataset/c322307a-b871-44fe-a602-32ee8437ff04/resource/9ce6650b-6ff0-4a52-9b10-09cfc29bbd7e/download/co2-mm-mlo_csv.csv',
      url_type: 'upload',
    },
    {
      cache_last_updated: null,
      cache_url: null,
      created: '2021-04-09T14:49:24.711541',
      datastore_active: false,
      description: 'Sample pdf file.',
      format: 'PDF',
      hash: '',
      id: '8aa53505-3b7f-4b9c-9b54-cf674eadc3f1',
      last_modified: '2021-04-09T16:11:46.261373',
      metadata_modified: '2021-04-13T12:39:41.141419',
      mimetype: null,
      mimetype_inner: null,
      name: 'sample.pdf',
      package_id: 'c322307a-b871-44fe-a602-32ee8437ff04',
      position: 3,
      resource_type: null,
      size: 712352,
      state: 'active',
      url: 'https://demo.ckan.org/dataset/c322307a-b871-44fe-a602-32ee8437ff04/resource/8aa53505-3b7f-4b9c-9b54-cf674eadc3f1/download/sample.pdf',
      url_type: 'upload',
    },
    {
      cache_last_updated: null,
      cache_url: null,
      created: '2021-04-09T16:17:05.189302',
      datastore_active: false,
      description: 'Sample txt file.',
      format: 'TXT',
      hash: '',
      id: '0185907b-2812-437f-9c64-eae24771ef5f',
      last_modified: '2021-04-09T16:17:05.136426',
      metadata_modified: '2021-04-13T12:39:24.524530',
      mimetype: null,
      mimetype_inner: null,
      name: 'sample.txt',
      package_id: 'c322307a-b871-44fe-a602-32ee8437ff04',
      position: 4,
      resource_type: null,
      size: 85,
      state: 'active',
      url: 'https://demo.ckan.org/dataset/c322307a-b871-44fe-a602-32ee8437ff04/resource/0185907b-2812-437f-9c64-eae24771ef5f/download/sample.txt',
      url_type: 'upload',
    },
    {
      cache_last_updated: null,
      cache_url: null,
      created: '2021-04-13T12:19:02.178513',
      datastore_active: false,
      description: 'Sample GeoJSON resource for the list of countries.\r\n\r\nResource taken from https://openlayers.org/  \r\nLicensed under the 2-Clause BSD (https://www.tldrlegal.com/l/freebsd)',
      format: 'GeoJSON',
      hash: '',
      id: 'ecd4a62d-998b-46e4-8a64-cadac2125c64',
      last_modified: '2021-04-13T12:19:01.921374',
      metadata_modified: '2021-04-13T12:29:29.067536',
      mimetype: null,
      mimetype_inner: null,
      name: 'sample.geojson',
      package_id: 'c322307a-b871-44fe-a602-32ee8437ff04',
      position: 5,
      resource_type: null,
      size: 255943,
      state: 'active',
      url: 'https://demo.ckan.org/dataset/c322307a-b871-44fe-a602-32ee8437ff04/resource/ecd4a62d-998b-46e4-8a64-cadac2125c64/download/countries.geojson',
      url_type: 'upload',
    },
    {
      cache_last_updated: null,
      cache_url: null,
      created: '2021-04-13T12:32:17.823512',
      datastore_active: false,
      description: 'Sample kml file for Earthquakes of magnitude 5 in 2012.\r\n\r\nResource taken from https://openlayers.org/  \r\nLicensed under the 2-Clause BSD (https://www.tldrlegal.com/l/freebsd)\r\n',
      format: 'KML',
      hash: '',
      id: '048333ab-9608-42dc-901b-a7dd9fca3dda',
      last_modified: '2021-04-13T12:32:17.769578',
      metadata_modified: '2021-04-13T12:40:09.731123',
      mimetype: null,
      mimetype_inner: null,
      name: 'sample.kml',
      package_id: 'c322307a-b871-44fe-a602-32ee8437ff04',
      position: 6,
      resource_type: null,
      size: 474000,
      state: 'active',
      url: 'https://demo.ckan.org/dataset/c322307a-b871-44fe-a602-32ee8437ff04/resource/048333ab-9608-42dc-901b-a7dd9fca3dda/download/2012_earthquakes_mag5.kml',
      url_type: 'upload',
    },
  ]; */

  const tags = [
    {
      display_name: 'csv',
      id: 'b5e651dd-8f42-445c-b9c4-2f09a3268427',
      name: 'csv',
      state: 'active',
      vocabulary_id: null,
    },
    {
      display_name: 'geojson',
      id: 'a91d1c52-bd37-40fc-a1f2-6610ac7f39f3',
      name: 'geojson',
      state: 'active',
      vocabulary_id: null,
    },
    {
      display_name: 'kml',
      id: 'f29e8c38-be23-430b-bae0-7898f59d0089',
      name: 'kml',
      state: 'active',
      vocabulary_id: null,
    },
    {
      display_name: 'pdf',
      id: 'a4ba9601-bfa5-4322-8a62-38a83f2348c1',
      name: 'pdf',
      state: 'active',
      vocabulary_id: null,
    },
    {
      display_name: 'sample',
      id: '1e6aa0c9-0dfc-448a-8c13-b5fd8ab2fefd',
      name: 'sample',
      state: 'active',
      vocabulary_id: null,
    },
    {
      display_name: 'txt',
      id: '19e5f926-d769-49cf-a82c-80870baa3528',
      name: 'txt',
      state: 'active',
      vocabulary_id: null,
    },
  ];
  /* if (Array.isArray(obj.getKeywords) && obj.getKeywords.length > 0 && obj.getKeywords[0] !== '') {
    rdf['@graph'][0]['dcat:keyword'] = obj.getKeywords;
  } */

  const results = [
    {
      author: 'Test Author',
      author_email: 'test@email.com',
      creator_user_id: 'c14334c1-fb41-4afb-8769-b0e97cddfdab',
      groups,
      id: 'a74de57d-5d2a-4899-a498-44035c01fab6',
      isopen: false,
      license_id: '',
      license_title: '',
      maintainer: 'Test Maintainer',
      maintainer_email: 'test@email.com',
      metadata_created: '2021-05-24T11:51:33.207559',
      metadata_modified: '2021-11-30T07:51:27.027783',
      name: 'test_dataset',
      notes: obj.getDescription,
      num_resources: resources.length,
      num_tags: tags.length,
      organization,
      owner_org: '1fa89238-ee96-4439-a885-22d15244d070',
      private: false,
      relationships_as_object: relationshipsAsObject,
      relationships_as_subject: relationshipsAsSubject,
      resources,
      state: 'active',
      tags,
      title: obj.getTitle,
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

  /*
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
  }
  */

  return json;
}

// Export all functions as default export.
export {
  getAsCKAN,
  getAsJSONLD,
};
