<template>
  <nav class="navbar navbar-expand-md mb-3"
       :class="{'navbar-light': theme === 'light','navbar-dark': theme === 'dark' || theme === 'primary',
       'bg-light': theme === 'light', 'bg-dark': theme === 'dark', 'bg-primary': theme === 'primary'}">
    <div class="navbar-brand">
      <app-link class="navbar-item"
         v-for="logo in logos"
         :to="logo.href ? logo.href : '#'"
         :target="logo.target ? logo.target : null"
         @click="logo.href ? null : $router.push({ path: `/home` })">
        <img class="navbar-logo"
             :src="logo.src"
             :alt="logo.description"
             :style="{ width: logo.width, height: logo.height }" />
      </app-link>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-start" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item" v-if="navigation.topnav.main.home.show">
          <app-link class="nav-link"
                    :to="navigation.topnav.main.home.href ? navigation.topnav.main.home.href : { name: `Home` }"
                    :target="navigation.topnav.main.home.target">
            <i class="material-icons" v-if="navigation.topnav.main.icons">home</i>
            <span>{{ $t('message.navigation.navItems.home') }}</span>
          </app-link>
        </li>
        <li class="nav-item" v-if="navigation.topnav.main.data.show">
          <app-link class="nav-link"
                    :to="navigation.topnav.main.data.href ? navigation.topnav.main.data.href : {name: 'Datasets'}">
            <i class="material-icons" v-if="navigation.topnav.main.icons">storage</i>
            {{ $t('message.navigation.navItems.data') }}
          </app-link>
        </li>
        <li class="nav-item"  v-if="navigation.topnav.main.maps.show">
          <app-link class="nav-link"
                    :to="navigation.topnav.main.maps.href ? navigation.topnav.main.maps.href : { name: `MapComp` }">
            <i class="material-icons" v-if="navigation.topnav.main.icons">map</i>
            {{ $t('message.navigation.navItems.map') }}
          </app-link>
        </li>
        <!-- ##### Append navigation items if configured in glue-config.js ##### -->
        <li class="nav-item appended" v-for="navitem in navigation.topnav.main.append">
          <app-link class="nav-link"
                    :to="navitem.href ? navitem.href: {name: 'Home'}"
                    :target="navitem.target">
            <i class="material-icons" v-if="navigation.topnav.main.icons">{{ navitem.icon }}</i>
            {{ navitem.title }}
          </app-link>
        </li>

        <!-- ##### Only visible in Hamburger navigation start#####-->
        <li class="nav-item d-md-none">
          <app-link class="nav-link"
                    :to="navigation.topnav.sub.imprint.href ? navigation.topnav.sub.imprint.href : { name: 'Imprint' }"
                    :target="navigation.topnav.sub.imprint.target">
            <i class="material-icons" v-if="navigation.topnav.main.icons">import_contacts</i>
            {{ $t('message.navigation.navItems.imprint') }}
          </app-link>
        </li>
        <li class="nav-item d-md-none">
          <app-link class="nav-link"
                    :to="navigation.topnav.main.privacyPolicy.href ? navigation.topnav.sub.privacyPolicy.href : { name: 'PrivacyPolicy' }">
            <i class="material-icons" v-if="navigation.topnav.main.icons">account_balance</i>
            {{ $t('message.navigation.navItems.privacyPolicy') }}
          </app-link>
        </li>
      </ul>
    </div>
    <!-- ##### Top-Right navigation items ##### -->
    <div class="collapse navbar-collapse justify-content-end">
      <ul class="navbar-nav">
        <li class="nav-item small" v-if="navigation.topnav.sub.privacyPolicy.show">
          <app-link class="nav-link"
                    :to="navigation.topnav.sub.privacyPolicy.href ? navigation.topnav.sub.privacyPolicy.href : { name: 'PrivacyPolicy' }">
            {{ $t('message.navigation.navItems.privacyPolicy') }}
          </app-link>
        </li>
        <li class="nav-item small" v-if="navigation.topnav.sub.imprint.show">
          <app-link class="nav-link"
                    :to="navigation.topnav.sub.imprint.href ? navigation.topnav.sub.imprint.href : { name: 'Imprint' }">
            {{ $t('message.navigation.navItems.imprint') }}
          </app-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import { glueConfig as GLUE_CONFIG } from '../../config/user-configs';
  import AppLink from './AppLink';

  export default {
    name: 'topnav',
    components: {
      appLink: AppLink,
    },
    data() {
      return {
        logos: GLUE_CONFIG.images.headerLogos,
        menuIsActive: false,
        navigation: GLUE_CONFIG.navigation,
        theme: GLUE_CONFIG.themes.header,
      };
    },
    computed: {
      /**
       * @description Returns the name of the current route.
       * @return {String}
       */
      currentRoute() {
        return this.$store.getters.getCurrentRoute;
      },
    },
    methods: {
    },
  };
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';

  .navbar {
    i {
      vertical-align: middle;
      margin: 0 0 .1em 0;
    }
    img {
      &.navbar-logo {
        height: 2.5rem;
        width: auto;
      }
    }
  }
</style>
