<!-- @license Copyright 2019 Fraunhofer FOKUS
              Modifications copyright 2021-2022 Thomas Tursics
              SPDX-License-Identifier: Apache-2.0
-->

<template>
  <div class="container-fluid catalogues">
    <div class="row">
      <catalogue-facets class="col-md-3 col-12 mb-3 mb-md-0 px-0"/>
      <section class="col-md col-12">
        <div class="filters-group">
          <div class="row">
            <div class="col">
              <div class="dropdown d-inline-block">
                <button class="btn btn-secondary dropdown-toggle"
                        type="button" id="dropdown-sort-by" data-bs-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                  {{ $t('message.sort.sortBy') + `: ${sortSelectedLabel}`  }}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdown-sort-by">
                  <button class="dropdown-item" @click="setSortMethod('relevance', 'desc', $t('message.sort.relevance'))">{{
                    $t('message.sort.relevance') }}</button>
                  <button class="dropdown-item" @click="setSortMethod(`title.${$i18n.locale}`, 'asc', $t('message.sort.nameAZ'))">
                    {{ $t('message.sort.nameAZ') }}</button>
                  <button class="dropdown-item" @click="setSortMethod(`title.${$i18n.locale}`, 'desc', $t('message.sort.nameZA'))">
                    {{ $t('message.sort.nameZA') }}</button>
                  <button class="dropdown-item" @click="setSortMethod('modification_date', 'desc', $t('message.sort.lastUpdated'))">
                    {{ $t('message.sort.lastUpdated') }}</button>
                  <button class="dropdown-item" @click="setSortMethod('release_date', 'desc', $t('message.sort.lastCreated'))">
                    {{ $t('message.sort.lastCreated') }}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <div class="input-group">
                <input type="text" class="form-control"
                       :aria-label="$t('message.catalogues.searchBar.placeholder')"
                       :placeholder="$t('message.catalogues.searchBar.placeholder')"
                       v-model="query"
                       @keyup.enter="changeQuery(query)"
                       @click="autocompleteData.show = autocompleteData.suggestions.length > 0 && query.length != 0 ? !autocompleteData.show : false">
                <div class="input-group-append">
                  <button class="btn btn-sm btn-secondary" type="button" @click="changeQuery(query)" :aria-label="$t('message.catalogues.searchBar.button')">
                    <font-awesome-icon class="fa fs-5 my-1" :icon="{ prefix: 'fas', iconName: 'search' }" aria-hidden="true"></font-awesome-icon>
                  </button>
                </div>
                <div class="suggestion-list-group" v-if="autocompleteData.show">
                  <ul class="list-group suggestion-list">
                    <button class="list-group-item list-group-item-action"
                            v-for="(suggestion) in autocompleteData.suggestions"
                            :key="suggestion.id"
                            @click="handleSuggestionSelection(suggestion)">
                      {{getTranslationFor(suggestion.title, $i18n.locale, [suggestion.country.id].concat(suggestion.languages))}}
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="alert alert-secondary mt-3 d-flex flex-row">
          <div>
            {{ getLoading ? $t('message.catalogues.loadingMessage'):`${getCataloguesCount}
            ${$t('message.catalogues.countMessage')}`}}
          </div>
          <div class="text-center ml-3" v-if="getLoading">
            <div class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <selectedFacetsOverview :selected-facets="getFacets"/>
        <data-info-box class="catalogue" v-for="catalogue in getCatalogues" :key="catalogue.idName" ref="catalogueBox"
                       :link-to="`datasets?catalog=${catalogue.idName}&showcataloguedetails=true`"
                       :title="getTranslationFor(catalogue.title, $i18n.locale, has(catalogue, 'country.id') ? [catalogue.country.id].concat(catalogue.languages) : catalogue.languages) || catalogue.id"
                       :description="getTranslationFor(catalogue.description, $i18n.locale, has(catalogue, 'country.id') ? [catalogue.country.id].concat(catalogue.languages) : catalogue.languages)"
                       :body-img="getCountryFlagImg(has(catalogue, 'country.id') ? catalogue.country.id : 'eu')"
                       :footer-tags="[`${has(catalogue, 'count') ? catalogue.count : 0}`]">
        </data-info-box>
        <div class="text-center mt-3 mb-3" v-if="getLoading">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    </div>
    <div class="row">
      <div class="column col-12 col-md-9 offset-md-3">
        <div class="d-flex flex-row justify-content-center">
          <!--<button class="button is-secondary scroll-top" @click="scrollTo(0)">Scroll top</button>-->
          <pagination class="mt-3"
                      v-if="pagination"
                      :items-count="getCataloguesCount"
                      :items-per-page="getLimit"
                      :click-handler="changePageTo"
                      :get-page="this.getPage"
                      :next-button-text="$t('message.pagination.nextPage')"
                      :prev-button-text="$t('message.pagination.previousPage')">
          </pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import vuex helpers
import { mapActions, mapGetters } from 'vuex';
// Import custom helpers
import { debounce, has } from 'lodash';
import fileTypes from '../utils/fileTypes';
// Import components used in template
import CatalogueFacets from './PeacockCatalogueFacets';
import DataInfoBox from './PeacockDataInfoBox';
import Pagination from './PeacockPagination';
// Import filters
import dateFilters from '../filters/dateFilters';
import SelectedFacetsOverview from './PeacockSelectedFacetsOverview';
import { getCountryFlagImg, getTranslationFor } from '../utils/helpers';

export default {
  name: 'peacockCatalogues',
  dependencies: ['CatalogueService'],
  components: {
    selectedFacetsOverview: SelectedFacetsOverview,
    dataInfoBox: DataInfoBox,
    catalogueFacets: CatalogueFacets,
    pagination: Pagination,
  },
  props: {
    infiniteScrolling: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      autocompleteData: {
        suggestions: {},
        show: true,
      },
      datasetCounts: {},
      debouncedOnBottomScroll: debounce(this.onBottomScroll, 500),
      facetFields: [],
      lang: this.locale,
      query: '',
      sortSelected: 'relevance desc, modification_date desc, title.en asc',
      sortSelectedLabel: this.$t('message.sort.relevance'),
    };
  },
  head: {
    meta: [
      { property: 'robots', content: 'follow,noindex' },
    ],
  },
  computed: {
    ...mapGetters('catalogues', [
      'getCatalogues',
      'getCataloguesCount',
      'getFacets',
      'getLimit',
      'getLoading',
      'getOffset',
      'getPage',
      'getPageCount',
      'getAvailableFacets',
    ]),
    /**
     * @description Returns the current page.
     * @returns {Number}
     */
    page() {
      return this.$route.query.page;
    },
    /**
     * @description Returns the active facets.
     * @returns {Object}
     */
    facets() {
      const facets = {};
      for (const field of this.facetFields) {
        let urlFacets = this.$route.query[field];
        if (!urlFacets) urlFacets = [];
        else if (!Array.isArray(urlFacets)) urlFacets = [urlFacets];
        facets[field] = urlFacets;
      }
      return facets;
    },
  },
  methods: {
    ...mapActions('catalogues', [
      'autocompleteQuery',
      'loadCatalogues',
      'loadAdditionalCatalogues',
      'setQuery',
      'setPage',
      'useService',
      'addFacet',
      'setFacets',
      'setFacetOperator',
      'setFacetGroupOperator',
      'setPageCount',
      'setSort',
      'setLoading',
    ]),
    // The imported Lodash has function. Must be defined in Methods so we can use it in template
    has,
    getTranslationFor,
    getCountryFlagImg,
    autocomplete(query) {
      this.autocompleteQuery(query)
        .then((response) => {
          this.autocompleteData.suggestions = [];
          const suggestions = response.data.result;
          const displayedSuggestions = [];
          for (const ds of suggestions.results) {
            displayedSuggestions.push(ds);
          }
          this.autocompleteData.suggestions = displayedSuggestions;
          this.autocompleteData.show = query.length !== 0;
        })
        .catch(() => {});
    },
    handleSuggestionSelection(suggestion) {
      this.$router.push({ path: this.$route.path.slice(-1) === '/' ? `${this.$route.path}${suggestion.idName}` : `${this.$route.path}/${suggestion.idName}` });
    },
    changePageTo(page) {
      this.$router.replace({ query: Object.assign({}, this.$route.query, { page }) });
      this.scrollTo(0, 0);
    },
    /**
     * @description Handler-function for the scroll event.
     */
    onScroll() {
      const items = this.$el.querySelectorAll('.catalogue');
      const lastItem = items[items.length - 1];
      if (lastItem) {
        const lastItemPos = lastItem.getBoundingClientRect();
        if (lastItemPos.bottom - window.innerHeight <= 0) {
          this.debouncedOnBottomScroll();
        }
      }
    },
    /**
     * @description Handler-function when bottom of the page is reached.
     */
    onBottomScroll() {
      this.$nextTick(() => {
        this.$Progress.start();
        this.setLoading(true);
        this.loadAdditionalCatalogues()
          .then(() => {
            this.$Progress.finish();
            this.setLoading(false);
          })
          .catch(() => {
            this.$Progress.fail();
            this.setLoading(false);
          });
      });
    },

    /**
     * @description The the current scroll-level to a given point.
     * @param x {Number} - The x-position to scroll to
     * @param y {Number} - The y-position to scroll to
     */
    scrollTo(x, y) {
      window.scrollTo(x, y);
    },
    /**
     * @description Removes the duplicates of the given array
     * @param array {Array} - The array to remove duplicates from
     * @returns {Array}
     */
    removeDuplicatesOf(array) {
      // Array --> Set --> Array to remove duplicates.
      return [...new Set(array)];
    },
    /**
     * @description Determines the current page.
     */
    initPage() {
      const page = parseInt(this.$route.query.page, 10);
      if (page > 0) this.setPage(page);
      else this.setPage(1);
    },
    /**
     * @description Initialize the query String by checking the route parameters
     */
    initQuery() {
      let query = this.$route.query.query;
      if (!query) {
        query = '';
        this.setQuery('');
      } else {
        this.query = query;
        this.setQuery(query);
      }
    },
    /**
     * @descritption Initialize the active facets by checking the route parameters
     */
    initFacets() {
      const fields = ['country', 'catalog', 'categories', 'keywords', 'format', 'licence'];
      for (const field of fields) {
        this.facetFields.push(field);
        if (!Object.prototype.hasOwnProperty.call(this.$route.query, [field])) {
          this.$router.replace({
            query: Object.assign({}, this.$route.query, { [field]: [] }),
          });
        } else {
          for (const facet of this.$route.query[field]) {
            this.addFacet({ field, facet });
          }
        }
      }
    },
    initFacetOperator() {
      const op = this.$route.query.facetOperator;
      if (op === 'AND' || op === 'OR') this.setFacetOperator(op);
    },
    initFacetGroupOperator() {
      // const op = this.$route.query.facetGroupOperator;
      // The facetGroupOperator should be the same as the facetOperator
      const op = this.$route.query.facetOperator;
      if (op === 'AND' || op === 'OR') this.setFacetGroupOperator(op);
    },
    initSort() {
      let sort = this.$route.query.sort;
      if (sort) {
        sort = sort.split(',')[0].toLowerCase();
        if (sort === 'relevance+desc') this.sortSelectedLabel = this.$t('message.sort.relevance');
        if (sort.includes('title') && sort.includes('asc')) this.sortSelectedLabel = this.$t('message.sort.nameAZ');
        if (sort.includes('title') && sort.includes('desc')) this.sortSelectedLabel = this.$t('message.sort.nameZA');
        if (sort === 'modification_date+desc') this.sortSelectedLabel = this.$t('message.sort.lastUpdated');
        if (sort === 'release_date+desc') this.sortSelectedLabel = this.$t('message.sort.lastCreated');
        this.sortSelected = sort;
      }
    },
    getFileTypeColor(format) {
      return fileTypes.getFileTypeColor(format);
    },
    filterDateFormatUS(date) {
      return dateFilters.formatUS(date);
    },
    filterDateFormatEU(date) {
      return dateFilters.formatEU(date);
    },
    filterDateFromNow(date) {
      return dateFilters.fromNow(this.$i18n, date);
    },
    setSortMethod(method, order, label) {
      this.sortSelectedLabel = label;
      this.sortSelected = `${method}+${order}`;
    },
    changeQuery(query) {
      // this.autocomplete(query);
      this.$router.replace({ query: Object.assign({}, this.$route.query, { query }) });
      this.setQuery(query);
    },
  },
  watch: {
    /**
     * @descritpion Watcher for active facets
     */
    facets: {
      handler(facets) {
        this.setFacets(facets);
      },
      deep: true,
    },
    page(pageStr) {
      const page = parseInt(pageStr, 10);
      if (page > 0) this.setPage(page);
      else this.setPage(1);
    },
    sortSelected: {
      handler(sort) {
        this.$router.replace({ query: Object.assign({}, this.$route.query, { sort }) });
        this.setSort(sort);
      },
      deep: true,
    },
  },
  created() {
    this.useService(this.CatalogueService);
    this.initPage();
    this.initQuery();
    this.initSort();
    this.initFacetOperator();
    this.initFacetGroupOperator();
    this.initFacets();
    this.$nextTick(() => {
      this.$Progress.start();
      this.loadCatalogues({})
        .then(() => {
          this.setPageCount(Math.ceil(this.getCataloguesCount / this.getLimit));
          this.$Progress.finish();
        })
        .catch(() => this.$Progress.fail());
    });
    if (this.infiniteScrolling) window.addEventListener('scroll', this.onScroll);
  },
  mounted() {
  },
  beforeDestroy() {
    if (this.infiniteScrolling) window.removeEventListener('scroll', this.onScroll);
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';

  .suggestion-input-group {
    position: relative;
  }
  .suggestion-input {
    position: absolute;
    top: 0;
  }
  .suggestion-list-group {
    position: relative;
    width: 100%;
  }
  .suggestion-list {
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 100;
  }
</style>
