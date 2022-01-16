<template>
  <a @click="metadataLink" @mousedown.middle="metadataLink" href="#" class="mt-1 btn btn-sm btn-outline-secondary metadata">
    {{ $t('message.datasetDetails.metadata') }}
  </a>
</template>

<script>
// Import components used in template
import { mapGetters } from 'vuex';
import AppLink from './AppLink';
import { getAsCKAN } from '../utils/convertTo';

/* eslint-disable */
export default {
  name: 'peacockDatasetDetailsMetadataButton',
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
      'getCatalog',
      'getCategories',
      'getConformsTo',
      'getContactPoints',
      'getCountry',
      'getDescription',
      'getDistributions',
      'getDistributionFormats',
      'getDocumentations',
      'getFrequency',
      'getIdentifiers',
      'getID',
      'getIdName',
      'getLandingPages',
      'getLanguages',
      'getLicences',
      'getLoading',
      'getModificationDate',
      'getOriginalLanguage',
      'getOtherIdentifiers',
      'getProvenances',
      'getPublisher',
      'getRelatedResources',
      'getReleaseDate',
      'getKeywords',
      'getService',
      'getSimilarDatasets',
      'getSources',
      'getSpatial',
      'getTranslationMetaData',
      'getTitle',
    ]),
  },
  methods: {
    metadataLink() {
      /* eslint-disable no-underscore-dangle */
      if (this.matomoTrackPageView) {
        window._paq.push(['setCustomUrl', `${window.location.origin}${this.path}`]);
        window._paq.push(['trackPageView']);
        return;
      }

      if (this.matomoTrackDownload) {
        window._paq.push(['metadataLink', this.url, 'download']);
      } else {
        window._paq.push(['metadataLink', this.url, 'link']);
      }

      // So we can use something similar to a click event when using this component for additional
      // needs, like tracking custom events.
      // this.$emit('after-click');
      this.onClick();
    },
    onClick() {
      this.copyToClipboard(getAsCKAN(this));
    },
    copyToClipboard(obj) {
      const input = document.createElement('INPUT');
      input.value = JSON.stringify(obj /* , null, 2 */);
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    },
  },
};
</script>

<style scoped>
</style>
