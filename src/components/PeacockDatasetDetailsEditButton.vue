<template>
  <app-link :to="{name: 'upload', params: { 
    id: getID,
    title: getTitle,
    description: getDescription,
    keywords: getKeywords,
    catalog: getCatalog.id,
    catagory: getCategories,
    contact_point: getContactPoints,
    publisher: getPublisher,
    distributions: getDistributions,
    } 
  }">
    <button class="mt-1 btn btn-sm btn-outline-secondary edit">
      {{ $t('message.datasetDetails.edit') }}
    </button>
  </app-link>
</template>

<script>
// Import components used in template
import { mapGetters } from 'vuex';
import AppLink from './AppLink';
/* eslint-disable */
export default {
  name: 'peacockDatasetDetailsEditButton',
  components: {
    appLink: AppLink,
  },
  data() {
    return {
      error: '',
      catalog: '',
    };
  },
  computed: {
    // import store-getters
    ...mapGetters('datasetDetails', [
      'getID',
      'getLanguages',
      'getTitle',
      'getCatalog',
      'getCategories',
      'getContactPoints',
      'getDescription',
      'getDistributions',
      'getDistributionFormats',
      'getLandingPages',
      'getLicences',
      'getPublisher',
      'getKeywords',
    ]),
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
