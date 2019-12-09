<template>
  <!-- NAVIGATION -->
  <nav :key="getActiveNavigationTab">
    <ul class="menu m-0 list-inline list-unstyled">
      <li class="my-2 mr-5 list-inline-item"
          @click="setActiveNavigationTab(0)">
        <app-link class="text-dark" :to="{ path: `/datasets/${getID}/`, query: Object.assign({}, { locale: $route.query.locale }) }">
          {{ $t('message.datasetDetails.subnav.dataset') }}
        </app-link>
      </li>
      <li class="my-2 mr-5 list-inline-item"
          @click="setActiveNavigationTab(1)">
        <app-link class="text-dark" :to="{ path: `/datasets/${getID}/categories`, query: Object.assign({}, { locale: $route.query.locale }) }">
          {{ $t('message.datasetDetails.subnav.categories') }}
        </app-link>
      </li>
      <li class="my-2 mr-5 list-inline-item"
          @click="setActiveNavigationTab(2)">
        <app-link class="text-dark" :to="{ path: `/datasets/${getID}/similarDatasets`, query: Object.assign({}, { locale: $route.query.locale }) }">
          {{ $t('message.datasetDetails.subnav.similarDatasets') }}
        </app-link>
      </li>
      <!--<li class="my-2 mr-5 list-inline-item"-->
          <!--:class="{'font-weight-bold active': (getActiveNavigationTab === 3)}"-->
          <!--@click="setActiveNavigationTab(3)">-->
        <!--<app-link class="text-dark" :to="{ path: `datasets/${getID}/activityStream`, query: Object.assign({}, $route.query) }">-->
          <!--{{ $t('message.datasetDetails.subnav.activityStream') }}-->
        <!--</app-link>-->
      <!--</li>-->
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppLink from './AppLink';

export default {
  name: 'datasetDetailsNavigation',
  components: {
    appLink: AppLink,
  },
  data() {
    return {
      navbarCollapsed: false,
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
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';
</style>
