import { has, isNil, isArray, isString, isObject } from 'lodash';

const getters = {
    getCount: (parent) => {
        // Default Object
        let count = 0;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'count') && !isNil(parent.count)) count = parent.count;
        return count;
    },
    getCountry: (parent) => {
        // Default Object
        let country = {
            id: undefined,
            title: 'No country title given',
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
            return description;
        }
        // Check if present keys not Nil. Replace default value with real value if check passed.
        for (let key in parent.description) {
            if (!isNil(parent.description[key])) description[key] = parent.description[key];
        }
        return description;
    },
    getHomepage: (parent) => {
        // Default homepage
        let homepage = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'homepage') && !isNil(parent.homepage)) homepage = parent.homepage;
        return homepage;
    },
    getId: (parent) => {
        // Default id
        let id = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'id') && !isNil(parent.id)) id = parent.id;
        return id;
    },
    getIdName: (parent) => {
        // Default id
        let idName = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'idName') && !isNil(parent.idName)) idName = parent.idName;
        return idName;
    },
    getLanguages: (parent) => {
        // Default Array
        let languages = [];
        // Default string
        const defaultLanguage = undefined;
        // Return default array if key not present in parent
        if (!has(parent, 'languages')) return languages;
        if (!isArray(parent.languages)) return languages;
        for (let l of parent.languages) {
            let language = defaultLanguage;
            // Check if value not Nil and is String. Replace default value with real value if check passed.
            if (!isNil(l) && isString(l)) language = l;
            // Continue without pushing when falsy data inside the given array.
            else continue;
            languages.push(language);
        }
        return languages;
    },
    getModificationDate: (parent) => {
        // Default date
        let modificationDate = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'modified') && !isNil(parent.modified)) modificationDate = parent.modified;
        return modificationDate;
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
    getReleaseDate: (parent) => {
        // Default date
        let releaseDate = undefined;
        // Check if necessary keys present and not Nil. Replace default value with real value if check passed.
        if (has(parent, 'issued') && !isNil(parent.issued)) releaseDate = parent.issued;
        return releaseDate;
    },
    getTitle: (parent) => {
        // Default Object
        let defaultTitle = {};
        let title = {};
        // Check if necessary keys present and not Nil. Return default object if key not present in parent
        if (!has(parent, 'title')) return defaultTitle;
        if(isNil(parent.title) || !isObject(parent.title)) return defaultTitle;
        // Check if present keys not Nil. Replace default value with real value if check passed.
        for (let key in parent.title) {
            if (!isNil(parent.title[key])) title[key] = parent.title[key];
        }
        return title;
    },
};
export default getters;
