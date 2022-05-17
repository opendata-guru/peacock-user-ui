<template>
  <div class="dataset-details-header" :type="getCatalog.id ? getCatalog.id : ''">
    <div class="row">
      <div class="col-12">
        <h3>{{ getTranslationFor(getTitle, $i18n.locale, getLanguages) }}</h3>
      </div>
    </div>
    <div class="row mt-1 pb-3 border-bottom">
      <div class="col-6">
        <img class="mr-1 border border-dark catalogue-flag" width="30" :alt="$t(`message.datasetDetails.catalogueFlag`)" v-if="showCountryFlag(getCountry)" :src="getCountryFlagImg(getCountry.id)">
        <span>{{ getTranslationFor(getCatalog.title, $i18n.locale, getLanguages) }}</span>
      </div>
      <div class="col-6 text-end text-break">
        <span class="font-weight-bold">{{ $t('message.metadata.updated') }}:</span>
        <dataset-date :date="getModificationDate"/>
      </div>
    </div>
  </div>
</template>

<script>
// import Actions and Getters from Store Module
import { mapGetters } from 'vuex';
// import helper functions
import { has, isNil } from 'lodash';

import DatasetDate from './DatasetDate';

// import filters
import dateFilters from '../filters/dateFilters';
import { getTranslationFor, getCountryFlagImg } from '../utils/helpers';

export default {
  name: 'peacockDatasetDetailsHeader',
  components: {
    DatasetDate,
  },
  dependencies: 'DatasetService',
  data() {
    return {};
  },
  computed: {
    // import store-getters
    ...mapGetters('datasetDetails', [
      'getCatalog',
      'getCountry',
      'getLanguages',
      'getModificationDate',
      'getTitle',
    ]),
  },
  methods: {
    has,
    isNil,
    getTranslationFor,
    getCountryFlagImg,
    filterDateFormatUS(date) {
      return dateFilters.formatUS(date);
    },
    filterDateFormatEU(date) {
      return dateFilters.formatEU(date);
    },
    filterDateFromNow(date) {
      return dateFilters.fromNow(date);
    },
    showCountryFlag(country) {
      return has(country, 'id') && !isNil(country.id);
    },
  },
};
</script>

<style scoped>

</style>
