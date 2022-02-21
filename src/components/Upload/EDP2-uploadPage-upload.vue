<!-- @license Copyright 2022 Thomas Tursics
              SPDX-License-Identifier: Apache-2.0
-->

<template>
  <div class="col-12">
    <!-- ERROR MESSAGE -->
    <div class="row">
      <div class="col-10 offset-1">
        <div class="alert alert-danger w-100" role="alert" v-if="error">
          {{ error }}
        </div>
      </div>
    </div>

    <!-- UPLOAD -->
    <div class="row mb-3">
      <div class="col-1 my-auto pr-0 text-end" @click="toggleUpload()">
          <span class="arrow text-primary" v-if="!uploadVisible">
            <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'angle-down' }"></font-awesome-icon>
          </span>
          <span class="arrow text-primary" v-else>
            <font-awesome-icon class="fa fs-5" :icon="{ prefix: 'fas', iconName: 'angle-up' }"></font-awesome-icon>
          </span>
      </div>
      <div class="col-10 py-2 text-left">
        <h3 class="heading" @click="toggleUpload()">{{ $t('message.metadata.upload')}}</h3>
      </div>
      <div class="col-10 offset-1 mt-5" v-if="uploadVisible">
        <!-- LIST OF UPLOADED DISTRIBUTIONS -->
        <div class="mb-5" v-for="distribution in getAPIUploadData.distributions" :key="distribution.id">
          <div class="mb-2 align-baseline">
           <strong>{{ distribution.title ? distribution.title.en : '-' }}</strong>
          </div>
          <!-- CHOOSE FILE -->
          <div class="row mt-2">
            <div class="col-4 input-group">
              <label class="btn btn-default btn-outline-primary btn-lg mb-0 mr-5 py-3 choose-file">
                {{ $t('message.metadata.chooseFile') }} ...
                <input class="d-none" type="file" :name="distribution.id" v-on:change="handleFileUpload($event.target.name, $event.target.files, distribution)">
              </label>
            </div>
            <div class="col-8">
              <div class="alert mb-0 py-3" role="alert"
                   :class="{ 'alert-success': files[distribution.id]['uploadSuccess'], 'alert-danger': !files[distribution.id]['uploadSuccess']}"
                   v-if="!uploadProcessing && has(files, distribution.id) && has(files[distribution.id], 'fileName') && has(files[distribution.id], 'uploadSuccess')">
                <div class="d-inline-block text-truncate" style="width:90%">
                  <samp :key="files[distribution.id]['fileName']" v-if="has(files[distribution.id], 'fileName')">{{ files[distribution.id]['fileName'] }}</samp>
                </div>
                <font-awesome-icon v-if="files[distribution.id]['uploadSuccess']" class="fa fs-5 float-right" :icon="{ prefix: 'fas', iconName: 'check-circle' }"></font-awesome-icon>
                <font-awesome-icon v-else class="fa fs-5 float-right" :icon="{ prefix: 'fas', iconName: 'exclamation-circle' }"></font-awesome-icon>
              </div>
            </div>
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
          <button class="btn page-link" :disabled="!uploadFinished" @click="next()">{{ $t('message.pagination.next') }}</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  import { mapActions, mapGetters } from 'vuex';
  // import helper functions
  import { has } from 'lodash';

  export default {
    name: 'Upload',
    dependencies: ['uploadService', 'authService'],
    data() {
      return {
        error: '',
        files: {},
        uploadVisible: true,
        uploadProcessing: false,
      };
    },
    computed: {
      ...mapGetters('auth', [
        'securityAuth',
        'getRTPToken',
      ]),
      ...mapGetters('upload', [
        'getAPIUploadData',
      ]),
    },
    methods: {
      ...mapActions('upload', [
        'setStep',
      ]),
      has,
      toggleUpload() {
        this.uploadVisible = !this.uploadVisible;
      },
      uploadFinished() {
        let isUploadFinished = true;
        this.getAPIUploadData.distributions.forEach((distribution) => {
          if (!this.files[distribution.id].uploadSuccess) isUploadFinished = false;
        });
        return isUploadFinished;
      },
      handleFileUpload(fieldName, fileList, distribution) {
        // Start Loading Spinner
        this.uploadProcessing = true;
        // Display File Name and Response Status
        this.files[distribution.id] = {
          fileName: fileList[0].name,
          uploadSuccess: false,
        };
        console.log(fileList[0]);
        const formData = new FormData();
        formData.append('fname', fileList[0]);
        this.$Progress.start();
        this.authService.refreshToken(this.securityAuth).then((token) => {
          this.authService.getRTPToken(token).then((rtpToken) => {
            this.uploadService.uploadDistribution(distribution.upload_url, rtpToken.data.access_token, formData).then((response) => {
              this.$Progress.finish();
              // Finish Loading Spinner
              this.uploadProcessing = false;
              // Update Response Status
              this.files[distribution.id].uploadSuccess = response.status === 200;
            }).catch((err) => {
              if (err.response) {
                this.error = `error : ${err.response.status} ${err.response.statusText}`;
              } else {
                this.error = `error : ${err}`;
              }
              this.$Progress.fail();
            });
          });
        });
      },
      next() {
        // Navigate to Step 4
        this.setStep(4);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .choose-file, .alert {
    line-height: 1;
    font-size: 1rem;
  }
  .input-group-text {
    background-color: transparent;
    border: 0;
  }
</style>
