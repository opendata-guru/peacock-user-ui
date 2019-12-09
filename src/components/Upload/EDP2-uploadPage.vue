<!--  Represents the 'Upload' page. -->
<template>
  <div class="mb-5">
    <div class="row">
      <uploadPageTop :activeStep="activeStep"></uploadPageTop>
    </div>
    <div class="row">
      <!-- Step 1 -->
      <upload-page-dataset-details v-if="getStep === 1"></upload-page-dataset-details>
      <!-- Step 2 -->
      <upload-page-distributions v-if="getStep === 2"></upload-page-distributions>
      <!-- Step 3 -->
      <upload-page-upload v-if="getStep === 3"></upload-page-upload>
      <!-- Step 4 -->
      <upload-page-review v-if="getStep === 4"></upload-page-review>
      <!-- End of Steps -->
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  import { mapActions, mapGetters } from 'vuex';
  import UploadPageTop from './EDP2-uploadPage-top';
  import UploadPageDatasetDetails from './EDP2-uploadPage-datasetDetails';
  import UploadPageDistributions from './EDP2-uploadPage-distributions';
  import UploadPageUpload from './EDP2-uploadPage-upload';
  import UploadPageReview from './EDP2-uploadPage-review';

  export default {
    name: 'Upload',
    components: {
      uploadPageTop: UploadPageTop,
      uploadPageDatasetDetails: UploadPageDatasetDetails,
      uploadPageDistributions: UploadPageDistributions,
      uploadPageUpload: UploadPageUpload,
      uploadPageReview: UploadPageReview,
    },
    data() {
      return {};
    },
    props: {
      activeStep: {
        type: Number,
        default: 1,
      },
    },
    computed: {
      ...mapGetters('upload', [
        'getStep',
      ]),
    },
    methods: {
      ...mapActions('upload', [
        'setStep',
      ]),
    },
    created() {
      // Set Step to 1 initially
      return this.setStep(1);
    },
  };
</script>

<style lang='scss'>
  .breadcrumb-item a {
    color: black !important;
    font-size: 18px !important;
  }

  .active {
    font-weight: bold !important;
  }

  .heading, .arrow {
    cursor: pointer;
  }

  .circle {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    padding: 20px 0;
    font-size: 12px;
    line-height: 1px;
    border-radius: 50%;
    background-color: #000000;
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
</style>
