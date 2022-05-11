<!-- @license Copyright 2022 Thomas Tursics
              SPDX-License-Identifier: Apache-2.0
-->

<template>
  <div class="data-info-box card mt-3 border border-light">
    <a data-bs-toggle="collapse"
       :href="`#dist-${collapseId}`"
       v-if="collapse">
      <div class="card-header bg-transparent border-0">
        <h6 class="card-title text-dark">{{ title || 'no title given' }}</h6>
      </div>
    </a>
    <app-link class="text-dark text-decoration-none" :to="{ path: linkTo, query: Object.assign({}, { locale: $route.query.locale }) }">
      <div class="card-header bg-transparent border-0 pb-0"
           v-if="!collapse">
        <div class="card-title">
          <span class="data-info-box-title mb-0 fw-bold fs-5 text-dark">{{ title || 'no title given' }}</span>
          <ul class="subtitle-list list-inline subtitle align-middle mr-1" v-if="!isEmpty(source)">
            <!-- Distributor -->
            <li class="list-inline-item small m-0 me-2">
              <img v-if="has(source, 'sourceImage')" class="mr-1 border border-dark" :class="source.sourceID ? 'source-' + source.sourceID : ''" width="24" alt="Catalogue Flag" :src="source.sourceImage">
              <span v-if="has(source, 'sourceTitle') && !isNil(source.sourceTitle)">{{ getTranslationFor(source.sourceTitle, $i18n.locale, []) }}</span>
            </li>
            
            <!-- Dates -->
            <li class="list-inline-item small m-0 me-2"
                v-for="(md, i) in metadata"
                :key="i"
                v-if="has(md, 'title') && !isNil(md.title) && has(md, 'value')">
              <span>{{ md.title }}</span>
              <span>
                <dataset-date :date="md.value"/>
              </span>
            </li>
          </ul>
          <button v-if="showFavorites"
            type="button"
            class="btn btn-sm btn-secondary position-absolute top-0 end-0"
            @click="onFavorites"
          >
            <font-awesome-icon v-if="favorite === true" class="fa fs-6" :icon="{ prefix: 'fas', iconName: 'heart' }"></font-awesome-icon>
            <font-awesome-icon v-else class="fa fs-6" :icon="{ prefix: 'far', iconName: 'heart' }"></font-awesome-icon>
          </button>
        </div>

        <!-- Formats and licenses -->
        <div class="" v-if="!isNil(metadata) && isObject(metadata)">
          <span class="formats badge bg-light border border-secondary text-secondary rounded-pill me-1"
                v-for="(tag, i) in bodyTags"
                v-if="showDistributionFormat(tag)"
                :key="i"
                :type="tag.title">
          {{ truncate(tag.title, 8, true) }}
          </span>
        </div>
        
      </div>
    </app-link>

    <app-link class="text-dark text-decoration-none" :to="{ path: linkTo, query: Object.assign({}, { locale: $route.query.locale }) }">
      <div class="card-body" :class="{'collapse': collapse}" :id="`dist-${collapseId}`">
        <div>
          <div class="col-2" v-if="bodyImg">
            <img class="body-img card-img border border-dark" ref="bodyImg" :src="bodyImg" alt="Body Info Box Image">
          </div>
          <div :class="{'col-12 col-md-7': !bodyImg && !metadata,
                        'col-12 col-md-9': bodyImg && !metadata}
                        ">
            <p class="card-text" v-if="!isNil(description)">{{ truncate(description, descriptionLength) }}</p>
          </div>
          <!-- <div class="col-12 col-md-3" v-if="!isNil(metadata) && isObject(metadata)">
            <span class="formats badge badge-secondary mr-1"
                  v-for="(tag, i) in bodyTags"
                  v-if="showDistributionFormat(tag)"
                  :key="i"
                  :type="tag.title">
            {{ truncate(tag.title, 8, true) }}
            </span>
            <dl class="small"
                v-for="(md, i) in metadata"
                :key="i"
                v-if="has(md, 'title') && !isNil(md.title) && has(md, 'value')">
              <dt>{{ md.title }}</dt>
              <dd>
                <dataset-date :date="md.value"/>
              </dd>
            </dl>
          </div> -->
        </div>
      </div>
    </app-link>

    <!-- <div class="card-footer d-flex justify-content-between">
      <linkCopyBar :link="footerLink" v-if="hasFooterLink()"></linkCopyBar>
      <div class="w-50">
        <font-awesome-icon class="fa fs-6" v-for="(fi, index) in featureIndicators" :key="index" :icon="{ prefix: 'fas', iconName: fi }"></font-awesome-icon>
      </div>
      <span class="align-middle mr-1"
            v-for="(tag, index) in footerTags"
            :key="index">
          <span class="badge badge-secondary">{{ tag }}</span>
      </span>
      <span class="align-middle mr-1" v-if="!isEmpty(source)">
        <img class="mr-1 border border-dark" width="30" alt="Catalogue Flag" v-if="has(source, 'sourceImage')" :src="source.sourceImage">
        <small v-if="has(source, 'sourceTitle') && !isNil(source.sourceTitle)">{{ getTranslationFor(source.sourceTitle, $i18n.locale, []) }}</small>
      </span>
    </div> -->
  </div>
</template>

<script>
  import {
    has,
    isNil,
    isEmpty,
    isObject,
  } from 'lodash';
  import moment from 'moment';

  // import nested components
  import AppLink from './AppLink';
  import LinkCopyBar from './LinkCopyBar';
  import DatasetDate from './DatasetDate';
  import animations from '../mixins/animations';
  import { getTranslationFor, truncate } from '../utils/helpers';
  import dateFilters from '../filters/dateFilters';
  import GLUE_CONFIG from '../../user-config/glue-config';

  export default {
    name: 'peacockDataInfoBox',
    components: {
      appLink: AppLink,
      linkCopyBar: LinkCopyBar,
      DatasetDate,
    },
    props: {
      collapse: {
        type: Boolean,
        default: false,
      },
      collapseId: {
        type: Number,
      },
      linkTo: {
        type: String,
      },
      title: {
        type: String,
        default: 'pass a title property, please',
      },
      description: {
        type: String,
      },
      descriptionLength: {
        type: Number,
        default: 100,
      },
      metadata: {
        type: Object,
      },
      bodyTags: {
        type: Array,
        default: () => [],
      },
      bodyImg: {
      },
      source: {
        type: Object,
      },
      footerTags: {
        type: Array,
        default: () => [],
      },
      /** link: {title: 'MyTitle', url: 'MyLink', target: '_blank'} */
      footerLink: {
        type: Object,
        default: () => {},
      },
      featureIndicators: {
        type: Array,
        default: () => [],
      },
      favorite: {
        type: Boolean,
        default: false,
      },
    },
    mixins: [animations],
    data() {
      return {
        showFavorites: GLUE_CONFIG.enable.favorites.enable,
      };
    },
    computed: {},
    methods: {
      has,
      isNil,
      isEmpty,
      isObject,
      getTranslationFor,
      truncate,
      hasFooterLink() {
        return Boolean(this.footerLink) && Object.prototype.hasOwnProperty.call(this.footerLink, 'url');
      },
      showDistributionFormat(tag) {
        return has(tag, 'title') && !isNil(tag.title);
      },
      pathEndsWithSlash(path) {
        return (path.slice(-1) === '/');
      },
      filterDateFormatUS(date) {
        return dateFilters.formatUS(date);
      },
      filterDateFormatEU(date) {
        return dateFilters.formatEU(date);
      },
      isIncorrectDate(date) {
        // Falsy dates are considered as intentionally blank and are correct
        if (!date) return false;

        const m = moment(String(date));
        if (!m.isValid()) return true;

        // Dates in the future are incorrect.
        return moment().diff(m) < 0;
      },
      onFavorites(e) {
        e.preventDefault();
        this.$emit('favorite-updated', !(this.favorite || false));
      },
    },
    created() {
    },
    mounted() {
      // this.fade('.data-info-box.fade-animation');
      // this.swingDown('.data-info-box.swing-down-animation');
      // this.pointExpansion('.data-info-box');
      // this.randomSideEnter('.data-info-box');
    },
    beforeDestroy() {
    },
  };
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';

  .data-info-box {
    border-color: #ced4da !important;

    &:hover {
      border-color: #5c636a !important;
      cursor: pointer;
    }
  }
</style>
