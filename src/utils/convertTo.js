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
function getAsJSONJD() {
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
        'dcterms:description': this.getDescription,
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
        'dcterms:title': this.getTitle,
      },
    ],
  };

  if (Array.isArray(this.distributions) && this.distributions.length) {
    let resourceCount = 1;
    this.distributions.forEach((distribution) => {
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

    if (Array.isArray(this.getKeywords) && this.getKeywords.length > 0 && this.getKeywords[0] !== '') {
      rdf['@graph'][0]['dcat:keyword'] = this.getKeywords;
    }

    if (this.getContactInfo.type !== '' && this.getContactInfo.name !== '' && this.getContactInfo.email !== '') {
      const contactPoint = {
        '@type': `vcard:${this.getContactInfo.type}`,
        'vcard:fn': this.getContactInfo.name,
        'vcard:hasEmail': {
          '@id': `mailto:${this.getContactInfo.email}`,
        },
      };
      rdf['@graph'][0]['dcat:contactPoint'] = contactPoint;
    }

    if (this.getPublisherInfo.name !== '' && this.getPublisherInfo.type !== '' && this.getPublisherInfo.homepage !== '') {
      const publisherInfo = {
        '@type': `http://xmlns.com/foaf/0.1/${this.getPublisherInfo.type}`,
        'foaf:homepage':
        {
          '@id': this.getPublisherInfo.homepage,
          '@type': '@id',
        },
        'foaf:name': this.getPublisherInfo.name,
      };
      rdf['@graph'][0]['dct:publisher'] = publisherInfo;
    }

    if (Array.isArray(this.getCategory) && this.getCategory.length) {
      rdf['@graph'][0]['dcat:theme'] = this.themeMapping(this.getCategory);
    }
  }

  return rdf;
}

/**
 * convert the dataset to Foo
 */
function getAsFoo() {
  return 'bar';
}

// Export all functions as default export.
export {
  getAsJSONJD,
  getAsFoo,
};
