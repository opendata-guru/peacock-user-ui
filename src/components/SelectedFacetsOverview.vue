<template>
  <div>
    <p v-for="fieldId in Object.keys(selectedFacets)" :key="fieldId" 
       v-if="selectedFacets[fieldId].length > 0 && ((showCatalogueDetails === (fieldId !== 'catalog')) || !showCatalogueDetails)">
      <span>
        {{ `${findFacetFieldTitle(fieldId)}:` }}
      </span>
      <span v-for="(facetId, i) in selectedFacets[fieldId]" :key="i" class="badge badge-pill badge-highlight mr-1">
        {{ findFacetTitle(fieldId, facetId) }}
        <span @click="removeSelectedFacet(fieldId, facetId)" class="close-facet ml-2">&times;</span>
      </span>
    </p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'SelectedFacetsOverview',
    components: {},
    props: {
      selectedFacets: {
        required: true,
      },
    },
    data() {
      return {
        availableFacets: [],
        showCatalogueDetails: false,
      };
    },
    computed: {
      ...mapGetters('datasets', [
        'getAvailableFacets',
      ]),
      showCatalogDetailsWatcher() {
        return this.$route.query.showcataloguedetails;
      },
    },
    methods: {
      findFacetTitle(fieldId, facetId) {
        try {
          return this.getAvailableFacets.find(field => field.id === fieldId).items.find(facet => facet.id === facetId).title;
        } catch {
          return facetId;
        }
      },
      findFacetFieldTitle(fieldId) {
        try {
          return this.getAvailableFacets.find(field => field.id === fieldId).title;
        } catch {
          return fieldId;
        }
      },
      removeSelectedFacet(field, facet) {
        this.toggleFacet(field, facet);
        this.resetPage();
        this.$nextTick(() => {
          this.$emit('update-data');
        });
      },
      resetPage() {
        this.$router.replace({ query: Object.assign({}, this.$route.query, { page: 1 }) });
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
      initShowCatalogueDetails() {
        const showCatalogueDetails = this.$route.query.showcataloguedetails;
        if (showCatalogueDetails === 'true') {
          this.showCatalogueDetails = true;
        } else this.showCatalogueDetails = false;
      },
    },
    watch: {
      showCatalogDetailsWatcher: {
        handler(showCatalogDetails) {
          this.showCatalogueDetails = showCatalogDetails;
        },
      },
    },
    created() {
      this.initShowCatalogueDetails();
    },
    mounted() {
    },
    beforeDestroy() {
    },
  };
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';

  .close-facet {
    cursor: pointer;
  }
</style>
