<template>
  <dataset-details>
    <template slot="metadata-slot" slot-scope="dsd">
      <!-- Add a template inside this element to customize ~/src/components/DatasetDetails.vue content -->
      <!-- See https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots to learn how to use slots -->
    </template>
  </dataset-details>
</template>

<script>
  import DatasetDetails from '../DatasetDetails';

  export default {
    // Don't change the values for 'name' or 'components'
    name: 'CustomDatasetDetails',
    components: {
      datasetDetails: DatasetDetails,
    },
    data() {
      return {};
    },
    computed: {},
    methods: {},
    filters: {},
    watch: {},
    created() {},
    mounted() {},
  };
</script>

<style lang="scss" scoped>

</style>
