<template>
  <div class="container dataset-facets">
    <div class="row mx-3 mr-md-0">
      <div class="col">
        <!-- Location suggestions and Map START-->
        <div class="row" v-if="showGazetteer && !showCatalogueDetails">
          <div class="input-group suggestion-input-group mb-2">
            <input type="text" class="form-control suggestion-input"
                   :aria-label="$t('message.datasets.findLocation')"
                   :placeholder="$t('message.datasets.findLocation')"
                   v-model="gazetteer.searchbarText"
                   @focus="gazetteer.selected = false; gazetteer.searchbarText = ''"
                   @input="getAutocompleteSuggestions(gazetteer.searchbarText)"
                   @keyup.enter="getAutocompleteSuggestions(gazetteer.searchbarText)">
            <div class="input-group-append">
              <button class="btn btn-secondary">
                <i class="material-icons align-bottom">search</i>
              </button>
            </div>
            <div class="suggestion-list-group">
              <ul class="list-group suggestion-list">
                <button class="list-group-item list-group-item-action"
                    v-for="(suggestion, i) in gazetteer.suggestions"
                    :key="i"
                    v-if="i <= 9 && !gazetteer.selected"
                    @click="handleSuggestionSelection(suggestion)">
                  {{suggestion.name}}
                </button>
              </ul>
            </div>
          </div>
        </div>
        <div class="row position-relative mb-3" v-if="showGazetteer && !showCatalogueDetails">
          <mapboundsreceiver class="border-secondary map" width="100%" :bounds-id="geoBoundsId" ref="mapReceiver"/>
          <Button class="btn btn-highlight reset-bounds-button" v-if="getGeoBoundsById(geoBoundsId)" @click="resetBoundsFor(geoBoundsId)">Reset Bounds</Button>
          <Button class="btn btn-sm btn-secondary map-modal-button" data-toggle="modal" data-target=".map-modal" @click="triggerResize()">
            <i class="material-icons">fullscreen</i>
          </Button>
          <!-- Modal Map Start -->
          <div id="modal-map-wrapper" class="modal fade map-modal pr-md-4 pl-md-4 pr-0 pl-0" tabindex="-1" role="dialog" aria-labelledby="Large map view" aria-hidden="true">
            <div class="modal-dialog mt-md-4 mb-md-4 m-0">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">{{ $t('message.mapModal.drawRectangleMsg') }}</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body d-flex flex-row flex-wrap p-md-3 p-0">
                  <mapboundssender :bounds-id="geoBoundsId" map-container-id="modalMap" ref="mapSender"></mapboundssender>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-dismiss="modal">{{ $t('message.mapModal.close') }}</button>
                  <button type="button" class="btn btn-highlight" @click="resetBoundsFor(geoBoundsId)">{{ $t('message.mapModal.reset') }}</button>
                  <button type="button" class="btn btn-secondary" @click="applyHoldedBounds()" data-dismiss="modal">{{ $t('message.mapModal.findDatasets') }}</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Modal Map End -->
        </div>
        <!-- Location suggestions and Map END-->
        <!-- Catalogue Details START-->
        <div class="row position-relative" v-if="showCatalogueDetails">
          <span class="px-3">
            <img :src="getCountryFlagImg(getCatalogue.country.id)"
                  class="catalogue-flag border border-dark"
                  width="100%"
                  v-if="has(getCatalogue, 'country.id')"
                  :alt="getCatalogue.country.id">
          </span>
          <div class="col mt-3" v-if="!isEmpty(catalogue) && has(catalogue, 'languages')">
            <dl class="small">
              <dt>{{ $t('message.metadata.title') }}</dt>
              <dd>{{ `${getTranslationFor(getCatalogue.title, $i18n.locale, getCatalogue.languages) || catalogue.id}` }}</dd>
              <dt v-if="has(catalogue, 'description')">{{ $t('message.metadata.description') }}</dt>
              <dd v-if="has(catalogue, 'description')">{{ `${getTranslationFor(getCatalogue.description, $i18n.locale, getCatalogue.languages)}` }}</dd>
              <dt v-if="has(catalogue, 'publisher') &&
                        (has(catalogue, 'publisher.name') || has(catalogue, 'publisher.email'))">{{ $t('message.metadata.publisher') }}</dt>
              <dd v-if="has(catalogue, 'publisher.name')">{{ `${getCatalogue.publisher.name}` }}</dd>
              <a :href="getCatalogue.publisher.email" v-if="has(catalogue, 'publisher.email')">
                <dd>{{ `${getCatalogue.publisher.email}` }}</dd>
              </a>
            </dl>
          </div>
        </div>
        <!-- Catalogue Details END -->
        <!--Facet settings-->
        <div class="row facet-field mb-3" v-if="showOperator && !showCatalogueDetails">
          <div class="col list-group pr-0">
            <a class="facet-header-item list-group-item list-group-item-secondary">
              <span class="facet-title text-dark fw-bold">{{ $t('message.datasetFacets.settings') }}</span>
            </a>
              <div class="form-group list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                {{ $t('message.datasetFacets.operator') }}
                <span class="switch switch-sm" v-if="!browser.isIE">
                  <label class="mr-1" for="switch-facet-operator">{{ $t('message.datasetFacets.and') }}</label>
                  <input type="checkbox" class="switch-sm" id="switch-facet-operator" @click="toggleFacetOperator" :checked="getFacetOperator === 'OR'">
                  <label for="switch-facet-operator">{{ $t('message.datasetFacets.or') }}</label>
                </span>
                <span v-if="browser.isIE">
                  <div class="form-check form-check-inline">
                    <input type="radio" class="form-check-input" name="radio-facet-operator" id="radio-and" @click="changeFacetOperator(facetOperators.and)" :checked="getFacetOperator === facetOperators.and">
                    <label for="radio-and" class="form-check-label">{{ $t('message.datasetFacets.and') }}</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input type="radio" class="form-check-input" name="radio-facet-operator" id="radio-or" @click="changeFacetOperator(facetOperators.or)" :checked="getFacetOperator === facetOperators.or">
                    <label for="radio-or" class="form-check-label">{{ $t('message.datasetFacets.or') }}</label>
                  </div>
                </span>
              </div>
          </div>
        </div>
        <div class="d-none d-md-block">
          <div class="row facet-field mb-3"
               v-for="(field, index) in getAvailableFacets"
               :key="index"
               :class="{'mt-3': (index > 0)}"
               v-if="field.items.length > 0 && (field.id !== 'catalog' || (showCatalogueFacets === (field.id === 'catalog')))">
            <div class="col list-group pr-0">
              <a class="d-none d-md-block facet-header-item list-group-item list-group-item-secondary">
                <span class="facet-title text-dark fw-bold mb-0">{{ $t(`message.datasetFacets.facets.${field.title.toLowerCase()}`) }}</span>
              </a>
              <a class="d-flex d-md-none list-group-item justify-content-between align-items-baseline" @click="toggleExpanded(field.title)">
                <h4 class="mb-0">{{ $t(`message.datasetFacets.facets.${field.title.toLowerCase()}`) }}</h4>
                <button class="btn">
                  <i class="material-icons small-icon expand-more animated" v-if="!isExpanded(field.title)">expand_more</i>
                  <i class="material-icons small-icon expand-less animated" v-if="isExpanded(field.title)">expand_less</i>
                </button>
              </a>
              <button
                class="d-none d-md-flex facet list-group-item list-group-item-action justify-content-between align-items-center"
                v-for="(facet, index) in sortByCount(field.items)"
                :key="index"
                v-if="isExpanded(field.title) ? (index <= limits.max) : (index <= limits.min - 1)"
                :class="{active: facetIsSelected(field.id, facet.id), 'list-group-item-dark': facetIsSelected(field.id, facet.id)}"
                @click="facetClicked(field.id, facet.id)">
                <span class="text-truncate" :title="facet.title.de || facet.title">{{facet.title.de || facet.title}}</span>
                <span class="facet-count badge bg-secondary">{{facet.count | formatNumber}}</span>
              </button>
              <button class="d-none d-md-block btn btn-secondary" v-if="field.items.length > limits.min"
                      @click="toggleExpanded(field.title)">
                <i class="material-icons align-bottom expand-more animated" v-if="!isExpanded(field.title)">expand_more</i>
                <i class="material-icons align-bottom expand-less animated" v-if="isExpanded(field.title)">expand_less</i>
              </button>
            </div>
          </div>
        </div>
        <div class="d-block d-md-none">
          <div class="row facet-field mt-3"
               v-for="(field, index) in getAvailableFacets"
               :key="index"
               :class="{'mt-3': (index > 0)}"
               v-if="field.items.length > 0 && (field.id !== 'catalog' || (showCatalogueFacets === (field.id === 'catalog')))">
            <div class="col list-group pr-0">
              <a class="list-group-item d-flex justify-content-between align-items-baseline">
                <h4 class="mb-0">{{ $t(`message.datasetFacets.facets.${field.title.toLowerCase()}`) }}</h4>
                <button class="btn" @click="toggleExpanded(field.title)">
                  <i class="material-icons small-icon align-bottom expand-more animated" v-if="!isExpanded(field.title)">expand_more</i>
                  <i class="material-icons small-icon align-bottom expand-less animated" v-if="isExpanded(field.title)">expand_less</i>
                </button>
              </a>
              <button
                class="facet list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                v-for="(facet, index) in sortByCount(field.items)"
                :key="index"
                v-if="isExpanded(field.title)"
                :class="{active: facetIsSelected(field.id, facet.id), 'list-group-item-dark': facetIsSelected(field.id, facet.id)}"
                @click="facetClicked(field.id, facet.id)">
                <span class="text-truncate">{{facet.title}}</span>
                <span class="facet-count badge bg-secondary">{{facet.count}}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  // Import custom helpers
  import {
    isEmpty,
    isBoolean,
    has,
    isNil,
  } from 'lodash';
  import MapBoundsSender from './MapBoundsSender';
  import MapBoundsReceiver from './MapBoundsReceiver';
  import { getTranslationFor, getCountryFlagImg } from '../utils/helpers';
  import GLUE_CONFIG from '../../user-config/glue-config';
  /* The minimum amount of facets to show for one category before hiding results */
  const MIN_FACET_LIMIT = 10;
  /* The maximum amount of facets to show for one category */
  const MAX_FACET_LIMIT = 50;
  /* Enum for possible Facet operators */
  const FACET_OPERATORS = Object.freeze({ or: 'OR', and: 'AND' });
  /* Enum for possible Facet group operators */
  const FACET_GROUP_OPERATORS = Object.freeze({ or: 'OR', and: 'AND' });

  export default {
    name: 'datasetFacets',
    dependencies: ['GazetteerService', 'CatalogueService'],
    components: {
      mapboundssender: MapBoundsSender,
      mapboundsreceiver: MapBoundsReceiver,
    },
    data() {
      return {
        limits: {
          min: MIN_FACET_LIMIT,
          max: MAX_FACET_LIMIT,
        },
        facetOperators: FACET_OPERATORS,
        expanded: [],
        gazetteer: {
          searchbarText: '',
          suggestions: [],
          selected: false,
          bounds: [],
        },
        geoBoundsId: 'ds-search-bounds',
        showCatalogueDetails: false,
        showGazetteer: GLUE_CONFIG.enable.filter.gazetteer,
        showOperator: GLUE_CONFIG.enable.filter.operator,
        catalogue: {},
        // Browser detection source: https://stackoverflow.com/a/9851769/6369868
        browser: {
          /* eslint-disable-next-line */
          isIE: /*@cc_on!@*/false || !!document.documentMode,
        },
      };
    },
    computed: {
      ...mapGetters('catalogueDetails', [
        'getCatalogue',
      ]),
      ...mapGetters('datasets', [
        'getAvailableFacets',
        'getDatasetsCount',
        'getFacetOperator',
        'getFacetGroupOperator',
        'getLimit',
        'getPage',
        'getDatasetGeoBounds',
      ]),
      ...mapGetters('geo', [
        'getGeoBoundsById',
        'getHoldedGeoBoundsById',
      ]),
      ...mapGetters('gazetteer', [
        'getSuggestions',
      ]),
      geoStateBoundsWatcher() {
        return this.getGeoBoundsById(this.geoBoundsId);
      },
      datasetBoundsWatcher() {
        return this.getDatasetGeoBounds;
      },
      facetOperatorWatcher() {
        return this.getFacetOperator;
      },
      facetGroupOperatorWatcher() {
        return this.getFacetGroupOperator;
      },
      catalogueWatcher() {
        return this.getCatalogue;
      },
      showCatalogueDetailsWatcher() {
        return this.$route.query.showcataloguedetails;
      },
      showCatalogueFacets() {
        // Dont show Catalog(ue) facets when in catalogue details mode.
        return !this.showCatalogueDetails;
      },
    },
    filters: {
      formatNumber(value) {
        if (!value) return '';
        const formatted = Math.floor(value / 1000);
        if (formatted >= 10) {
          return `${formatted}K`;
        }
        return value;
      },
    },
    methods: {
      isEmpty,
      isBoolean,
      has,
      isNil,
      getCountryFlagImg,
      getTranslationFor,
      ...mapActions('catalogueDetails', [
        'loadCatalogue',
        'useCatalogueService',
      ]),
      ...mapActions('datasets', [
        'toggleFacet',
        'addFacet',
        'removeFacet',
        'setFacetOperator',
        'setFacetGroupOperator',
        'setPage',
        'setPageCount',
        'setDatasetGeoBounds',
      ]),
      ...mapActions('geo', [
        'setGeoBoundsForId',
        'resetGeoBoundsForId',
        'resetHoldedGeoBoundsForId',
      ]),
      ...mapActions('gazetteer', [
        'autocomplete',
        'useService',
      ]),
      /**
       * @description Sorts an array of facets by their count.
       * @param {Array<Object>} facets - The facets to sort
       * @param {Number} facet.count - The amount of datasets having this facet assigned
       * @param {String} facet.name - The name of this facet
       * @returns {Array<Object>}
       */
      sortByCount(facets) {
        return facets.slice().sort((a, b) => {
          const n = b.count - a.count;
          if (n !== 0) return b.count - a.count;
          if (a.name < b.name) return -1;
          return 1;
        });
      },
      /**
       * @description Returns whether a facet-field is expanded or not.
       * @param {String} field - The given facet-field.
       * @returns {boolean}
       */
      isExpanded(field) {
        return this.expanded.indexOf(field) > -1;
      },
      /**
       * @description Expands/Collapses a facet-field.
       * @param field - The given facet-field
       */
      toggleExpanded(field) {
        const index = this.expanded.indexOf(field);
        if (index > -1) this.expanded.splice(index);
        else this.expanded.push(field);
      },
      /**
       * @description Returns whether a facet is selected or not.
       * @param field - The field of the facet to check.
       * @param facet - The facet to check.
       * @returns {boolean}
       */
      facetIsSelected(field, facet) {
        if (!Object.prototype.hasOwnProperty.call(this.$route.query, field)) {
          return false;
        }
        let qField = this.$route.query[field];
        if (!Array.isArray(qField)) qField = [qField];
        return qField.indexOf(facet) > -1;
      },
      /**
       * @description Wrapping callback-function for a click on a facet.
       * @param field - The field of the clicked facet
       * @param facet - The clicked facet
       */
      facetClicked(field, facet) {
        this.toggleFacet(field, facet);
        this.resetPage();
      },
      /**
       * @description Add/Remove a facet from the routers query parameters.
       * @param field - The field of the facet
       * @param facet - The given facet
       */
      toggleFacet(field, facet) {
        if (!Object.prototype.hasOwnProperty.call(this.$route.query, [field])) {
          this.$router.push({ query: Object.assign({}, this.$route.query, { [field]: [] }) });
        }
        let facets = this.$route.query[field].slice();
        if (!Array.isArray(facets)) facets = [facets];
        const index = facets.indexOf(facet);
        if (index > -1) {
          facets.splice(index, 1);
        } else {
          facets.push(facet);
        }
        this.$router.push({ query: Object.assign({}, this.$route.query, { [field]: facets }) });
      },
      /**
       * @description Toggles the facetoperator between 'or'/'and'.
       */
      toggleFacetOperator() {
        let op = this.getFacetOperator;
        op = op === FACET_OPERATORS.and ? FACET_OPERATORS.or : FACET_OPERATORS.and;
        this.setFacetOperator(op);
        // facetGroupOperator should have the same value as facetOperator
        this.setFacetGroupOperator(op);
      },
      /**
       * @description Toggles the facetoperator between 'or'/'and'.
       */
      changeFacetOperator(op) {
        this.setFacetOperator(op);
        // facetGroupOperator should have the same value as facetOperator
        this.setFacetGroupOperator(op);
      },
      /**
       * @description Toggles the facetoperator between 'or'/'and'.
       */
      toggleFacetGroupOperator() {
        let op = this.getFacetGroupOperator;
        op = op === FACET_GROUP_OPERATORS.and ? FACET_GROUP_OPERATORS.or : FACET_GROUP_OPERATORS.and;
        this.setFacetGroupOperator(op);
      },
      resetPage() {
        this.$router.replace({ query: Object.assign({}, this.$route.query, { page: 1 }) });
      },
      applyHoldedBounds() {
        const holdedBounds = this.getHoldedGeoBoundsById(this.geoBoundsId);
        this.setGeoBoundsForId({
          bounds: holdedBounds,
          boundsId: this.geoBoundsId,
        });
      },
      resetBoundsFor(boundsId) {
        this.$refs.mapSender.resetBounds();
        this.$refs.mapReceiver.resetBounds();
        this.resetGeoBoundsForId(boundsId);
        this.resetHoldedGeoBoundsForId(boundsId);
      },
      getAutocompleteSuggestions(query) {
        if (!query || isNil(query)) this.clearAutocompleteSuggestions();
        else {
          this.autocomplete(query).then(() => {
            this.$nextTick(() => {
              this.gazetteer.suggestions = this.getSuggestions;
            });
          });
        }
      },
      clearAutocompleteSuggestions() {
        this.gazetteer.suggestions = [];
      },
      handleSuggestionSelection(suggestion) {
        this.gazetteer.searchbarText = suggestion.name;
        this.gazetteer.selected = true;
        const location = suggestion.geometry.split(',');
        this.gazetteer.bounds = [[location[1], location[0]], [location[3], location[2]]]
          .map(point => point.map(coord => parseFloat(coord)));
        this.setGeoBoundsForId({
          bounds: this.gazetteer.bounds,
          boundsId: this.geoBoundsId,
        });
      },
      triggerResize() {
        if (this.browser.isIE) {
          // Note: Trigger resize after 500ms (IE11 needs longer than modern browsers) in IE11 when Modal element is visible to properly display the map component
          setTimeout(() => {
            const evt = document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);
          }, 500);
        } else {
          // Note: Trigger resize after 200ms when Modal element is visible to properly display the map component
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 200);
        }
      },
      initShowCatalogueDetails() {
        const showCatalogueDetails = this.$route.query.showcataloguedetails;
        if (showCatalogueDetails === 'true') {
          this.showCatalogueDetails = true;
          this.loadCatalogue(this.$route.query.catalog);
        } else this.showCatalogueDetails = false;
      },
    },
    watch: {
      geoStateBoundsWatcher: {
        deep: true,
        handler(bounds) {
          this.setDatasetGeoBounds(bounds);
        },
      },
      datasetBoundsWatcher: {
        deep: true,
        handler() {
        },
      },
      facetOperatorWatcher: {
        handler(facetOperator) {
          this.$router.replace({ query: Object.assign({}, this.$route.query, { facetOperator }) });
        },
      },
      facetGroupOperatorWatcher: {
        handler(facetGroupOperator) {
          this.$router.replace({ query: Object.assign({}, this.$route.query, { facetGroupOperator }) });
        },
      },
      showCatalogueDetailsWatcher: {
        handler(showCatalogueDetails) {
          this.showCatalogueDetails = showCatalogueDetails;
        },
      },
      catalogueWatcher: {
        handler(catalogue) {
          this.catalogue = catalogue;
        },
      },
    },
    created() {
      this.useService(this.GazetteerService);
      this.useCatalogueService(this.CatalogueService);
      this.initShowCatalogueDetails();
    },
    destroyed() {
    },
    mounted() {
    },
  };
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';

  .facet:hover {
    cursor: pointer;
  }

  .map {
    z-index: 0;
  }
  .suggestion-input-group {
    position: relative;
  }
  .suggestion-input {
    position: absolute;
    top: 0;
    height: 100%;
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

  .map-modal-button {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  #modal-map-wrapper .modal-dialog {
    max-width: 100%;
  }

  .modal-content {
    min-height: 100%;
    min-height: 100vh;
  }

  #modalMap {
    display: flex;
    flex: 1 1;
  }

  @media (min-width: 768px) {
    .modal-content {
      min-height: auto!important;
    }
    #modalMap {
      height: 500px;
    }
  }

  .reset-bounds-button {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  /*** MATERIAL ICONS ***/
  .material-icons.small-icon {
    font-size: 20px;
  }
</style>
