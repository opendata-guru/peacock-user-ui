<template>
  <div class="mt-1 mb-4">
    <div class="row">
      <div class="col-12 text-end">
        <datasetDetailsEditButton v-if="authenticated"></datasetDetailsEditButton>
        <datasetDetailsDeleteButton v-if="authenticated"></datasetDetailsDeleteButton>
        <datasetDetailsMetadataButton v-if="showFavorites"></datasetDetailsMetadataButton>
        <button v-if="showFavorites"
          type="button"
          class="btn btn-sm btn-secondary mt-1"
          @click="onFavorites"
        >
          <i v-if="favorite === true" class="material-icons fs-6 align-text-bottom">favorite</i>
          <i v-if="favorite !== true" class="material-icons fs-6 align-text-bottom">favorite_border</i>
        </button>
        <datasetDetailsFeedbackButton></datasetDetailsFeedbackButton>
        <div class="d-inline dropdown">
          <a class="mt-1 btn btn-sm btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <!--<i class="material-icons small-icon align-bottom text-dark">share</i>-->
            Share Dataset
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <datasetDetailsShareButton class="dropdown-item" :to="`https://www.facebook.com/sharer.php?u=${url}`" :icon="{ prefix: 'fab', iconName: 'facebook-f' }"></datasetDetailsShareButton>
            <datasetDetailsShareButton class="dropdown-item" :to="`https://twitter.com/intent/tweet?url=${url}`" :icon="{ prefix: 'fab', iconName: 'twitter' }"></datasetDetailsShareButton>
            <datasetDetailsShareButton class="dropdown-item" :to="`https://www.linkedin.com/shareArticle?mini=true&url=${url}`" :icon="{ prefix: 'fab', iconName: 'linkedin-in' }"></datasetDetailsShareButton>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <datasetDetailsNavigation></datasetDetailsNavigation>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-3">
        <datasetDetailsHeader></datasetDetailsHeader>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DatasetDetailsNavigation from './PeacockDatasetDetailsNavigation';
import DatasetDetailsFeedbackButton from './PeacockDatasetDetailsFeedbackButton';
import DatasetDetailsShareButton from './EDP2-datasetDetails-shareButton';
import DatasetDetailsHeader from './PeacockDatasetDetailsHeader';
import DatasetDetailsDeleteButton from './PeacockDatasetDetailsDeleteButton';
import DatasetDetailsEditButton from './PeacockDatasetDetailsEditButton';
import DatasetDetailsMetadataButton from './PeacockDatasetDetailsMetadataButton';
import AppLink from './AppLink';
import { decode } from '../utils/jwt';
import GLUE_CONFIG from '../../user-config/glue-config';

export default {
  name: 'peacockDatasetDetailsTop',
  dependencies: ['authService', 'DatasetService'],
  components: {
    datasetDetailsNavigation: DatasetDetailsNavigation,
    datasetDetailsFeedbackButton: DatasetDetailsFeedbackButton,
    datasetDetailsShareButton: DatasetDetailsShareButton,
    datasetDetailsDeleteButton: DatasetDetailsDeleteButton,
    datasetDetailsEditButton: DatasetDetailsEditButton,
    datasetDetailsMetadataButton: DatasetDetailsMetadataButton,
    datasetDetailsHeader: DatasetDetailsHeader,
    appLink: AppLink,
  },
  data() {
    return {
      rtpToken: '',
      catalogId: '',
      favorite: false,
      showFavorites: GLUE_CONFIG.enable.favorites.enable,
    };
  },
  computed: {
    // import store-getters
    ...mapGetters('auth', [
      'securityAuth',
      'getRTPToken',
    ]),
    ...mapGetters('datasetDetails', [
      'getCatalog',
    ]),
    // Returns true, if the authenticated user has update permissions on this particular dataset
    authenticated() {
      if (!this.getRTPToken) return false;
      if (!this.getCatalog.id) return false;

      const decodedRtpToken = this.decode(this.getRTPToken);

      const hasUpdatePermissions = decodedRtpToken.authorization.permissions.find((permission) => {
        if (this.getCatalog.id === permission.rsname.replace('https://europeandataportal.eu/id/catalogue/', '')) {
          return permission.scopes.find(scope => scope === 'update');
        }
        return false;
      });

      return !!hasUpdatePermissions;
    },
    url() { return window.location.href; },
  },
  created() { },
  props: {
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    // import store-actions
    ...mapActions('datasetDetails', [
      'loadDatasetDetails',
      'useService',
    ]),
    decode,
    onFavorites(e) {
      e.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';
</style>
