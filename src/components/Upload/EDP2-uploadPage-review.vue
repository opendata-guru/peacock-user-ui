<template>
  <div class="col-12">
    <div class="mb-3">
      <!-- TITLE -->
      <div class="mt-2">
        <div class="row">
          <div class="col-10 offset-1">
            <h3>{{ getTitle }}</h3>
          </div>
        </div>
      </div>
      <hr>
      <!-- DESCRIPTION -->
      <div class="mt-2">
        <div class="row">
          <div class="col-10 offset-1">
            <p>{{ getDescription }}</p>
          </div>
        </div>
      </div>
      <!-- DISTRIBUTIONS -->
      <div class="mt-2">
        <div class="row">
          <div class="col-12" v-if="getDistributions.length > 0">
            <div class="row mb-5">
              <div class="col-1 my-auto pr-0 text-right" @click="toggleDistributions()">
            <span class="arrow text-primary" v-if="!distributionsVisible">
              <i class="material-icons">keyboard_arrow_down</i>
            </span>
                <span class="arrow text-primary" v-else>
              <i class="material-icons">keyboard_arrow_up</i>
            </span>
              </div>
              <div class="col-10 py-2 text-left">
                <h3 class="heading" @click="toggleDistributions()">{{ $t('message.metadata.distributions') }} ( {{ getDistributions.length }} )</h3>
              </div>
              <div class="col-12" v-for="distribution in getDistributions" v-if="distributionsVisible">
                <!-- DISTRIBUTION -->
                <li class="row">
                  <span class="d-inline-block col-md-1 col-2 pr-md-1 pr-0 m-md-0 m-auto">
                    <div class="circle float-md-right text-center text-white text-truncate"
                         :type="distribution.format.substring(distribution.format.lastIndexOf('/') + 1)"
                         :title="distribution.format.substring(distribution.format.lastIndexOf('/') + 1)">
                      <span>{{ distribution.format.substring(distribution.format.lastIndexOf('/') + 1) }}</span>
                    </div>
                  </span>
                  <span class="col-10">
                    <span class="row">
                      <span class="d-inline-block col-12">
                        <h6 class="m-0">{{ distribution.title }}</h6>
                        <span class="mt-2 d-block text-muted text-truncate">
                          <small>
                            {{ distribution.description }}
                          </small>
                        </span>
                        <small class="mt-2 d-block">
                          <span class="font-weight-bold">
                            {{ $t('message.metadata.license') }} : {{ distribution.licence }}
                          </span>
                        </small>
                      </span>
                      <span class="col-md-5 col-12 mt-2 text-md-right text-left">
                      <span class="d-inline-block">
                        <small class="pr-1">{{ filterDateFormatEU(distribution.releaseDate) }}</small>
                      </span>
                      <span class="download dropdown d-inline-block"
                            v-if="showDownloadDropdown(distribution)">
                        <button class="btn btn-sm btn-primary p-0 pl-2 w-100"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                title="Download">
                          {{ $t('message.datasetDetails.download') }}
                          <i class="material-icons small-icon float-right align-bottom">keyboard_arrow_down</i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right bg-light">
                          <span class="dropdown-item px-3 text-right"
                                v-if="showAccessUrl(distribution)">
                            <app-link class="text-dark text-decoration-none"
                                      :to="distribution.accessUrl"
                                      target="_blank"
                                      rel="dcat:distribution noopener">
                              <small class="px-2" property="dcat:mediaType" :content="getDistributionFormat(distribution)">{{ $t('message.datasetDetails.openResource') }}</small>
                              <i class="material-icons align-bottom">open_in_new</i>
                            </app-link>
                            <i class="copy-text material-icons float-right align-bottom" @click="setClipboard(distribution.accessUrl)">file_copy</i>
                          </span>
                          <span class="dropdown-item d-block px-3 text-right"
                                v-if="showDownloadUrls(distribution)"
                                v-for="downloadURL in distribution.downloadUrls">
                            <input class="d-inline-block mr-2 py-0 px-1 w-75 small border border-secondary bg-white"
                                   type="text"
                                   :value="`${downloadURL}`">
                            <app-link class="text-dark text-decoration-none"
                                      :to="downloadURL"
                                      target="_blank">
                              <i class="material-icons align-bottom">open_in_new</i>
                            </app-link>
                            <i class="copy-text material-icons float-right align-bottom" @click="setClipboard(downloadURL)">file_copy</i>
                          </span>
                        </div>
                      </span>
                    </span>
                    </span>
                  </span>
                </li>
                <hr>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- KEYWORDS -->
      <div class="mt-2">
        <div class="row">
          <div class="col-10 offset-1">
            <div class="row">
              <span class="col-4 col-sm-3 col-md-2 mt-md-0 mt-3 pr-0" v-for="(keyword, i) in getKeywords" :key="i">
                <small class="d-inline-block w-100 p-2 ml-1 rounded-pill text-center text-white text-truncate bg-primary">
                  {{ keyword }}
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- INFO TABLE -->
      <div class="mt-2">
        <div class="row">
          <div class="col-1 my-auto pr-0 text-right" @click="toggleInfo()">
            <span class="arrow text-primary" v-if="!infoVisible">
              <i class="material-icons">keyboard_arrow_down</i>
            </span>
            <span class="arrow text-primary" v-else>
              <i class="material-icons">keyboard_arrow_up</i>
            </span>
          </div>
          <div class="col-10 py-2 bg-white">
            <h3 class="heading"
                @click="toggleInfo()">{{ $t('message.datasetDetails.additionalInfo') }}</h3>
          </div>
          <div class="col-10 offset-1"
               v-if="infoVisible">
            <table class="table table-borderless table-responsive pl-3 bg-light">
              <tr v-if="!isEmpty(getPublisherInfo.name) && !isEmpty(getPublisherInfo.homepage)">
                <td class="w-25 font-weight-bold">{{ $t('message.metadata.publisher') }}</td>
                <td>
                  <div v-if="has(getPublisherInfo, 'name') && !isNil(getPublisherInfo.name)">{{ $t('message.metadata.name') }}: {{ getPublisherInfo.name }}</div>
                  <div v-if="has(getPublisherInfo, 'homepage') && !isNil(getPublisherInfo.homepage)">{{ $t('message.metadata.homepage') }}: {{ getPublisherInfo.homepage }}</div>
                  <div v-if="has(getPublisherInfo, 'resource') && !isNil(getPublisherInfo.resource)">{{ $t('message.metadata.resource') }}:
                    <app-link :to="getPublisherInfo.resource">{{ getPublisherInfo.resource }}</app-link>
                  </div>
                </td>
              </tr>
              <tr v-if="!isEmpty(getContactInfo.name) && !isEmpty(getContactInfo.email)">
                <td class="w-25 font-weight-bold">{{ $t('message.metadata.contactPoints') }}</td>
                <td>
                    <div v-if="has(getContactInfo, 'name') && !isNil(getContactInfo.name)">{{ $t('message.metadata.name') }}: {{getContactInfo.name}}</div>
                    <div v-if="has(getContactInfo, 'email') && !isNil(getContactInfo.email)">{{ $t($t('message.metadata.email')) }}:
                      <app-link :to="`mailto:${getContactInfo.email}`">{{ getContactInfo.email}}</app-link>
                    </div>
                    <div v-if="has(getContactInfo, 'resource') && !isNil(getContactInfo.resource)">{{ $t('message.metadata.resource') }}:
                      <app-link :to="getContactInfo.resource">{{ getContactInfo.resource }}</app-link>
                    </div>
                    <br>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- PAGINATION -->
    <nav class="mt-5" aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <button class="btn page-link" tabindex="-1">{{ $t('message.pagination.previous') }}</button>
        </li>
        <li class="page-item">
          <button class="btn page-link" @click="next()">{{ $t('message.pagination.finish') }}</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  import { mapGetters, mapActions } from 'vuex';
  // import helper functions
  import {
    has,
    isNil,
    isArray,
    isObject,
  } from 'lodash';
  // import filters
  import dateFilters from '../../filters/dateFilters';
  import AppLink from '../AppLink';

  export default {
    name: 'Review',
    components: {
      appLink: AppLink,
    },
    data() {
      return {
        distributionsVisible: true,
        infoVisible: true,
        showPublisherInfo: false,
        showContractInfo: false,
      };
    },
    computed: {
      ...mapGetters('upload', [
        'getTitle',
        'getDescription',
        'getKeywords',
        'getCategory',
        'getDistributions',
        'getContactInfo',
        'getPublisherInfo',
        'getCatalogue',
      ]),
    },
    methods: {
      ...mapActions('upload', [
        'setStep',
        'resetUploadData',
      ]),
      // Lodash has function
      has,
      isNil,
      isArray,
      isObject,
      toggleDistributions() {
        this.distributionsVisible = !this.distributionsVisible;
      },
      toggleInfo() {
        this.infoVisible = !this.infoVisible;
      },
      isEmpty(str) {
        if (str === '') {
          return true;
        }
        return false;
      },
      next() {
        const catalog = this.getCatalogue;
        this.resetUploadData(null);
        // pushing route to dataset
        this.$router.push(`/datasets?catalog=${catalog}&showcataloguedetails=true`);
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
      getDistributionFormat(distribution) {
        return has(distribution, 'format.title') && !isNil(distribution.format.title) ? distribution.format.title : '';
      },
      filterDateFormatUS(date) {
        return dateFilters.formatUS(date);
      },
      filterDateFormatEU(date) {
        return dateFilters.formatEU(date);
      },
      filterDateFromNow(date) {
        return dateFilters.fromNow(date);
      },
    },
  };
</script>

<style lang="scss" scoped>

</style>
