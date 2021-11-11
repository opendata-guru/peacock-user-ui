/**
 * @license Copyright 2019 Fraunhofer FOKUS
 *          Modifications copyright 2021 Thomas Tursics
 *          SPDX-License-Identifier: Apache-2.0
 */

import { has, isNil, isArray, isString, isObject } from 'lodash';

const getters = {
    getAccessUrl: (parent) => {
        // Default url
        let accessUrl = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'access_url') && !isNil(parent.access_url)) accessUrl = parent.access_url;
        return accessUrl;
    },
    getDescription: (parent) => {
        // Default Object
        let description = {};
        if (!has(parent, 'description') || isNil(parent.description) || !isObject(parent.description)) {
            description.en = 'No description given';
            return description;
        }
        // Check if present keys not Nil. Replace default value with real value if check passed.
        for (let key in parent.description) {
            if (!isNil(parent.description[key])) description[key] = parent.description[key];
        }
        return description;
    },
    getDocumentations: (parent) => {
        // Default Array
        let documentations = [];
        // Return default array if key not present in parent
        if (!has(parent, 'documentations') || isNil(parent.documentations) || !isArray(parent.documentations)) return documentations;
        for (let d of parent.documentations) {
            // Check if value not Nil. Replace default value with real value if check passed.
            if (!isNil(d)) documentations.push(documentation);
        }
        return documentations;
    },
    getDownloadUrls: (parent) => {
        // Default Array
        let downloadUrls = [];
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (!has(parent, 'download_urls') || isNil(parent.download_urls) || !isArray(parent.download_urls)) return downloadUrls;
        for (let d of parent.download_urls) {
          if (!isNil(d)) downloadUrls.push(d);
        }
        return downloadUrls;
    },
    getFormat: (parent) => {
        // Default Object
        let format = {
            id: undefined,
            title: 'UNKNOWN',
        };
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'format.id') && !isNil(parent.format.id)) format.id = parent.format.id;
        if (has(parent, 'format.label') && !isNil(parent.format.label)) format.title = parent.format.label;
        return format;
    },
    getId: (parent) => {
        // Default id
        let id = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'id') && !isNil(parent.id)) id = parent.id;
        return id;
    },
    getLanguages: (parent) => {
        // Default Array
        let languages = [];
        // Return default array if key not present in parent
        if (!has(parent, 'languages') || isNil(parent.languages) || !isArray(parent.languages)) return languages;
        for (let l of parent.languages) {
            // Check if value not Nil and is String. Replace default value with real value if check passed.
            if (!isNil(l) && isString(l)) languages.push(language);
        }
        return languages;
    },
    getLicence: (parent) => {
        // Default Object
        let licence = {
            id: undefined,
            title: undefined,
            resource: undefined,
            description: undefined,
            la_url: undefined,
        };
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'license.id') && !isNil(parent.license.id)) licence.id = parent.license.id;
        if (has(parent, 'license.label') && !isNil(parent.license.label)) licence.title = parent.license.label;
        if (has(parent, 'license.resource') && !isNil(parent.license.resource)) licence.resource = parent.license.resource;
        if (has(parent, 'license.description') && !isNil(parent.license.description)) licence.description = parent.license.description;
        if (has(parent, 'license.la_url') && !isNil(parent.license.la_url)) licence.la_url = parent.license.la_url;
        return licence;
    },
    getModificationDate: (parent) => {
        // Default date
        let modificationDate = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'modification_date') && !isNil(parent.modification_date)) modificationDate = parent.modification_date;
        return modificationDate;
    },
    getReleaseDate: (parent) => {
        // Default date
        let releaseDate = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'release_date') && !isNil(parent.release_date)) releaseDate = parent.release_date;
        return releaseDate;
    },
    getTitle: (parent) => {
        let title = {};
        // Check if necessary keys present and not Nil. Return default object if key not present in parent
        if (!has(parent, 'title') || isNil(parent.title) || !isObject(parent.title)) {
          title.en = getters.getAccessUrl();
          return title;
        }
        // Check if present keys not Nil. Replace default value with real value if check passed.
        for (let key in parent.title) {
            if (!isNil(parent.title[key])) title[key] = parent.title[key];
        }
        return title;
    },
};
export default getters;
