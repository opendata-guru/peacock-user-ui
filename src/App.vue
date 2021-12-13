<template>
  <div class="site-wrapper">
    <vue-progress-bar></vue-progress-bar>
    <top/>
    <router-view class="content-wrapper" :key="$route.fullPath"></router-view>
    <bottom/>
  </div>
</template>

<script>
  import PeacockHeader from './components/PeacockHeader';

  // Code split footer since they are not in page view initially
  const PeacockFooter = () => import(/* webpackChunkName: "common" */'./components/PeacockFooter');

  export default {
    name: 'app',
    components: {
      top: PeacockHeader,
      bottom: PeacockFooter,
    },
    data() {
      return {
        tracker: null,
        matomoURL: this.$env.api.matomoUrl,
        lastRoute: null,
      };
    },
    mounted() {
      /* eslint-disable no-underscore-dangle */
      // Get Matomo
      window._paq = window._paq || [];
      this.tracker = window._paq;

      if (this.matomoURL) {
        (() => {
          const u = this.matomoURL;
          window._paq.push(['setTrackerUrl', `${u}matomo.php`]);
          window._paq.push(['setSiteId', '1']);
          const d = document;
          const g = d.createElement('script');
          const s = d.getElementsByTagName('script')[0];
          g.type = 'text/javascript';
          g.async = true;
          g.defer = true;
          g.src = `${u}matomo.js`;
          s.parentNode.insertBefore(g, s);
        })();
      }
    },
    watch: {
      // eslint-disable-next-line no-unused-vars
      $route(to, from) {
        // Help Matomo track new page views.
        // Also gets triggered on initial page load.

        // router-link somehow makes this watcher trigger twice; Once immediately after the click
        // and once after the new view has loaded.
        // This is a workaround to prevent tracking the same route full path twice.
        if (to.fullPath !== this.lastRoute) {
          // Get url
          let protocol = window.location.protocol;
          if (protocol.slice(-1) !== ':') {
            protocol += ':';
          }

          const router = this.$router;
          const hashMode = router.mode === 'hash' ? '/#' : '';
          // eslint-disable-next-line no-undef
          let basePath = router.options.base;
          basePath = basePath.slice(-1) === '/' ? basePath.slice(0, -1) : basePath;

          const url = `${protocol}//${window.location.host}${basePath}${hashMode}${to.fullPath}`;

          window._paq.push(['setCustomUrl', url]);
          window._paq.push(['trackPageView']);
          this.lastRoute = to.fullPath;
        }
      },
    },
  };
</script>

<style lang="scss">
  // Normalizes default css rules. See: https://github.com/necolas/normalize.css
  @import './styles/utils/normalize.css';

  * {
    box-sizing: border-box;
  }

  .site-wrapper {
    //border: 1px solid #83b4c2;
    // margin: auto;
    //box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    .content-wrapper {
      position: relative;
      max-width: 984px;
      margin: auto
    }
  }
</style>
