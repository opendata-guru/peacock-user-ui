/** A component to wrap all components that should be present in the HTML-header
    note: When naming this component 'Header' instead of 'Top' the page will break.
    Native HTML-Tag names are not allowed for Vue components. **/

<template>
  <header>
    <nav class="navbar-container navbar-dark bg-primary mb-3 border-bottom">
      <div class="content-wrapper navbar navbar-expand-sm">
        <app-link class="navbar-brand d-inline-block" :to="{ path: '/'}">
          <div v-for="(image, imageIndex) in images" class="project-title-container">
            <img v-if="image.src" :src="image.src" class="piveau-logo" :title="image.description" :key="imageIndex">
            <span v-if="image.text">{{image.text}}</span>
          </div>
        </app-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li v-for="link in links" class="nav-item">
              <app-link v-if="!link.web" class="nav-link" :to="{ path: link.href }">
                {{ link.title }}
              </app-link>
              <app-link v-if="link.web" class="nav-link" :to="link.href">
                {{ link.title }}
              </app-link>
            </li>
          </ul>
        </div>
      </div>
      
    </nav>
  </header>
</template>

<script>
import AppLink from './AppLink';
import GLUE_CONFIG from '../../user-config/glue-config';

export default {
  name: 'top',
  components: {
    appLink: AppLink,
  },
  data() {
    const that = this;
    return {
      images: GLUE_CONFIG.images.headerLogos,
      links: GLUE_CONFIG.navigation.topnav.main.append.map(nav => ({
        title: that.$t(nav.title),
        href: nav.href,
        web: (nav.href.indexOf('http://') === 0) || (nav.href.indexOf('https://') === 0),
      })),
    };
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/bootstrap_theme';

  .navbar-container {
    .navbar {
      .project-title-container {
        margin-right: 2rem;
        position: inline-block;
        vertical-align: top;
        text-align: right;

        .piveau-logo {
            width: 120px;
          }
          .project-name {
          text-transform: uppercase;
          font-size: 0.8em;
          font-weight: bold;
          margin-top: -10px;
        }
      }

      .navbar-nav {
        font-size: 1.1rem;
        font-weight: bold;
        .nav-link.active {
          color: $white;
        }
      }
    }
  }
  

  .brand-name {
    line-height: 48px;
  }
</style>
