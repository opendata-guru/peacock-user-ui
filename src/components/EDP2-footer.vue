<template>
  <div class="edp2-footer">
    <edp2-footer-top></edp2-footer-top>
    <edp2-footer-bottom></edp2-footer-bottom>
  </div>
</template>

<script>
  import EDP2FooterTop from './EDP2-footerTop';
  import EDP2FooterBottom from './EDP2-footerBottom';

  export default {
    name: 'bottom',
    components: {
      edp2FooterTop: EDP2FooterTop,
      edp2FooterBottom: EDP2FooterBottom,
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../node_modules/bootstrap/scss/bootstrap.scss';
  body {
    font-size: 14px !important;
  }
</style>
