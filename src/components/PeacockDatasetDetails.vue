<template>
  <div class="mb-5" :about="`/datasets/${getID}`" typeof="dcat:Dataset">
    <datasetDetailsTop></datasetDetailsTop>
    <router-view name="datasetDetailsSubpages"></router-view>
  </div>
</template>

<script>
// import Actions and Getters from Store Module
import { mapActions, mapGetters } from 'vuex';

// import nested components
import DatasetDetailsTop from './PeacockDatasetDetailsTop';
import DatasetDetailsDataset from './EDP2-datasetDetails-dataset';
import DatasetDetailsCategories from './EDP2-datasetDetails-categories';
import DatasetDetailsSimilarDatasets from './EDP2-datasetDetails-similarDatasets';
// import DatasetDetailsActivityStream from './EDP2-datasetDetails-activityStream';

export default {
  name: 'peacockDatasetDetails',
  components: {
    datasetDetailsTop: DatasetDetailsTop,
    datasetDetailsDataset: DatasetDetailsDataset,
    datasetDetailsCategories: DatasetDetailsCategories,
    datasetDetailsSimilarDatasets: DatasetDetailsSimilarDatasets,
    // datasetDetailsActivityStream: DatasetDetailsActivityStream,
  },
  data() {
    return {};
  },
  props: {
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters('datasetDetails', [
      'getActiveNavigationTab',
      'getID',
    ]),
  },
  methods: {
    ...mapActions('datasetDetails', [
      'setActiveNavigationTab',
    ]),
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';
</style>
