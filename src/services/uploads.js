/* eslint-disable class-methods-use-this */
/**
 * @author Har Preet Singh
 * @created 20.05.19
 * @description
 */

import axios from 'axios';

export default class Uploads {
  constructor(baseUrl, authToken) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }

  /**
   * @description CREATE a distribution with the given ID.
   * @returns {Promise}
   * @param title dataset title
   * @param catalogue catalogue
   * @param data json/ld tupple
   * @param token bearer token recieved after login
   */
  upload(title, catalogue, data, token, uploadData) {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.baseUrl}datasets/${title}?catalogue=${catalogue}&data=${uploadData}`;
      axios.put(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/ld+json',
        },
      })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @description POST a distribution file to upload.
   * @returns {Promise}
   * @param uploadURL upload URL endpoint
   * @param token bearer token recieved after login
   * @param formData from data to be uploaded eg. files
   */
  uploadDistribution(uploadURL, token, formData) {
    return new Promise((resolve, reject) => {
      axios.post(uploadURL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
   * @description DELETE a distribution with the given ID.
   * @returns {Promise}
   * @param title dataset title
   * @param token bearer token recieved after login
   */
  deleteDistribution(title, catalogue, rtpToken) {
    return new Promise((resolve, reject) => {
      const endpoint = `${this.baseUrl}/datasets/${title}?catalogue=${catalogue}`;
      axios.delete(
        endpoint,
        {
          headers: {
            Authorization: `Bearer ${rtpToken}`,
            'Content-Type': 'application/ld+json',
          },
        },
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
