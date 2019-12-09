/**
 * @author Har Preet Singh
 * @created 13.05.19
 * @description
 */

import Keycloak from 'keycloak-js';
import axios from 'axios';
import qs from 'qs';
import store from '../store/index';

export default class AuthService {
  /**
   * @function constructor
   * @param redirectUrl redirection url used for logout redirection
   * @param keyclockConfig keyclock configuration from glue-config.js
   */
  constructor(keyclockConfig, rtpConfig) {
    // initialting Keycloak configuration
    this.keycloak = new Keycloak(keyclockConfig);
    // Auth Base URL
    this.baseUrl = keyclockConfig.url;
    this.rtpConfig = rtpConfig;
    // check if the user has session
    this.keycloak.init({ onLoad: 'check-sso' })
      .success((authenticated) => {
        if (authenticated) {
          store.dispatch('auth/authLogin', this.keycloak);
          this.getRTPToken(this.keycloak.token).then((res) => {
            store.dispatch('auth/rtpToken', res.data.access_token);
          });
        }
      })
      .error((err) => {
        console.log('err'+err); // eslint-disable-line
      });
  }

  init() {
    this.keycloak.login()
      .success(() => {
        store.dispatch('auth/authLogin', this.keycloak);
        this.$router.push('/');
      })
      .error((err) => {
        console.log('error keycloak login : '+JSON.stringify(err)); // eslint-disable-line
      });
  }

  /**
  * @description logout from keycloak
  * @param keycloak keycloak object
  * @param redirectURL redirect URL after logout
  */
  logout = (keycloak, redirectURL) => {
    keycloak.logout({ redirectUri: redirectURL });
  }

  /**
  * @description Method is to check either the user is authenticated or not and returns true or false
  * @param keycloak keycloak object
  */
  isAuthenticated = (keycloak) => {
    if (typeof keycloak !== 'undefined') {
      return keycloak.authenticated;
    }
    return false;
  }

  /**
  * @description get header for axios request
  * @param keycloak keycloak object
  */
  getHeader = (keycloak) => /* eslint-disable */ {
    return ({ 'Authorization': 'Bearer ' + keycloak.token });
  }

  /**
  * @description get token for axios request
  * @param keycloak keycloak object
  */
  getToken = (keycloak) => {
    const _keyclock = keycloak;
    _keyclock.updateToken(10)
    .success(() => {
      store.dispatch('auth/authLogin', _keyclock);
      return _keyclock.token;
    })
  }

  /**
  * @description refresh or update the token on each Auth protected request 
  * @param keycloak keycloak object
  */
  refreshToken = (keycloak) => {
    return new Promise((resolve, reject) => {
      keycloak.updateToken(10)
      .success(() => {
        store.dispatch('auth/authLogin', keycloak);
        resolve(keycloak.token);
      }).error((err) => {
        reject(err);
      });
    });
  }

  /**
  * @description get role exist or not
  * @param keycloak keycloack object
  * @param role type of role
  */
  roles = (keycloak , role) => {
      return keycloak.hasRealmRole(role);
  }

  /**
  * @description get RTP Token
  * @param keycloak keycloack token
  */
  getRTPToken = (token) => {
    const endpoint = `${this.baseUrl}/realms/edp/protocol/openid-connect/token`;
    const requestBody = {
      grant_type : this.rtpConfig.grand_type,
      audience : this.rtpConfig.audience,
    }
    return new Promise((resolve, reject) => {
      axios.post(endpoint, qs.stringify(requestBody), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
