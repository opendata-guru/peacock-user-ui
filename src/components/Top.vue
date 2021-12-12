/** A component to wrap all components that should be present in the HTML-header
    note: When naming this component 'Header' instead of 'Top' the page will break.
    Native HTML-Tag names are not allowed for Vue components. **/

<template>
  <header class="mb-3 border-bottom">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">

        <app-link class="navbar-brand" :to="{ path: '/'}">
          <div v-for="(image, imageIndex) in images"
            class="project-title-container"
            v-bind:key="imageIndex"
          >
            <img v-if="image.src" :src="image.src"
              class="d-inline-block align-text-top app-logo"
              height="24"
              :title="image.description"
              :key="imageIndex"
            >
            <span v-if="image.text">{{image.text}}</span>
          </div>
        </app-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li v-for="(link, linkIndex) in links"
              class="nav-item"
              v-bind:key="linkIndex"
            >
              <app-link class="nav-link" :to="link.web ? link.href : { path: link.href }">
                {{ link.title }}
              </app-link>
            </li>
          </ul>

          <span v-if="$env.keycloak.enableLogin" class="navbar-text">
            <a v-if="!authenticated" v-on:click="login()" class="btn btn-outline-dark login">{{ $t('message.header.subnav.login') }}</a>
            <a v-if="authenticated" v-on:click="logout()" class="btn btn-outline-dark login">{{ $t('message.header.subnav.logout') }}</a>
          </span>
          <span v-if="showLanguageSwitch" class="navbar-text">
            <language-selector></language-selector>
          </span>

        </div>

      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppLink from './AppLink';
import LanguageSelector from './LanguageSelector';
import GLUE_CONFIG from '../../user-config/glue-config';

export default {
  name: 'top',
  components: {
    languageSelector: LanguageSelector,
    appLink: AppLink,
  },
  dependencies: 'authService',
  data() {
    const that = this;
    return {
      authenticated: false,
      images: GLUE_CONFIG.images.headerLogos,
      links: GLUE_CONFIG.navigation.topnav.main.append.map(nav => ({
        title: that.$t(nav.title),
        href: nav.href,
        web: (nav.href.indexOf('http://') === 0) || (nav.href.indexOf('https://') === 0),
      })),
      showLanguageSwitch: false,
    };
  },
  computed: {
    ...mapGetters('auth', [
      'securityAuth',
    ]),
    isAuthenticated() {
      return this.authService.isAuthenticated(this.securityAuth);
    },
  },
  methods: {
    ...mapActions('auth', [
      'authLogout',
    ]),
    login() {
      if (this.$env.keycloak.enableLogin) {
        this.authService.init(this.$router);
      }
    },
    logout() {
      this.$Progress.start();
      this.authService.logout(this.securityAuth, 'window.location.origin');
      this.authLogout();
      this.$Progress.finish();
    },
  },
  watch: {
    isAuthenticated() {
      this.authenticated = this.authService.isAuthenticated(this.securityAuth);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
