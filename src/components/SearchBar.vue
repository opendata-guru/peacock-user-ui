<template>
  <div class="input-group input-group-sm mt-1 edp2-searchbar-sm">
    <input class="form-control form-control-sm border rounded-left input-search-site-content"
           type="text"
           :aria-label="'Searchbar to search site content'"
           :placeholder="$t('message.header.searchInputPlaceholder')"
           v-model="q"
           @keyup.enter="search()">
    <div class="input-group-append">
      <app-link ref="searchButton"
                :path="`/${this.$i18n.locale}/search/site/${q}`">
        <button class="btn btn-sm btn-outline border rounded-right"
                type="button">
          <i class="material-icons">search</i>
        </button>
      </app-link>
    </div>
  </div>
</template>

<script>
import AppLink from './AppLink';

export default {
  name: 'SearchBar',
  components: {
    appLink: AppLink,
  },
  data() {
    return {
      q: '',
    };
  },
  methods: {
    search() {
      // Trigger click on search button
      this.$refs.searchButton.click();
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';

  .edp2-searchbar-sm {
    .input-search-site-content {
      border-color: #0065a2 !important;
    }
    .input-group-append {
      button {
        border-color: #0065a2 !important;
        background-color: #FFFFFF;
      }
      i {
        font-size: 14px !important;
      }
    }
  }
</style>
