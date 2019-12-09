<template>
  <div class="data-info-box card mt-3">
    <a data-toggle="collapse"
       :href="`#dist-${collapseId}`"
       v-if="collapse">
      <div class="card-header">
        <h6 class="card-title text-dark">{{ title || 'no title given' }}</h6>
      </div>
    </a>
    <app-link class="text-dark text-decoration-none" :to="{ path: linkTo, query: Object.assign({}, { locale: $route.query.locale }) }">
      <div class="card-header pb-0"
           v-if="!collapse">
        <div class="card-title">
          <span class="data-info-box-title mb-0 text-dark">{{ title || 'no title given' }}</span>
          <ul class="subtitle-list list-inline subtitle align-middle mr-1" v-if="!isEmpty(source)">
            <!-- Distributor -->
            <li class="list-inline-item small">
              <img class="mr-1 border border-dark" width="24" alt="Catalogue Flag" v-if="has(source, 'sourceImage')" :src="source.sourceImage">
              <span v-if="has(source, 'sourceTitle') && !isNil(source.sourceTitle)">{{ getTranslationFor(source.sourceTitle, $i18n.locale, []) }}</span>
            </li>
            
            <!-- Dates -->
            <li class="list-inline-item small"
                v-for="(md, i) in metadata"
                :key="i"
                v-if="has(md, 'title') && !isNil(md.title) && has(md, 'value')">
              <span>{{ md.title }}</span>
              <span>
                <dataset-date :date="md.value"/>
              </span>
            </li>
          </ul>
        </div>

        <!-- Formats and licenses -->
        <div class="" v-if="!isNil(metadata) && isObject(metadata)">
          <span class="formats badge badge-secondary rounded-pill mr-1"
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
        <i class="material-icons feature-icon float-right" v-for="(fi, index) in featureIndicators" :key="index">{{ fi }}</i>
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

  export default {
    name: 'dataInfoBox',
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
    },
    mixins: [animations],
    data() {
      return {};
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

  // Truncated description text
  .truncated-gradient {
    height: 100%;
    max-height: 10rem;
    overflow: hidden;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
      height: 4rem;
      width: 100%;
    }
  }

  .data-info-box {
    border-left: 3px solid rgba($primary, .8);
    // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all .3s cubic-bezier(.25, .8, .25, 1);
    &:hover {
      border-left: 3px solid rgba($primary, 1.0);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.22);
      cursor: pointer;
    }

    .data-info-box-title {
      font-weight: 600;
      font-size: 1.1rem;
    }

    .card-header {
      border: none;
      background-color: inherit;
      ul.subtitle-list {
        li {
          margin: 0;
          &:last-child:after {
            content: ""
          }
          &:after {
            content: " ";
            white-space: normal;
            word-spacing: 1em; /* = nav@padding-right - this actually makes width */
            margin: 0 5px;
          }
        }
      }
      .badge-pill {
        border-radius: 10px;
      }
    }

    .formats {
      &[type="HTML"] {
        background-color: #55a1ce;
      }
      &[type="JSON"] {
        background-color: #ef7100;
      }
      &[type="XML"] {
        background-color: #ef7100;
      }
      &[type="TXT"] {
        background-color: #74cbec;
      }
      &[type="CSV"] {
        background-color: #dfb100;
      }
      &[type="XLS"] {
        background-color: #2db55d;
      }
      &[type="ZIP"] {
        background-color: #686868;
      }
      &[type="API"] {
        background-color: #ec96be;
      }
      &[type="PDF"] {
        background-color: #e0051e;
      }
      &[type="RDF"],
      &[type="NQUAD"],
      &[type="NTRIPLES"],
      &[type="TURTLE"] {
        background-color: #0b4498;
      }
    }

    .card-footer {
      display:flex;
      flex-direction: row;
      justify-content: space-between;

      i {
        font-size: 32px;
        vertical-align: middle;
        margin: 0 0 .1em 0;
      }
    }
  }
</style>
