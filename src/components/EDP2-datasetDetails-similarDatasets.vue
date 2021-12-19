<template>
  <div>
    <div class="mt-3">
      <div class="row">
        <div class="col-10 offset-1">
          <h3>{{ $t('message.datasetDetails.subnav.similarDatasets') }}</h3>
          <div class="text-center" v-if="!similarDatasetsFetched">
            <div class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <p v-if="!similarDatasetsPresent && similarDatasetsFetched">{{ $t('message.similarDatasets.notFound') }}</p>
          <div class="mt-4" v-if="similarDatasetsPresent && similarDatasetsFetched">
            <div class="mt-3 border-bottom border-secondary" v-if="has(similarDataset, 'title') && has(similarDataset, 'description')" v-for="(similarDataset, i) in similarDatasets" :key="i">
              <app-link class="text-dark font-weight-bold" :to="similarDataset.uri">
                <h6>{{ getTranslationFor(similarDataset.title, $i18n.locale, getLanguages) }}</h6>
              </app-link>
              <p class="text-muted text-truncate">
                <small>{{ getTranslationFor(similarDataset.description, $i18n.locale, getLanguages) }}</small>
              </p>
              <div class="mb-3">
                <span class="p-1 ml-1 badge badge-success text-center text-white" v-if="similarDataset.distance <= 20">Very Similar</span>
                <span class="p-1 ml-1 badge badge-info text-center text-white" v-else-if="similarDataset.distance > 20 && similarDataset.distance <= 30">Similar</span>
                <span class="p-1 ml-1 badge badge-warning text-center text-white" v-else-if="similarDataset.distance > 30 && similarDataset.distance <= 40">Less Similar</span>
                <span class="p-1 ml-1 badge badge-secondary text-center text-white" v-else>Marginal Similar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { has } from 'lodash';
import { getTranslationFor } from '../utils/helpers';
import AppLink from './AppLink';

export default {
  name: 'datasetDetailsSimilarDatasets',
  dependencies: 'DatasetService',
  components: {
    appLink: AppLink,
  },
  data() {
    return {
      similarDatasetsFetched: false,
      similarDatasetsPresent: false,
    };
  },
  computed: {
    // import store-getters
    ...mapGetters('datasetDetails', [
      'getLanguages',
      'getSimilarDatasets',
      'getLoading',
    ]),
    similarDatasets() {
      return this.getSimilarDatasets;
    },
  },
  methods: {
    // import store-actions
    ...mapActions('datasetDetails', [
      'loadSimilarDatasets',
      'loadSimilarDatasetDetails',
      'useService',
    ]),
    has,
    getTranslationFor,
    /**
     * Update all similar datasets by adding title and description
     */
    updateSimilarDatasets() {
      this.similarDatasets.forEach(this.getDatasetDetails);
    },
    /**
     * Get dataset details by id
     */
    getDatasetDetails(similarDataset) {
      this.loadSimilarDatasetDetails(similarDataset.id);
    },
  },
  created() {
    this.useService(this.DatasetService);
    this.$nextTick(() => {
      this.$Progress.start();
      this.loadSimilarDatasets(this.$route.params.ds_id)
        .then((response) => {
          this.$nextTick(() => {
            this.updateSimilarDatasets();
            this.similarDatasetsFetched = true;
            this.similarDatasetsPresent = response.length > 0;
          });
          this.$Progress.finish();
        })
        .catch(() => {
          this.$Progress.fail();
        });
    });
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';
</style>
