<template>
  <!-- Step Navigation -->
  <nav class="col-12" aria-label="breadcrumb">
    <ul class="breadcrumb justify-content-center">
      <li class="breadcrumb-item" :class="{'active': getStep === 1}">
        <a>{{ $t('message.metadata.dataset') }}</a>
      </li>
      <li class="breadcrumb-item" :class="{'active': getStep === 2}">
        <a>{{ $t('message.metadata.distributions') }}</a>
      </li>
      <li class="breadcrumb-item" :class="{'active': getStep === 3}">
        <a>{{ $t('message.metadata.upload') }}</a>
      </li>
      <li class="breadcrumb-item" :class="{'active': getStep === 4}">
        <a>{{ $t('message.metadata.review') }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'EDP2-uploadPage-top',
    components: {},
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
    watch: {
      activeStep: {
        handler(step) {
          this.setStep(step);
        },
      },
    },
    created() {
      this.setStep(this.activeStep);
    },
  };
</script>

<style scoped>

</style>
