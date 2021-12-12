<!-- @license Copyright 2019 Fraunhofer FOKUS
              Modifications copyright 2021 Thomas Tursics
              SPDX-License-Identifier: Apache-2.0
-->

<template>
  <select class="btn btn-outline-dark custom-select-sm language-selector d-none d-sm-block" v-model="locale">
    <option v-for="lang in Object.keys(languages)" :key="lang" :value="lang">
      {{ languages[lang] }}
    </option>
  </select>
</template>

<script>
  import { has } from 'lodash';

  export default {
    name: 'language-selector',
    components: {
    },
    data() {
      return {
        languages: {
          bg: 'Български (bg)',
          cs: 'čeština (cs)',
          da: 'dansk (da)',
          de: 'Deutsch (de)',
          el: 'Ελληνικά (el)',
          en: 'English (en)',
          es: 'español (es)',
          et: 'eesti (et)',
          fr: 'français (fr)',
          ga: 'Gaeilge (ga)',
          hr: 'Hrvatski (hr)',
          hu: 'Magyar (hu)',
          it: 'italiano (it)',
          lt: 'lietuvių (lt)',
          lv: 'latviešu (lv)',
          mt: 'Malti (mt)',
          nl: 'Nederlands (nl)',
          pl: 'polski (pl)',
          pt: 'português (pt)',
          ro: 'română (ro)',
          sk: 'slovenčina (sk)',
          sl: 'slovenščina (sl)',
          fi: 'suomi (fi)',
          sv: 'svenska (sv)',
          no: 'norsk (no)',
        },
      };
    },
    computed: {
      locale: {
        get() {
          return this.$i18n.locale || 'en';
        },
        set(locale) {
          this.$i18n.locale = locale;
          // Wait until router is ready before changing it
          // Necessary when routing to lazy-loaded components
          this.$router.onReady(() => {
            if (locale !== this.$route.query.locale) {
              this.$router.push({ query: Object.assign({}, this.$route.query, { locale }) });
            }
          });
        },
      },
    },
    methods: {
      has,
      initLocale() {
        const queryLocale = this.$route.query.locale;
        if (queryLocale) {
          this.locale = queryLocale;
        } else if (this.has(this.languages, (navigator.language.substring(0, 2)))) {
          this.locale = navigator.language.substring(0, 2);
        } else {
          this.locale = 'en';
        }
      },
    },
    created() {
      this.initLocale();
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../node_modules/bootstrap/scss/bootstrap.scss';
  .language-selector {
    width: 150px;
  }
</style>
