<template>
  <div class="container">
        <div class="row">
          <div class="col">
            <!-- <h3>Auth Demo</h3>
            <p> User Details: {{securityAuth}}</p>
            <p v-if="securityAuth"> Header is: {{headerData}}</p>
            <button v-if="securityAuth" @click="logout">LogOut</button>
            <button v-if="securityAuth" @click="getHeader">getHeader</button> -->
          </div>
        </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'auth',
  data() {
    return {
      headerData: '',
    };
  },
  dependencies: 'authService',
  computed: {
    ...mapGetters('auth', [
      'securityAuth',
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'authLogin',
      'authLogout',
    ]),
    logout() {
      this.authService.logout(this.securityAuth);
      this.authLogout();
    },
    getHeader() {
      this.headerData = this.authService.getHeader(this.securityAuth);
    },
  },
};
</script>

<style scoped>
p { word-break: break-all }
</style>
