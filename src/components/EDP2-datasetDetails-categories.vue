<template>
  <div>
    <div class="mt-3">
      <div class="row">
        <div class="col-10 offset-1">
          <h3>{{ $t('message.datasetDetails.subnav.categories') }}</h3>
          <div class="categories mt-4">
            <div v-for="category in getCategories" class="p-2 mt-3 border border-secondary bg-light">
              <app-link :to="getCategoryLink(category)" v-if="showCategory(category)">
                {{ category.title }}
              </app-link>
            </div>
            <div v-if="getCategories && getCategories.length === 0">
              <p>{{ $t('message.datasetCategories.noCategories') }}</p>
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
import AppLink from './AppLink';

export default {
  name: 'datasetDetailsCategories',
  dependencies: 'DatasetService',
  components: {
    appLink: AppLink,
  },
  data() {
    return {};
  },
  computed: {
    // import store-getters
    ...mapGetters('datasetDetails', [
      'getCategories',
    ]),
  },
  methods: {
    has,
    // import store-actions
    ...mapActions('datasetDetails', [
      'loadDatasetDetails',
      'useService',
    ]),
    showCategory(category) {
      return has(category, 'id');
    },
    getCategoryLink(category) {
      const categoryID = category.id.toLowerCase();
      return { path: `/datasets?categories=${categoryID}`, query: Object.assign({}, { locale: this.$route.query.locale }) };
    },
  },
  created() {
    this.useService(this.DatasetService);
    this.$nextTick(() => {
      this.$Progress.start();
      this.loadDatasetDetails(this.$route.params.ds_id)
        .then(() => {
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
