<template>
  <!-- HEADER -->
  <div>
    <div class="row">
      <div class="col-10 offset-1">
        <h3>{{ getTranslationFor(getTitle, $i18n.locale, getLanguages) }}</h3>
      </div>
    </div>
    <div class="row mt-1">
      <div class="col-6 offset-1">
        <img class="mr-1 border border-dark" width="30" alt="Catalog Flag" v-if="showCountryFlag(getCountry)" :src="getCountryFlagImg(getCountry.id)">
        <span>{{ getTranslationFor(getCatalog.title, $i18n.locale, getLanguages) }}</span>
      </div>
      <div class="col-4 px-1 text-right text-break">
        <span class="font-weight-bold">{{ $t('message.metadata.updated') }}:</span>
          <dataset-date :date="getModificationDate"/>
      </div>
    </div>
    <hr>
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
  name: 'datasetDetailsDataset',
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
