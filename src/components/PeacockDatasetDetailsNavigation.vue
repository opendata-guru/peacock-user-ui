<template>
  <!-- NAVIGATION -->
  <nav :key="getActiveNavigationTab"
    v-if="[showDataset,showCategories,showSimilarDatasets,showActivityStream].filter(Boolean).length > 1">
    <ul class="nav nav-tabs">
      <li class="nav-item"
          v-if="showDataset"
          @click="setActiveNavigationTab(0)">
        <app-link
          :class="{'nav-link': true, active: isPath('/'), 'link-dark': !isPath('/')}"
          :to="{ path: `/datasets/${getID}/`, query: Object.assign({}, { locale: $route.query.locale }) }"
        >
          {{ $t('message.datasetDetails.subnav.dataset') }}
        </app-link>
      </li>
      <li class="nav-item"
          v-if="showCategories"
          @click="setActiveNavigationTab(1)">
        <app-link
          :class="{'nav-link': true, active: isPath('/categories'), 'link-dark': !isPath('/categories')}"
          :to="{ path: `/datasets/${getID}/categories`, query: Object.assign({}, { locale: $route.query.locale }) }"
        >
          {{ $t('message.datasetDetails.subnav.categories') }}
        </app-link>
      </li>
      <li class="nav-item"
          v-if="showSimilarDatasets"
          @click="setActiveNavigationTab(2)">
        <app-link
          :class="{'nav-link': true, active: isPath('/similarDatasets'), 'link-dark': !isPath('/similarDatasets')}"
          :to="{ path: `/datasets/${getID}/similarDatasets`, query: Object.assign({}, { locale: $route.query.locale }) }"
        >
          {{ $t('message.datasetDetails.subnav.similarDatasets') }}
        </app-link>
      </li>
      <li class="nav-item"
          v-if="showActivityStream"
          @click="setActiveNavigationTab(3)">
        <app-link
          :class="{'nav-link': true, active: isPath('/activityStream'), 'link-dark': !isPath('/activityStream')}"
          :to="{ path: `/datasets/${getID}/activityStream`, query: Object.assign({}, $route.query) }"
        >
          {{ $t('message.datasetDetails.subnav.activityStream') }}
        </app-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppLink from './AppLink';
import GLUE_CONFIG from '../../user-config/glue-config';

export default {
  name: 'peacockDatasetDetailsNavigation',
  components: {
    appLink: AppLink,
  },
  data() {
    return {
      navbarCollapsed: false,
      showDataset: true,
      showCategories: GLUE_CONFIG.enable.dataset.categories,
      showSimilarDatasets: GLUE_CONFIG.enable.dataset.similarDatasets,
      showActivityStream: GLUE_CONFIG.enable.dataset.activityStream,
    };
  },
  computed: {
    // import store-getters
    ...mapGetters('datasetDetails', [
      'getActiveNavigationTab',
      'getID',
    ]),
  },
  methods: {
    // import store-actions
    ...mapActions('datasetDetails', [
      'setActiveNavigationTab',
    ]),
    isPath(relPath) {
      const pattern = `/datasets/${this.getID}${relPath}`;
      const pos = this.$router.currentRoute.path.indexOf(pattern);
      console.log(relPath, ' ', (pos >= 0) && ((pos + pattern.length) === this.$router.currentRoute.path.length));
      return (pos >= 0) && ((pos + pattern.length) === this.$router.currentRoute.path.length);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';
</style>
