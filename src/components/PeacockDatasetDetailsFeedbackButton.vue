<template>
  <app-link
    v-if="getFeedbackQuery(getID, getTitle)"
    :path="`/${this.$i18n.locale}/feedback/form`"
    :query="getFeedbackQuery(getID, getTitle)"
    @click="$emit('trackLink', `/${this.$i18n.locale}/feedback/form${getFeedbackQuery(getID, getTitle)}`, 'link')"
    target="_blank">
    <button class="mt-1 btn btn-sm btn-secondary feedback">
      {{ $t('message.datasetDetails.feedback') }}
    </button>
  </app-link>
</template>

<script>
// Import Actions and Getters from Store Module
import { mapGetters } from 'vuex';
// Import custom helpers
import { has } from 'lodash';
import { getTranslationFor } from '../utils/helpers';
// Import components used in template
import AppLink from './AppLink';
import GLUE_CONFIG from '../../user-config/glue-config';

export default {
  name: 'peacockDatasetDetailsFeedbackButton',
  components: {
    appLink: AppLink,
  },
  data() {
    return {
      rootURL: 'https://www.europeandataportal.eu/',
    };
  },
  computed: {
    // import store-getters
    ...mapGetters('datasetDetails', [
      'getID',
      'getLanguages',
      'getTitle',
    ]),
  },
  methods: {
    // Lodash has function
    has,
    getTranslationFor,
    // Creates the query string for the feedback URL of the dataset
    getFeedbackQuery(id, titles) {
      if (!GLUE_CONFIG.enable.dataset.feedback) {
        return false;
      }
      if (!id || !titles || (typeof titles !== 'object')) return false;
      // Get translated title
      let title = this.getTranslationFor(titles, this.$i18n.locale, this.getLanguages);
      if (!title) return false;
      title = title.replace(/ /g, '+');
      // Create query string
      const type = '3';
      const description = `${this.$t('message.datasetDetails.subnav.dataset')}+URL:+${this.rootURL}data/%23/datasets/${id}`;
      const summary = `${this.$t('message.datasetDetails.feedback')}+${this.$t('message.datasetDetails.about')}+${this.$t('message.datasetDetails.subnav.dataset')}:+${title}`;
      // Return query string
      return `?type=${type}&description=${description}&summary=${summary}`;
    },
  },
};
</script>

<style scoped>
</style>
