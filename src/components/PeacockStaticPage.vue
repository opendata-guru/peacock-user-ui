<!-- @license Copyright 2021 Thomas Tursics
              SPDX-License-Identifier: Apache-2.0
-->

<template>
    <div class="row mt-1 mb-3">
      <div class="col-12" v-html="compiledHtml">
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'StaticPage',
  props: {
    fileName: {
      type: String,
      default: '/',
    },
  },
  data() {
    return {
      input: '',
    };
  },
  computed: {
    compiledHtml() {
      return this.input;
    },
  },
  created() {
    this.loadFile();
  },
  methods: {
    loadFile() {
      axios({
        method: 'get',
        url: this.fileName,
      })
        .then((result) => {
          this.input = result.data;
        })
        .catch(() => {
          this.$router.push({ name: 'NotFound' });
        });
    },
  },
};
</script>
