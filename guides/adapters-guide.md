# How to implement adapters for apertos-frontend

Adapters for the apertos-frontend application are defined as exported JavaScript ECMAScript 2015 classes that receive the APIs base Url as a constructor parameter.
These adapters have specific methods which return a promise carrying data according to the specified data format.

## Datasets

Will be used to fetch a specific dataset or a list of dataset.

Template file: [here](https://github.com/opendata-guru/peacock-user-ui/blob/master/guides/adapters/datasets-adapter-template.js)

Example adapter for CKAN-Backend: [here](https://github.com/opendata-guru/peacock-user-ui/blob/master/guides/adapters/datasets-adapter-ckan.js)

#### Required Methods

**_get()_**, resolve-data: Array of [Datasets](https://github.com/opendata-guru/peacock-user-ui/blob/master/guides/adapters/dataset-sample.json)

**_getSingle(id)_**, resolve-data: A [Dataset](https://github.com/opendata-guru/peacock-user-ui/blob/master/guides/adapters/dataset-sample.json)


## Distributions

Will be used to fetch a specific Distribution of a dataset.

Template file: [here](https://github.com/opendata-guru/peacock-user-ui/blob/master/guides/adapters/distributions-adapter-template.js)

Example adapter for CKAN-Backend: [here](https://github.com/opendata-guru/peacock-user-ui/blob/master/guides/adapters/distributions-adapter-ckan.js)

#### Required Methods

**_getSingle(id)_**, resolved-data: A [Distribution](https://github.com/opendata-guru/peacock-user-ui/blob/master/guides/adapters/distribution-sample.json)