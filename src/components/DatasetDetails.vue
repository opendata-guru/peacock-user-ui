<template>
  <div class="dataset-details container-fluid mb-3">
    <nav class="nav nav-tabs mb-3">
      <div class="nav-item">
        <button class="nav-link" :class="{'active': (activeTab === 0)}" @click="activeTab = 0">Dataset</button>
      </div>
      <div class="nav-item">
        <button class="nav-link" :class="{'active': (activeTab === 1)}" @click="activeTab = 1">Categories</button>
      </div>
      <div class="nav-item">
        <button class="nav-link" :class="{'active': (activeTab === 2)}" @click="activeTab = 2">Similar Datasets</button>
      </div>
      <div class="nav-item">
        <button class="nav-link" :class="{'active': (activeTab === 3)}" @click="activeTab = 3">Activity Stream</button>
      </div>
      <div class="nav-item dropdown">
        <button class="nav-link btn-settings"
                data-bs-toggle="dropdown">
          <i class="material-icons text-dark">settings</i>
        </button>
        <div class="dropdown-menu">
          <button class="dropdown-item">Edit</button>
          <button class="dropdown-item">Personalize</button>
          <button class="dropdown-item">Report Issue</button>
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col-8">
        <div class="alert alert-warning" role="alert">
          <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          The title and description of this dataset are machine translated.<br/>
          Original language: <strong>Portugese</strong><br/>
          <button class="alert-link font-weight-light btn btn-link btn-sm p-0" @click="console.log('@CLICKED ALERT LINK')">Click here to see the dataset in the original language.</button>
        </div>
        <h3 class="card-title">{{ getTitle['en'] }}</h3>
        <div class="card">
          <a class="bg-primary d-flex justify-content-start" data-bs-toggle="collapse" href="#collapseOne" role="button" aria-expanded="false" aria-controls="collapseExample">
            <div class="card-header">
              <h5 class="card-title text-white mb-0">
                {{ $t('message.metadata.description') }}
              </h5>
            </div>
          </a>
          <div id="collapseOne" class="collapse">
            <div class="description card-body">
              <p>{{ getDescription['en'] || '-' }}</p>
            </div>
          </div>
        </div>
        <div class="card">
          <a class="bg-primary d-flex justify-content-start" data-bs-toggle="collapse" href="#collapse-geo-info" role="button" aria-expanded="false" aria-controls="collapseExample">
            <div class="card-header">
              <h5 class="card-title text-white mb-0">
                {{ $t('message.metadata.geoInfo') }}
              </h5>
            </div>
          </a>
          <div id="collapse-geo-info" ref="geocollapse" class="collapse show">
            <div class="map card-body">
              <map-basic width="100%" height="400px" :bounds="[[52.27, 12.91], [52.77, 13.91]]"/>
            </div>
          </div>
        </div>
        <section class="distributions card border-0 mt-3">
          <h4 class="card-header border-0 bg-transparent">{{ getDistributions.length }} Distributions</h4>
          <data-info-box class="" v-for="(distribution, i) in getDistributions"
                         :collapse="true"
                         :collapse-id="i"
                         :key="distribution.id"
                         :link-to="`distributions/${distribution.id}`"
                         :description="distribution.description ? distribution.description['en'] : '-'"
                         :title="distribution.title ?  distribution.title['en'] : '-'"
                         :footer-tags="distribution.format ? [distribution.format.title] : []"
                         :footer-link="{
                          title: $t('message.distributions.footerLink'),
                          url: distribution.downloadUrls ? distribution.downloadUrls[0] : '',
                          target: '_blank',
                         }"
                         :feature-indicators="getFeatureIndicators(distribution)"
                         :metadata="{
                                    releaseDate: {
                                      title: $t('message.metadata.created'),
                                      value: filterDateFormatEU(distribution.releaseDate),
                                    },
                                    modificationDate: {
                                      title: $t('message.metadata.updated'),
                                      value: filterDateFormatEU(distribution.modificationDate),
                                    },
                                  }">
          </data-info-box>
        </section>
      </div>
      <div class="col-4">
        <aside class="metadata card">
          <div class="card-body">
            <slot name="metadata-slot"
                  :categories="getCategories"
                  :description="getDescription"
                  :distributions="getDistributions"
                  :distributionFormats="getDistributionFormats"
                  :id="getID"
                  :idName="getIdName"
                  :language="getLanguage"
                  :license="getLicense"
                  :modificationDate="getModificationDate"
                  :organization="getPublisher"
                  :releaseDate="getReleaseDate"
                  :tags="getKeywords"
                  :title="getTitle">
              <dl>
                <!--<dt>{{ $t('message.metadata.publisher') }}</dt>-->
                <img class="organization-image mb-3"
                     :src="getPublisher.image_url || 'https://www.europeandataportal.eu/data/img/flags/pt.png' || require('../assets/img/img-not-available.png')"
                     :alt="`An Image representing ${getPublisher.name}`"
                     style="width: 100%; height: auto"/>
                <dd class=""><strong>{{ getPublisher.name|| '-' }}</strong></dd>
                <dd><em>{{ getPublisher.type || '-' }}</em></dd>
                <hr>
                <!--<dt>{{ $t('message.metadata.license') }}</dt>-->
                <!--<dd>{{ getLicense|| '-' }}</dd>-->
                <dt>{{ $t('message.metadata.created') }}</dt>
                <dd>{{ filterDateFormatEU(getReleaseDate) }}</dd>
                <dt>{{ $t('message.metadata.updated') }}</dt>
                <dd>{{ filterDateFormatEU(getModificationDate) }}</dd>
                <dt>{{ $t('message.metadata.tags') }}</dt>
                <dd class="badge badge-secondary mr-1" v-for="keyword in getKeywords">{{ keyword.title }}</dd>
              </dl>
              <hr>
              <div>
                Followers<br/>
                <span class="text-large"><strong>{{ followers }}</strong></span><br/>
                <button class="btn btn-success"
                        v-if="!following"
                        @click="follow()">
                  <i class="material-icons icon-follow mr-1">add_circle</i>
                  Follow
                </button>
                <button class="btn btn-danger"
                        v-if="following"
                        @click="unfollow()">
                  <i class="material-icons icon-follow mr-1">remove_circle</i>
                  Unfollow
                </button>
              </div>
              <hr>
              <div class="d-flex justify-content-between">
                <button class="btn btn-secondary btn-brand brand-google">
                  <font-awesome-icon :icon="['fab', 'google-plus-g']"></font-awesome-icon>
                </button>
                <button class="btn btn-secondary btn-brand brand-facebook">
                  <font-awesome-icon :icon="['fab', 'facebook-f']"></font-awesome-icon>
                </button>
                <button class="btn btn-secondary btn-brand brand-instagram">
                  <font-awesome-icon :icon="['fab', 'instagram']"></font-awesome-icon>
                </button>
                <button class="btn btn-secondary btn-brand brand-twitter">
                  <font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon>
                </button>
              </div>
            </slot>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
  // import Actions and Getters from Store Module
  import { mapActions, mapGetters } from 'vuex';
  // import nested components
  import DataInfoBox from './PeacockDataInfoBox';
  import MapBasic from './MapBasic';
  // import filters
  import dateFilters from '../filters/dateFilters';

  export default {
    name: 'datasetDetails',
    dependencies: 'DatasetService',
    components: {
      dataInfoBox: DataInfoBox,
      mapBasic: MapBasic,
    },
    data() {
      return {
        following: false,
        followers: 17,
        activeTab: 0,
      };
    },
    computed: {
      // import store-getters
      ...mapGetters('datasetDetails', [
        'getCategories',
        'getDescription',
        'getDistributions',
        'getDistributionFormats',
        'getID',
        'getIdName',
        'getLanguage',
        'getLicense',
        'getModificationDate',
        'getPublisher',
        'getReleaseDate',
        'getKeywords',
        'getTitle',
      ]),
      isMapVisible() {
        if (this.$refs.geocollapse) {
          return this.$refs.geocollapse.classList.contains('show');
        }
        return false;
      },
    },
    methods: {
      // import store-actions
      ...mapActions('datasetDetails', [
        'loadDatasetDetails',
        'useService',
      ]),
      filterDateFormatUS(date) {
        return dateFilters.formatUS(date);
      },
      filterDateFormatEU(date) {
        return dateFilters.formatEU(date);
      },
      filterDateFromNow(date) {
        return dateFilters.fromNow(this.$i18n, date);
      },
      follow() {
        this.following = true;
        this.followers += 1;
      },
      unfollow() {
        this.following = false;
        this.followers -= 1;
      },
      getFeatureIndicators(distribution) {
        const featureIndicators = [];
        if (distribution.urlType === 'datastore') featureIndicators.push('show_chart');

        return featureIndicators;
      },
    },
    watch: {},
    created() {
      this.useService(this.DatasetService);
      this.$nextTick(() => {
        this.$Progress.start();
        this.loadDatasetDetails(this.$route.params.ds_id)
          .then(() => {
            this.$Progress.finish();
          })
          .catch(() => {
            this.$Progress.fail();
          });
      });
    },
    mounted() {
    },
  };
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';

  .text-large {
    font-size: 150%;
  }

  .icon-follow {
    vertical-align: middle;
    margin: 0 0 .1em 0;
  }

  .btn-brand {
    border-radius: 100px;
    width: 50px;
    height: 50px;
    font-size: 1.2em;
    filter: grayscale(50%);
    &:hover {
      filter: grayscale(0%);
      transition: filter 200ms linear;
    }
  }

  .brand-google {
    background-color: #db4437;
    border-color: #db4437;
  }
  .brand-google:hover {
    background-color: #db4437;
    border-color: #db4437;
  }
  .brand-facebook {
    background-color: #3b5998;
    border-color: #3b5998;
  }
  .brand-facebook:hover {
    background-color: #3b5998;
    border-color: #3b5998;
  }
  .brand-instagram {
    background-color: #c32aa3;
    border-color: #c32aa3;
  }
  .brand-instagram:hover {
    background-color: #c32aa3;
    border-color: #c32aa3;
  }
  .brand-twitter {
    background-color: #1da1f2;
    border-color: #1da1f2;
  }
  .brand-twitter:hover {
    background-color: #1da1f2;
    border-color: #1da1f2;
  }

  button.nav-link:hover {
    cursor: pointer;
  }

  .btn-settings {
    height: 42px;
  }
</style>
