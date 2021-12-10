<!-- @license Copyright 2019 Fraunhofer FOKUS
              Modifications copyright 2021 Thomas Tursics
              SPDX-License-Identifier: Apache-2.0
-->

<!-- A component to wrap all components that should be present in the HTML-footer -->

<template>
  <footer>
    <nav class="navbar-light bg-light border-top pt-3 pb-3">
      <div class="content-wrapper navbar navbar-expand-sm">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <app-link v-for="(image, imageIndex) in images" class="footer-link"
              :to="(image.href.indexOf('http://') === 0) || (image.href.indexOf('https://') === 0) ? image.href : { path: image.href }"
              :key="imageIndex"
              >
              <div class="project-title-container">
                <img v-if="image.src" :src="image.src" class="footer-logo" height="40" :title="image.description" :key="imageIndex">
                <span v-if="image.text">{{image.text}}</span>
              </div>
            </app-link>
          </li>
          <li v-for="link in links" class="nav-item">
            <app-link v-if="!link.web" class="footer-link" :to="{ path: link.href }">
              {{ link.title }}
            </app-link>
            <app-link v-if="link.web" class="footer-link" :to="link.href">
              {{ link.title }}
            </app-link>
          </li>
        </ul>
      </div>
    </nav>
  </footer>
</template>

<script>
/* eslint-disable-next-line */
import { glueConfig as GLUE_CONFIG } from '../../config/user-configs';
import AppLink from './AppLink';

export default {
  name: 'bottom',
  components: {
    AppLink,
  },
  data() {
    const that = this;
    return {
      images: GLUE_CONFIG.images.footerLogos,
      links: GLUE_CONFIG.navigation.topnav.sub.append.map(nav => ({
        title: that.$t(nav.title),
        href: nav.href,
        web: (nav.href.indexOf('http://') === 0) || (nav.href.indexOf('https://') === 0),
      })),
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  margin: auto;
}

.footer-link {
  padding: 8px;
}
</style>
