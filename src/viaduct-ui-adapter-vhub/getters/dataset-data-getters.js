/**
 * @license Copyright 2019 Fraunhofer FOKUS
 *          Modifications copyright 2021 Thomas Tursics
 *          SPDX-License-Identifier: Apache-2.0
 */

import { has, isNil, isArray, isString, isObject } from 'lodash';

const getters = {
    getCatalog: (parent) => {
        // Default Object
        let catalog = {
            id: undefined,
            title: undefined,
            description: undefined,
        };
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'catalog.id') && !isNil(parent.catalog.id)) catalog.id = parent.catalog.id;
        if (has(parent, 'catalog.title') && !isNil(parent.catalog.title)) catalog.title = parent.catalog.title;
        if (has(parent, 'catalog.description') && !isNil(parent.catalog.description)) catalog.description = parent.catalog.description;
        return catalog;
    },
    getCategories: (parent) => {
        // Default Array
        let categories = [];
        // Return default array if key not present in parent
        if (!has(parent, 'categories')) return categories;
        if (!isArray(parent.categories)) return categories;
        for (let c of parent.categories) {
            let category = {
                id: undefined,
                title: undefined,
                resource: undefined,
            };
            // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
            if (has(c, 'id') && !isNil(c.id)) category.id = c.id;
            if (has(c, 'title') && !isNil(c.title)) category.title = c.title;
            if (has(c, 'resource') && !isNil(c.resource)) category.resource = c.resource;
            // If all values inside the object are undefined or null, do not add the object to the displayed array and continue
            if (isNil(c.id) && isNil(c.title) && isNil(c.resource)) {
                continue;
            }
            categories.push(category);
        }
        return categories;
    },
    getConformsTo: (parent) => {
        // Default Array
        let conformsTos = [];
        // Return default array if key not present in parent
        if (!has(parent, 'conforms_to')) return [];
        if (!isArray(parent.conforms_to)) return [];
        for (let c of parent.conforms_to) {
            let conformsTo = {
                title: undefined,
                resource: undefined,
            };
            // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
            if (has(c, 'title') && !isNil(c.title)) conformsTo.title = c.title;
            if (has(c, 'resource') && !isNil(c.resource)) conformsTo.resource = c.resource;
            if (isNil(c.title) && isNil(c.resource)) {
                continue;
            }
            conformsTos.push(conformsTo);
        }
        return conformsTos;
    },
    getContactPoints: (parent) => {
        // Default Array
        let contactPoints = [];
        // Return default array if key not present in parent
        if (!has(parent, 'contact_point')) return [];
        if (!isArray(parent.contact_point)) return [];
        for (let c of parent.contact_point) {
            let contactPoint = {
                type: undefined,
                name: undefined,
                email: undefined,
                resource: undefined,
            };
            // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
            if (has(c, 'type') && !isNil(c.type)) contactPoint.type = c.type;
            if (has(c, 'name') && !isNil(c.name)) contactPoint.name = c.name;
            if (has(c, 'email') && !isNil(c.email)) contactPoint.email = c.email;
            if (has(c, 'resource') && !isNil(c.resource)) contactPoint.resource = c.resource
            // If all values inside the object are undefined or null, do not add the object to the displayed array and continue
            if (isNil(c.type) && isNil(c.name) && isNil(c.email) && isNil(c.resource)) {
                continue;
            }
            contactPoints.push(contactPoint);
        }
        return contactPoints;
    },
    getCountry: (parent) => {
        // Default Object
        let country = {
            id: 'eu',
            title: 'European Union',
        };
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'country.id') && !isNil(parent.country.id)) country.id = parent.country.id;
        if (has(parent, 'country.title') && !isNil(parent.country.title)) country.title = parent.country.title;
        return country;
    },
    getDescription: (parent) => {
        // Default Object
        let description = {};
        if (!has(parent, 'description') || isNil(parent.description) || !isObject(parent.description)) {
            description.en = 'No description available';
            return description;
        }
        // Check if present keys not Nil. Replace default value with real value if check passed.
        for (let key in parent.description) {
            if (!isNil(parent.description[key])) description[key] = parent.description[key];
        }
        return description;
    },
    getDistributions: (parent) => {
      // Default Array
      let distributions = [];
      if (!has(parent, 'distributions')) return distributions;
      if (!isArray(parent.distributions)) return distributions;
      for (let d of parent.distributions) {
        let distribution = undefined;
        // Check if value not Nil. Replace default value with real value if check passed.
        if (!isNil(d) && isObject(d)) distribution = d;
        // Continue without pushing when falsy data inside the given array.
        else continue;
        distributions.push(distribution);
      }
      return distributions;
    },
    getDocumentations: (parent) => {
        // Default Array
        let documentations = [];
        // Return default array if key not present in parent
        if (!has(parent, 'documentations')) return documentations;
        if (!isArray(parent.documentations)) return documentations;
        for (let d of parent.documentations) {
            let documentation = undefined;
            // Check if value not Nil. Replace default value with real value if check passed.
            if (!isNil(d)) documentation = d;
            // Continue without pushing when falsy data inside the given array.
            else continue;
            documentations.push(documentation);
        }
        return documentations;
    },
    getFrequency: (parent) => {
        // Default Object
        let frequency = {
            title: undefined,
            resource: undefined,
        };
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'frequency.title') && !isNil(parent.frequency.title)) frequency.title = parent.frequency.title;
        if (has(parent, 'frequency.resource') && !isNil(parent.frequency.resource)) frequency.resource = parent.frequency.resource;
        return frequency;
    },
    getId: (parent) => {
        // Default id
        let id = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'id') && !isNil(parent.id)) id = parent.id;
        return id;
    },
    getIdentifiers: (parent) => {
        // Default Array
        let identifiers = [];
        // Return default array if key not present in parent
        if (!has(parent, 'identifier')) return [];
        if (!isArray(parent.identifier)) return [];
        for (let i of parent.identifier) {
            let identifier = undefined;
            // Check if value not Nil. Replace default value with real value if check passed.
            if (!isNil(i) && isString(i)) identifier = i;
            // Continue without pushing when falsy data inside the given array.
            else continue;
            identifiers.push(identifier);
        }
        return identifiers;
    },
    getIdName: (parent) => {
        // Default id
        let idName = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'idName') && !isNil(parent.idName)) idName = parent.idName;
        return idName;
    },
    getKeywords: (parent) => {
        // Default Array
        let keywords = [];
        // Return default array if key not present in parent
        if (!has(parent, 'keywords')) return keywords;
        if (!isArray(parent.keywords)) return keywords;
        for (let k of parent.keywords) {
            let keyword = {
                id: undefined,
                title: undefined,
            };
            // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
            if (has(k, 'id') && !isNil(k.id)) keyword.id = k.id;
            if (has(k, 'label') && !isNil(k.label)) keyword.title = k.label;
            // If all values inside the object are undefined or null, do not add the object to the displayed array and continue
            if (isNil(k.id) && isNil(k.label)) {
                continue;
            }
    	    keywords.push(keyword);
        }
        return keywords;
    },
    getLanguages: (parent) => {
        // Default Array
        let languages = [];
        // Return default array if key not present in parent
        if (!has(parent, 'languages')) return languages;
        if (!isArray(parent.languages)) return languages;
        for (let l of parent.languages) {
            let language = undefined;
            // Check if value not Nil and is String. Replace default value with real value if check passed.
            if (!isNil(l) && isString(l)) language = l;
            // Continue without pushing when falsy data inside the given array.
            else continue;
            languages.push(language);
        }
        return languages;
    },
    getLandingPages: (parent) => {
        // Default Array
        let landingPages = [];
        // Return default array if key not present in parent
        if (!has(parent, 'landing_page')) return landingPages;
        if (!isArray(parent.landing_page)) return landingPages;
        for (let l of parent.landing_page) {
            let landingPage = '-';
            // Check if value not Nil. Replace default value with real value if check passed.
            if (!isNil(l) && isString(l)) landingPage = l;
            // Continue without pushing when falsy data inside the given array.
            else continue;
            landingPages.push(landingPage);
        }
        return landingPages;
    },
    getModificationDate: (parent) => {
        // Default date
        let modificationDate = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'modified') && !isNil(parent.modified)) modificationDate = parent.modified;
        return modificationDate;
    },
    getOriginalLanguage: (parent) => {
        // Default Object
        let originalLanguage = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'translation_meta') && has(parent, 'translation_meta.details') && !isNil(parent.translation_meta.details) && isObject(parent.translation_meta.details)) {
            for(let key in parent.translation_meta.details) {
                if(has(parent.translation_meta.details[key], 'original_language')) originalLanguage = parent.translation_meta.details[key].original_language;
            }
        }
        return originalLanguage;
    },
    getOtherIdentifiers: (parent) => {
        // Default Array
        let otherIdentifiers = [];
        // Return default array if key not present in parent
        if (!has(parent, 'other_identifiers')) return otherIdentifiers;
        if (!isArray(parent.other_identifiers)) return otherIdentifiers;
        for (let i of parent.other_identifiers) {
            let otherIdentifier = undefined;
            // Check if value not Nil. Replace default value with real value if check passed.
            if (!isNil(i) && isString(i)) otherIdentifier = i;
            // Continue without pushing when falsy data inside the given array.
            else continue;
            otherIdentifiers.push(otherIdentifier);
        }
        return otherIdentifiers;
    },
    getProvenances: (parent) => {
        // Default Array
        let provenances = [];
        // Return default array if key not present in parent
        if (!has(parent, 'provenances')) return provenances;
        if (!isArray(parent.provenances)) return provenances;
        for (let p of parent.provenances) {
            let provenance = {
                label: undefined,
                resource: undefined,
            };
            // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
            if (has(p, 'label') && !isNil(p.label)) provenance.label = p.label;
            if (has(p, 'resource') && !isNil(p.resource)) provenance.resource = p.resource;
            // If all values inside the object are undefined or null, do not add the object to the displayed array and continue
            if (isNil(p.label) && isNil(p.resource)) {
                continue;
            }
    	    provenances.push(provenance);
        }
        return provenances;
    },
    getPublisher: (parent) => {
        // Default Object
        let publisher = {
            type: undefined,
            name: undefined,
            email: undefined,
            resource: undefined,
        };
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'publisher.type') && !isNil(parent.publisher.type)) publisher.type = parent.publisher.type;
        if (has(parent, 'publisher.name') && !isNil(parent.publisher.name)) publisher.name = parent.publisher.name;
        if (has(parent, 'publisher.email') && !isNil(parent.publisher.email)) publisher.email = parent.publisher.email;
        if (has(parent, 'publisher.resource') && !isNil(parent.publisher.resource)) publisher.resource = parent.publisher.resource;
        return publisher;
    },
    getRelatedResources: (parent) => {
        // Default Array
        let relatedResources = [];
        // Return default array if key not present in parent
        if (!has(parent, 'related_resources')) return relatedResources;
        if (!isArray(parent.related_resources)) return relatedResources;
        for (let r of parent.related_resources) {
            let relatedResource = undefined;
            // Check if value not Nil and is String. Replace default value with real value if check passed.
            if (!isNil(r) && isString(r)) relatedResource = r;
            // Continue without pushing when falsy data inside the given array.
            else continue;
            relatedResource.push(relatedResource);
        }
        return relatedResources;
    },
    getReleaseDate: (parent) => {
        // Default date
        let releaseDate = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'issued') && !isNil(parent.issued)) releaseDate = parent.issued;
        return releaseDate;
    },
    getSources: (parent) => {
        // Default Array
        let sources = [];
        // Return default array if key not present in parent
        if (!has(parent, 'sources')) return sources;
        if (!isArray(parent.sources)) return sources;
        for (let s of parent.sources) {
            let source = undefined;
            // Check if value not Nil and is String. Replace default value with real value if check passed.
            if (!isNil(s) && isString(s)) source = s;
            // Continue without pushing when falsy data inside the given array.
            else continue;
            sources.push(source);
        }
        return sources;
    },
    getSpatial: (parent) => {
        // Default Object
        let spatial = {
            coordinates: undefined,
            type: undefined,
        };
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'spatial.coordinates') && !isNil(parent.spatial.coordinates)) spatial.coordinates = parent.spatial.coordinates;
        if (has(parent, 'spatial.type') && !isNil(parent.spatial.type)) spatial.type = parent.spatial.type;
        return spatial;
    },
    getTranslationMetaData: (parent) => {
        // Default Object
        let translationMetaData = {
            fullAvailableLanguages: [],
            details: {},
            status: undefined,
        };
        // Check if necessary keys present and not Nil. Return default object if key not present in parent
        if (!has(parent, 'translation_meta')) return translationMetaData;
        if(isNil(parent.translation_meta) || !isObject(parent.translation_meta)) return translationMetaData;
        // Check if nested keys present and not Nil.
        if (has(parent, 'translation_meta.full_available_languages') && !isNil(parent.translation_meta.full_available_languages)) {
            for (let l of parent.translation_meta.full_available_languages) {
                if (!isNil(parent.translation_meta.full_available_languages[l])) translationMetaData.fullAvailableLanguages.push(l);
            }

        }
        if (has(parent, 'translation_meta.details') && !isNil(parent.translation_meta.details)) {
            for (let key in parent.translation_meta.details) {
                if (!isNil(parent.translation_meta.details[key])) translationMetaData.details[key] = parent.translation_meta.details[key];
            }
        }
        if (has(parent, 'translation_meta.status') && !isNil(parent.translation_meta.status)) translationMetaData.status = parent.translation_meta.status;
        return translationMetaData;
    },
    getTitle: (parent) => {
        // Default Object
        let title = {};
        // Check if necessary keys present and not Nil. Return default object if key not present in parent
        if (!has(parent, 'title')) return title;
        if(isNil(parent.title) || !isObject(parent.title)) return title;
        // Check if present keys not Nil. Replace default value with real value if check passed.
        for (let key in parent.title) {
            if (!isNil(parent.title[key])) title[key] = parent.title[key];
        }
        return title;
    },
    getAccessRight: undefined,
    getHasVersions: undefined,
    getIsVersionOf: undefined,
    getTemporalCoverages: undefined,
    getVersion: undefined,
    getVersionNotes: undefined,
};
export default getters;
