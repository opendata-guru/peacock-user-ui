<template>
  <app-link>
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-dark" id="deleteModalLabel">Are you sure you want to delete this item?</h5>
            <button type="button" class="close btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div v-if="error" class="modal-body">
              <div class="alert alert-danger w-100" role="alert">
                {{ error }}
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary btn-no" data-bs-dismiss="modal">No</button>
            <button type="button" v-on:click="deleteDataSet" data-bs-dismiss="modal" class="btn btn-secondary btn-yes">Yes</button>
          </div>
        </div>
      </div>
    </div>
    <button data-bs-toggle="modal" data-bs-target="#deleteModal" class="mt-1 btn btn-sm btn-outline-secondary delete">
      {{ $t('message.datasetDetails.delete') }}
    </button>
  </app-link>
</template>

<script>
// Import Actions and Getters from Store Module
import { mapGetters } from 'vuex';
// Import components used in template
import AppLink from './AppLink';
import { normalize } from '../utils/helpers';
/* eslint-disable */
export default {
  name: 'peacockDatasetDetailsDeleteButton',
  dependencies: ['uploadService', 'authService'],
  components: {
    appLink: AppLink,
  },
  data() {
    return {
      error: '',
      catalog: '',
    };
  },
  computed: {
    // import store-getters
    ...mapGetters('datasetDetails', [
      'getID',
      'getLanguages',
      'getTitle',
      'getCatalog',
    ]),
    ...mapGetters('auth', [
      'securityAuth'
    ]),
  },
  methods: {
    /* eslint-disable */
    deleteDataSet() {
      // normalizing dataset ID (as per torben jastrow 17/07/2019)
      let datasetId = this.normalize(this.getID);
      // delete dataset API call
      this.$Progress.start();
      this.authService.refreshToken(this.securityAuth).then((token) => {
        this.authService.getRTPToken(token).then((rtpToken) => {
          this.uploadService.deleteDistribution(datasetId, this.getCatalog.id, rtpToken.data.access_token).then((res) => {
            // redirect to home page
            this.$router.push({ name: 'Catalogues' });
            // this.$router.go(0);
            this.$Progress.finish();
            }).catch((err) => {
              this.error = `error : ${err.response.status} ${err.response.statusText}`;
              this.$Progress.fail();
          });
        });
      });
    },
    normalize,
  },
};
</script>

<style scoped>
</style>
