<template>
  <div class="mb-5">
    <div v-if="!loadingDatasetDetails">
      <span property="dc:issued" :content="getReleaseDate"></span>
      <span property="dc:modified" :content="getModificationDate"></span>

      <div class="mt-4 description">
        <div class="row">
          <div class="col-12" property="dc:description">
            <p v-html="getTranslationFor(getDescription, $i18n.locale, getLanguages)"></p>
          </div>
        </div>
      </div>

      <div class="mt-3 infobanner">
        <div class="row">
          <div class="col-12">
            <!-- INCORRECT DATE BANNER -->
            <div class="p-0 py-3 text-center text-sm-left alert alert-secondary alert-dismissible fade show"
                 role="alert"
                 v-if="dateIncorrect">
              <div class="row">
                <div class="col-1 m-auto text-center">
                  <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'info-circle' }"></font-awesome-icon>
                </div>
                <div class="col-10">
                  <p class="mb-0">This dataset's last updated date is incorrect or incomplete, please contact the data provider for further inquiries.</p>
                </div>
                <div class="col-1">
                  <button class="close pt-0 btn btn-secondary"
                          type="button"
                          data-bs-dismiss="alert"
                          aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- MACHINE TRANSLATED BANNER -->
            <div class="p-0 py-3 text-center text-sm-left alert alert-secondary alert-dismissible fade show"
                 role="alert"
                 v-if="machineTranslated">
              <div class="row">
                <div class="col-1 m-auto text-center">
                  <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'info-circle' }"></font-awesome-icon>
                </div>
                <div class="col-10">
                  <p class="mb-0">{{ $t('message.datasetDetails.translation.message') }}</p>
                  <div v-if="showOriginalLanguage(getOriginalLanguage)">
                    <p class="mb-0">{{ $t('message.datasetDetails.translation.original') }}: <strong>{{ getOriginalLanguage }}</strong></p>
                    <app-link :to="getDatasetOriginalLanguage(getOriginalLanguage)">
                      <button class="alert-link font-weight-light btn btn-link btn-sm p-0"
                              @click="setDatasetOriginalLanguage(getOriginalLanguage)">
                        {{ $t('message.datasetDetails.translation.link') }}
                      </button>
                    </app-link>
                  </div>
                </div>
                <div class="col-1">
                  <button class="close pt-0 btn btn-secondary"
                          type="button"
                          data-bs-dismiss="alert"
                          aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- TRANSLATION NOT AVAILABLE BANNER -->
            <div class="p-0 py-3 text-center text-sm-left alert alert-secondary alert-dismissible fade show"
                 role="alert"
                 v-if="translationNotAvailable">
              <div class="row">
                <div class="col-1 m-auto text-center">
                  <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'info-circle' }"></font-awesome-icon>
                </div>
                <div class="col-10">
                  <p class="mb-0">{{ $t('message.datasetDetails.translation.noTranslation') }}</p>
                </div>
                <div class="col-1">
                  <button class="close pt-0 btn btn-secondary"
                          type="button"
                          data-bs-dismiss="alert"
                          aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
            <!-- TRANSLATION UPDATE PROCESSING BANNER -->
            <div class="p-0 py-3 text-center text-sm-left alert alert-secondary alert-dismissible fade show"
                 role="alert"
                 v-if="translationUpdateProcessing">
              <div class="row">
                <div class="col-1 m-auto text-center">
                  <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'info-circle' }"></font-awesome-icon>
                </div>
                <div class="col-10">
                  <p class="mb-0">{{ $t('message.datasetDetails.translation.update') }}</p>
                </div>
                <div class="col-1">
                  <button class="close pt-0 btn btn-secondary"
                          type="button"
                          data-bs-dismiss="alert"
                          aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-1 distributions">
        <div class="row">
          <div class="col-12">
            <h3>{{ $t('message.metadata.distributions') }} ({{ getDistributions ? getDistributions.length : 0 }})</h3>
          </div>
          <ul class="list list-unstyled col-12 border-top mt-3 pt-3">
            <div v-for="distribution in getDistributions"
                 :key="distribution.id">
              <li class="row">
                <span class="d-inline-block col-md-1 col-2 pr-md-1 pr-0 m-md-0 m-auto">
                  <div class="float-md-right text-center"
                       :type="getDistributionFormat(distribution)"
                       :data-bs-toggle="distributionFormatTruncated(distribution) ? 'tooltip' : false"
                       :data-bs-placement="distributionFormatTruncated(distribution) ? 'top' : false"
                       :title="distributionFormatTruncated(distribution) ? getDistributionFormat(distribution) : false">
                    <span class="bg-light border border-secondary text-secondary rounded-pill badge">{{ truncate(getDistributionFormat(distribution), 4, true) }}</span>
                  </div>
                </span>
                <span class="col-md-11 col-10">
                  <span class="row">
                    <span class="d-inline-block col-md-7 col-12">
                      <h6 class="m-0">{{ getDistributionTitle(distribution) }}</h6>
                      <span class="mt-2 d-block text-muted text-truncate">
                        <small>
                          {{ getDistributionDescription(distribution) }}
                        </small>
                      </span>
                      <small class="mt-2 d-block"
                             v-if="showLicence(distribution)">
                        <span class="font-weight-bold">
                          <!-- TODO: Replace Licence text by icon -->
                          {{ $t('message.metadata.license') }}:
                        </span>
                        <app-link :to="distribution.licence.resource"
                                  target="_blank"
                                  class="link-dark"
                                  @click="$emit('trackLink', distribution.licence.resource, 'link')">
                          {{ distribution.licence.title }}
                        </app-link>
                        <app-link :to="distribution.licence.resource"
                                  target="_blank"
                                  @click="$emit('trackLink', distribution.licence.resource, 'link')">
                          <font-awesome-icon class="fa fs-5 align-bottom text-dark" :icon="{ prefix: 'fas', iconName: 'info-circle' }"
                             data-bs-toggle="tooltip"
                             data-bs-placement="top"
                             :title="distribution.licence.description"></font-awesome-icon>
                        </app-link>
                        <app-link :to="distribution.licence.la_url"
                                  target="_blank"
                                  class="link-dark"
                                  @click="$emit('trackLink', distribution.licence.la_url, 'link')"
                                  v-if="showLicensingAssistant(distribution)">
                          {{ $t('message.distributionLicense.licensingAssistant') }}
                        </app-link>
                        <app-link :to="distribution.licence.la_url"
                                  target="_blank"
                                  @click="$emit('trackLink', distribution.licence.la_url, 'link')"
                                  v-if="showLicensingAssistant(distribution)">
                          <font-awesome-icon class="fa fs-5 text-dark" :icon="{ prefix: 'fas', iconName: 'external-link-alt' }"></font-awesome-icon>
                        </app-link>
                      </small>
                      <small class="text-muted" v-else>
                        {{ $t('message.distributionLicense.notProvided') }}
                      </small>
                    </span>
                    <span class="col-md-5 col-12 mt-2 text-end">
                      <span class="d-inline-block">
                        <small class="pr-1">{{ filterDateFormatEU(distribution.releaseDate) }}</small>
                      </span>
                      <app-link class="btn btn-sm btn-secondary p-0 px-2"
                        :path="getVisualisationLink(distribution.accessUrl)"
                        target="_blank"
                        @click="$emit('trackLink', getVisualisationLink(distribution.accessUrl), 'link')"
                        v-if="showVisualisationLink(distribution)">
                        <span class="px-2">{{ $t('message.datasetDetails.visualisation') }}</span>
                        <font-awesome-icon class="fa fs-5 float-right" :icon="{ prefix: 'fas', iconName: 'chart-bar' }"></font-awesome-icon>
                      </app-link>
                      <app-link class="btn btn-sm btn-secondary p-0 px-2"
                        :path="getGeoLink(distribution.format.title, distribution.id)"
                        target="_blank"
                        @click="$emit('trackLink', getGeoLink(distribution.format.title, distribution.id), 'link')"
                        v-if="showGeoLink(distribution)">
                        <span class="px-2">{{ $t('message.datasetDetails.geoVisualisation') }}</span>
                        <font-awesome-icon class="fa fs-5 float-right" :icon="{ prefix: 'fas', iconName: 'globe-americas' }"></font-awesome-icon>
                      </app-link>
                      <app-link class="btn btn-sm btn-secondary p-0 px-2"
                        :to="distribution.accessUrl"
                        target="_blank"
                        rel="dcat:distribution noopener"
                        matomo-track-download
                        @after-click="trackGoto"
                        v-if="showAccessUrl(distribution)">
                        <span class="px-2" property="dcat:mediaType" :content="getDistributionFormat(distribution)">{{ $t('message.datasetDetails.openResource') }}</span>
                        <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'external-link-alt' }"></font-awesome-icon>
                      </app-link>
                      <span v-if="showDownloadUrls(distribution)"
                        v-for="downloadURL in distribution.downloadUrls">
                        <app-link class="btn btn-sm btn-secondary p-0 px-2"
                          :to="downloadURL"
                          target="_blank"
                          matomo-track-download
                          @after-click="trackGoto">
                          {{ $t('message.datasetDetails.download') }}
                        </app-link>
                      </span>
                    </span>
                  </span>
                </span>
              </li>
              <hr>
            </div>
          </ul>
        </div>
      </div>

      <div class="mt-2 keywords"
           v-if="showKeywords(getKeywords)">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <span class="col-4 col-sm-3 col-md-2 mt-md-0 mt-3 mb-2 pr-0"
                    property="dcat:keyword"
                    v-for="(keyword, i) in getKeywords"
                    v-if="showKeyword(keyword)"
                    :content="keyword.title"
                    :key="i">
                <app-link :to="getKeywordLink(keyword)">
                  <small class="d-inline-block w-100 p-2 ml-1 rounded-pill text-center text-white bg-secondary"
                         :data-bs-toggle="keywordTruncated(keyword) ? 'tooltip' : false"
                         :data-bs-placement="keywordTruncated(keyword) ? 'top' : false"
                         :title="keywordTruncated(keyword) ? keyword.title : false">
                    {{ truncate(keyword.title, maxKeywordLength, false) }}
                  </small>
                </app-link>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 map"
           v-if="showSpatial(getSpatial)">
        <div class="row">
          <div class="col-1 my-auto pr-0 text-end"
               @click="toggleMap()">
            <span class="arrow text-secondary"
                  v-if="mapVisible" >
              <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'angle-up' }"></font-awesome-icon>
            </span>
            <span class="arrow text-secondary"
                  v-else>
              <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'angle-down' }"></font-awesome-icon>
            </span>
          </div>
          <div class="col-11">
            <h3 class="heading"
                @click="toggleMap()">{{ $t('message.datasetDetails.geoInfo') }}</h3>
          </div>
          <div class="col-12">
            <div id="collapse-geo-info"
                 ref="geocollapse"
                 class="collapse show">
              <div class="map">
                <map-basic width="100%"
                           height="400px"
                           :spatialType="getSpatial.type"
                           :spatialCoordinates="getSpatial.coordinates"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 info">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-1 my-auto pr-0 text-end"
                   @click="toggleInfo()">
                <span class="arrow text-secondary"
                      v-if="!infoVisible">
                  <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'angle-down' }"></font-awesome-icon>
                </span>
                <span class="arrow text-secondary" v-else>
                  <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'angle-up' }"></font-awesome-icon>
                </span>
              </div>
              <div class="col-11 py-2 bg-white">
                <h3 class="heading"
                    @click="toggleInfo()">{{ $t('message.datasetDetails.additionalInfo') }}</h3>
              </div>
              <div class="col-12"
                   v-if="infoVisible">
                <table class="table table-borderless table-responsive pl-3 bg-light">
                  <tr v-if="isArray(getLandingPages) && getLandingPages.length > 0">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.landingPage') }}</td>
                    <td>
                      <div v-for="(landingPage, i) of getLandingPages"
                           :key="i">
                        <app-link class="link-dark" :to="landingPage || ''">{{ landingPage }}</app-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getSources) && getSources.length > 0">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.sources') }}</td>
                    <td>
                      <div v-for="(source, i) of getSources"
                           :key="i">
                        <app-link class="link-dark" :to="source"
                           v-if="!isNil(source)">{{ source }}</app-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="!isNil(filterDateFormatEU(getReleaseDate))">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.created') }}</td>
                    <td>{{ filterDateFormatEU(getReleaseDate) }}</td>
                  </tr>
                  <tr v-if="!isNil(filterDateFormatEU(getModificationDate))">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.updated') }}</td>
                    <td>{{ filterDateFormatEU(getModificationDate) }}</td>
                  </tr>
                  <tr v-if="showSpatial(getSpatial)">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.spatial') }}</td>
                    <td>
                      <div>{{ $t('message.metadata.coordinates') }}: {{ getSpatial ? getSpatial.coordinates : '' }}</div>
                      <div v-if="has(getSpatial, 'type') && !isNil(getSpatial.type)">{{ $t('message.metadata.type') }}: {{ getSpatial ? getSpatial.type : '' }}</div>
                    </td>
                  </tr>
                  <tr v-if="isObject(getPublisher) &&
                            ( (has(getPublisher, 'name') && !isNil(getPublisher.name)) ||
                              (has(getPublisher, 'email') && !isNil(getPublisher.email)) ||
                              (has(getPublisher, 'resource')) && !isNil(getPublisher.resource) )">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.publisher') }}</td>
                    <td>
                      <div v-if="has(getPublisher, 'name') && !isNil(getPublisher.name)">{{ $t('message.metadata.name') }}: {{ getPublisher.name }}</div>
                      <div v-if="has(getPublisher, 'email') && !isNil(getPublisher.email)">{{ $t('message.metadata.email') }}: {{ getPublisher.email }}</div>
                      <div v-if="has(getPublisher, 'resource') && !isNil(getPublisher.resource)">{{ $t('message.metadata.resource') }}:
                        <app-link class="link-dark" :to="getPublisher.resource">{{ getPublisher.resource }}</app-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getContactPoints) && getContactPoints.length > 0">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.contactPoints') }}</td>
                    <td>
                      <div v-for="(contactPoint, i) in getContactPoints"
                           :key="i">
                        <div v-if="has(contactPoint, 'name') && !isNil(contactPoint.name)">{{ $t('message.metadata.name') }}: {{contactPoint.name}}</div>
                        <div v-if="has(contactPoint, 'email') && !isNil(contactPoint.email)">{{ $t($t('message.metadata.email')) }}:
                          <app-link class="link-dark" :to="`mailto:${contactPoint.email}`">{{ contactPoint.email}}</app-link>
                        </div>
                        <div v-if="has(contactPoint, 'resource') && !isNil(contactPoint.resource)">{{ $t('message.metadata.resource') }}:
                          <app-link class="link-dark" :to="contactPoint.resource">{{ contactPoint.resource }}</app-link>
                        </div>
                        <br>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getConformsTo) && getConformsTo.length > 0">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.conformsTo') }}</td>
                    <td >
                      <div v-for="(conformTo, i) in getConformsTo"
                           :key="i">
                        <div v-if="has(conformTo, 'title') && !isNil(conformTo.title)">{{ $t('message.metadata.title') }}: {{ conformTo.title}}</div>
                        <div v-if="has(conformTo, 'resource') && !isNil(conformTo.resource)">{{ $t('message.metadata.resource') }}:
                          <app-link class="link-dark" :to="conformTo.resource">{{ conformTo.resource }}</app-link>
                        </div>
                        <br>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getProvenances) && getProvenances.length > 0">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.provenances') }}</td>
                    <td>
                      <div v-for="(provenance, i) in getProvenances"
                           :key="i">
                        <div v-if="has(provenance, 'label') && !isNil(provenance.label)">{{ $t('message.metadata.label') }}: {{ provenance.label }}</div>
                        <div v-if="has(provenance, 'resource') && !isNil(provenance.resource)">{{ $t('message.metadata.resource') }}:
                          <app-link class="link-dark" :to="provenance.resource">{{ provenance.resource }}</app-link>
                        </div>
                        <br>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getRelatedResources) && getRelatedResources.length > 0">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.relatedResources') }}</td>
                    <td>
                      <div v-for="(resource, i) of getRelatedResources"
                           :key="i"
                           v-if="!isNil(resource)">
                        <app-link class="link-dark" :to="resource">{{ resource }}</app-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getIdentifiers) && getIdentifiers.length > 0">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.identifiers') }}</td>
                    <td>
                      <div v-for="(identifier, i) of getIdentifiers"
                           :key="i"
                           v-if="!isNil(identifier)">
                        {{ identifier }}
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getOtherIdentifiers) && getOtherIdentifiers.length > 0">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.otherIdentifiers') }}</td>
                    <td>
                      <div v-for="(identifier, i) of getOtherIdentifiers"
                           :key="i"
                           v-if="!isNil(identifier)">
                        {{ identifier }}
                      </div>
                    </td>
                  </tr>
                  <tr v-if="isArray(getDocumentations) && getDocumentations.length > 0">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.documentations') }}</td>
                    <td>
                      <div v-for="(documentation, i) of getDocumentations"
                           :key="i"
                           v-if="!isNil(documentation)">
                        <app-link class="link-dark" :to="documentation">{{ documentation }}</app-link>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="has(getFrequency, 'title') && !isNil(getFrequency.title)">
                    <td class="w-25 font-weight-bold">{{ $t('message.metadata.frequency') }}</td>
                    <td>
                      <div>{{ getFrequency.title }}</div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Actions and Getters from Store Module
import { mapActions, mapGetters } from 'vuex';
// import helper functions
import {
  has,
  isNil,
  isArray,
  isObject,
} from 'lodash';
// import nested components
import MapBasic from './MapBasic';
import AppLink from './AppLink';
// import filters
import dateFilters from '../filters/dateFilters';
import { getTranslationFor, getCountryFlagImg, truncate } from '../utils/helpers';
/* The maximum length of a keyword */
const MAX_KEYWORD_LENGTH = 10;

export default {
  name: 'peacockDatasetDetailsDataset',
  dependencies: 'DatasetService',
  components: {
    appLink: AppLink,
    mapBasic: MapBasic,
  },
  data() {
    return {
      loadingDatasetDetails: false,
      dateIncorrect: false,
      machineTranslated: false,
      translationUpdateProcessing: false,
      translationNotAvailable: false,
      mapVisible: true,
      infoVisible: false,
      visualisationLinkFormats: [
        'csv',
        'xlsx',
        'xls',
      ],
      geoLinkFormats: {
        wms: 'WMS',
        geojson: 'GeoJSON',
      },
      maxKeywordLength: MAX_KEYWORD_LENGTH,
    };
  },
  computed: {
    // import store-getters
    ...mapGetters('datasetDetails', [
      'getCatalog',
      'getCategories',
      'getConformsTo',
      'getContactPoints',
      'getCountry',
      'getDescription',
      'getDistributions',
      'getDistributionFormats',
      'getDocumentations',
      'getFrequency',
      'getID',
      'getIdentifiers',
      'getIdName',
      'getKeywords',
      'getLandingPages',
      'getLanguages',
      'getLicences',
      'getLoading',
      'getModificationDate',
      'getOriginalLanguage',
      'getOtherIdentifiers',
      'getProvenances',
      'getPublisher',
      'getRelatedResources',
      'getReleaseDate',
      'getSources',
      'getSpatial',
      'getTranslationMetaData',
      'getTitle',
    ]),
  },
  methods: {
    // import store-actions
    ...mapActions('datasetDetails', [
      'loadDatasetDetails',
      'setLoading',
      'useService',
    ]),
    // Lodash has function
    has,
    isNil,
    isArray,
    isObject,
    getTranslationFor,
    getCountryFlagImg,
    truncate,
    filterDateFormatUS(date) {
      return dateFilters.formatUS(date);
    },
    filterDateFormatEU(date) {
      return dateFilters.formatEU(date);
    },
    filterDateFromNow(date) {
      return dateFilters.fromNow(date);
    },
    showOriginalLanguage(originalLanguage) {
      return !isNil(originalLanguage);
    },
    getDatasetOriginalLanguage(originalLanguage) {
      return { query: Object.assign({}, this.$route.query, { locale: originalLanguage }) };
    },
    setDatasetOriginalLanguage(originalLanguage) {
      this.$i18n.locale = originalLanguage;
    },
    getDistributionFormat(distribution) {
      return has(distribution, 'format.title') && !isNil(distribution.format.title) ? distribution.format.title : '';
    },
    distributionFormatTruncated(distribution) {
      return this.getDistributionFormat(distribution).length > 4;
    },
    getDistributionTitle(distribution) {
      return distribution.title ? getTranslationFor(distribution.title, this.$i18n.locale, this.getLanguages) : '-';
    },
    getDistributionDescription(distribution) {
      return (has(distribution, 'description') && !isNil(distribution.description)) ? getTranslationFor(distribution.description, this.$i18n.locale, this.getLanguages) : '-';
    },
    showLicence(distribution) {
      return (has(distribution, 'licence.title') && !isNil(distribution.licence.title))
          || (has(distribution, 'licence.resource') && !isNil(distribution.licence.resource));
    },
    showLicensingAssistant(distribution) {
      return has(distribution, 'licence.la_url') && !isNil(distribution.licence.la_url);
    },
    showOptionsDropdown(distribution) {
      return this.showVisualisationLink(distribution) || this.showGeoLink(distribution);
    },
    showVisualisationLink(distribution) {
      if (!has(distribution, 'format.title') || isNil(distribution.format.title) || !has(distribution, 'accessUrl') || isNil(distribution.accessUrl)) return false;
      const f = distribution.format.title.toLowerCase();
      // Show VisualisationLink only for formats included in visualisationLinkFormats
      return this.visualisationLinkFormats.includes(f);
    },
    getVisualisationLink(accessUrl) {
      // Return Visualisation Link
      return `/data/visualisation/?file=${accessUrl}`;
    },
    showGeoLink(distribution) {
      if (!has(distribution, 'format.title') || isNil(distribution.format.title) || !has(distribution, 'id') || isNil(distribution.id)) return false;
      const f = distribution.format.title.toLowerCase();
      // Show GeoLink only for formats included in geoLinkFormats
      return Object.keys(this.geoLinkFormats).includes(f);
    },
    getGeoLink(format, distributionID) {
      let f = format.toLowerCase();
      // Use correct Case Sensitive strings
      f = this.geoLinkFormats[f];
      // Return Geo Visualisation Link
      return `/mapapps/?lang=en&type=${f}&dataset=${distributionID}`;
    },
    showDownloadDropdown(distribution) {
      return this.showAccessUrl(distribution) || this.showDownloadUrls(distribution);
    },
    showAccessUrl(distribution) {
      return has(distribution, 'accessUrl') && !isNil(distribution.accessUrl);
    },
    showDownloadUrls(distribution) {
      return has(distribution, 'downloadUrls') && !isNil(distribution.downloadUrls) && isArray(distribution.downloadUrls) && distribution.downloadUrls.length > 0;
    },
    setClipboard(value) {
      const input = document.createElement('INPUT');
      // input.style = "position: absolute; left: -1000px; top: -1000px";
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    },
    showKeywords(keywords) {
      return !isNil(keywords) && keywords.length > 0;
    },
    showKeyword(keyword) {
      return !isNil(keyword) && has(keyword, 'id') && has(keyword, 'title');
    },
    getKeywordLink(keyword) {
      return { path: `/datasets?keywords=${keyword.id}`, query: Object.assign({}, { locale: this.$route.query.locale }) };
    },
    keywordTruncated(keyword) {
      return keyword.title.length > this.maxKeywordLength;
    },
    showSpatial(spatial) {
      return !isNil(spatial) && has(spatial, 'coordinates') && !isNil(spatial.coordinates) && has(spatial, 'type') && !isNil(spatial.type);
    },
    toggleMap() {
      this.$refs.geocollapse.classList.toggle('show');
      this.mapVisible = !this.mapVisible;
    },
    toggleInfo() {
      this.infoVisible = !this.infoVisible;
    },
    setTranslationBanners() {
      if (!this.$i18n) return;
      const translationMetaData = this.getTranslationMetaData;
      // Check if translation of dataset is available in selected language
      if (!isNil(translationMetaData.details) && has(translationMetaData.details, this.$i18n.locale)) {
        // Check if dataset if machine translated
        this.machineTranslated = translationMetaData.details[this.$i18n.locale].machine_translated;
      } else {
        // No translation of this dataset available for the selected language
        this.translationNotAvailable = true;
      }
      // Check if updated translation of dataset is processing
      if (translationMetaData.status === 'processing') this.translationUpdateProcessing = true;
    },
    // Emit a Matomo event when user clicks on 'go to resource' element
    trackGoto() {
      // eslint-disable-next-line
      const paq = window._paq || [];
      paq.push(['trackEvent', 'GoToResource', 'Clicked']);
    },
  },
  created() {
    this.useService(this.DatasetService);
    this.$nextTick(() => {
      this.$Progress.start();
      this.loadingDatasetDetails = true;
      this.loadDatasetDetails(this.$route.params.ds_id)
        .then(() => {
          this.$Progress.finish();
          this.loadingDatasetDetails = false;
          this.$nextTick(() => {
            // Display/hide translation banners
            this.setTranslationBanners();
          });
        })
        .catch(() => {
          this.$Progress.fail();
          this.$router.replace({ name: 'NotFound', params: { 0: '/' } });
        });
    });

    this.$root.$on('date-incorrect', () => {
      this.dateIncorrect = true;
    });
  },
  destroyed() {
    this.$root.$off('date-incorrect');
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';

  .heading, .arrow, .copy-text {
    cursor: pointer;
  }

  /*** BOOTSTRAP ***/
  button:focus {
    outline:0;
  }
  .options, .download {
    .dropdown-menu {
      min-width: 300px;
      .dropdown-item {
        &:hover {
          color: initial;
          background-color: initial;
        }
      }
    }
  }
</style>