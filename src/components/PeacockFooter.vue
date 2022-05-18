<!-- @license Copyright 2019 Fraunhofer FOKUS
              Modifications copyright 2021 Thomas Tursics
              SPDX-License-Identifier: Apache-2.0
-->

<template>
  <footer class="bg-light text-center text-lg-start border-top mt-3">
    <div class="container-fluid navbar-expand-sm">
      <ul class="navbar-nav">
        <li class="nav-item">
          <app-link v-for="(image, imageIndex) in images"
            class="nav-link link-dark"
            :to="(image.href.indexOf('http://') === 0) || (image.href.indexOf('https://') === 0) ? image.href : { path: image.href }"
            :key="imageIndex"
            >
            <div class="project-title-container">
              <img v-if="image.src" :src="image.src" class="footer-logo" height="40" :title="image.description" :key="imageIndex">
              <span v-if="image.text">{{image.text}}</span>
            </div>
          </app-link>
        </li>
        <li v-for="(link, linkIndex) in links"
          class="nav-item"
          :key="linkIndex"
        >
          <app-link class="nav-link link-dark" :to="link.web ? link.href : { path: link.href }">
            {{ link.title }}
          </app-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
/* eslint-disable-next-line */
import { glueConfig as GLUE_CONFIG } from '../../config/user-configs';
import AppLink from './AppLink';

export default {
  name: 'peacockFooter',
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
</style>
