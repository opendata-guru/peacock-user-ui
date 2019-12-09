<template>
  <app-link class="text-dark text-decoration-none"
            :to="to"
            target="_blank">
    <button class="btn btn-block text-left">
      Share on
      <font-awesome-icon class="ml-1 fa" :icon="icon"></font-awesome-icon>
    </button>
  </app-link>
</template>

<script>
  // Import components used in template
  import AppLink from './AppLink';

  export default {
    name: 'EDP2-datasetDetailsShareButton',
    components: {
      appLink: AppLink,
    },
    data() {
      return {};
    },
    props: {
      to: {
        type: String,
        default: '',
        required: true,
      },
      icon: {
        type: Object,
        default: '',
        required: true,
      },
    },
    computed: {
      url() { return window.location.href; },
    },
    methods: {},
  };
</script>

<style scoped>
</style>
