/**
 * @license Copyright 2021 Thomas Tursics
 *          SPDX-License-Identifier: Apache-2.0
 */

import store from '../../src/store/index';
import { encode } from '../../src/utils/jwt';

const fakeKeyCloak = {
  token: 'FakeKeyCloak',
  authenticated: false,

  login: () => {
    const ret = {
      successCB: undefined,
      success: (func) => {
        ret.successCB = func;

        return {
          error: () => {
          },
        };
      },
    };

    window.setTimeout(() => {
      fakeKeyCloak.setRtpToken();
      fakeKeyCloak.authenticated = true;
      ret.successCB();
    }, 100);
    return ret;
  },

  updateToken: () => {
    const ret = {
      successCB: undefined,
      success: (func) => {
        ret.successCB = func;

        return {
          error: () => {
          },
        };
      },
    };

    window.setTimeout(() => {
      fakeKeyCloak.setRtpToken();
      fakeKeyCloak.authenticated = true;
      ret.successCB('refresh token');
    }, 100);
    return ret;
  },

  logout: (redirect, router) => {
    fakeKeyCloak.clearRtpToken();
    fakeKeyCloak.authenticated = false;
    router.push(redirect);
  },

  clearRtpToken: () => {
    store.dispatch('auth/rtpToken', '');
  },

  setRtpToken: () => {
    const rtpToken = {
      realm_access: {
        roles: [
          'provider',
        ],
      },
      authorization: {
        permissions: [],
      },
    };

    rtpToken.authorization.permissions.push({
      rsname: 'ckan-catalog',
      scopes: [
        'update',
      ],
    });

    const rtpTokenEncoded = encode(rtpToken);
    store.dispatch('auth/rtpToken', rtpTokenEncoded);
  },
};

export default class AuthZeroService {
  /**
   * @function constructor
   * @param redirectUrl redirection url used for logout redirection
   * @param keyclockConfig keyclock configuration from glue-config.js
  */
  constructor(keyclockConfig, rtpConfig) {
    // initialting Keycloak configuration
    this.keycloak = fakeKeyCloak;
    // Auth Base URL
    this.baseUrl = keyclockConfig.url;
    this.rtpConfig = rtpConfig;
    this.router = undefined;
    // check if the user has session
    store.dispatch('auth/authLogin', this.keycloak);
    store.dispatch('auth/rtpToken', '');
  }

  init(router) {
    this.router = router;
    this.keycloak.login()
      .success(() => {
        store.dispatch('auth/authLogin', this.keycloak);
        router.push('/');
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
  logout(keycloak, redirectURL) {
    if (this.keycloak !== keycloak) {
      console.log('Used logout() with different keycloak: ', keycloak);
    }
    keycloak.logout({ redirectUri: redirectURL }, this.router);
  }

  /**
   * @description Method is to check either the user is authenticated or not and returns true or false
   * @param keycloak keycloak object
   */
  isAuthenticated(keycloak) {
    if (this.keycloak !== keycloak) {
      console.log('Used isAuthenticated() with different keycloak: ', keycloak);
    }
    if (typeof this.keycloak !== 'undefined') {
      return this.keycloak.authenticated;
    }
    return false;
  }

  /**
   * @description get header for axios request
   * @param keycloak keycloak object
   */
  getHeader(keycloak) {
    if (this.keycloak !== keycloak) {
      console.log('Used getHeader() with different keycloak: ', keycloak);
    }
    return ({
      Authorization: 'Bearer ' + keycloak.token
    });
  }

  /**
   * @description get token for axios request
   * @param keycloak keycloak object
   */
  /* getToken = (keycloak) => {
    const _keyclock = keycloak;
    _keyclock.updateToken(10)
      .success(() => {
        store.dispatch('auth/authLogin', _keyclock);
        return _keyclock.token;
      });
  } */

  /**
   * @description refresh or update the token on each Auth protected request
   * @param keycloak keycloak object
   */
  /* refreshToken = (keycloak) => {
    return new Promise((resolve, reject) => {
      keycloak.updateToken(10)
        .success(() => {
          store.dispatch('auth/authLogin', keycloak);
          resolve(keycloak.token);
        }).error((err) => {
          reject(err);
        });
    });
  } */

  /**
   * @description get role exist or not
   * @param keycloak keycloack object
   * @param role type of role
   */
  /* roles = (keycloak, role) => {
    return keycloak.hasRealmRole(role);
  } */
}
