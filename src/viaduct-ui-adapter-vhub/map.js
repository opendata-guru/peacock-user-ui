/* eslint-disable no-restricted-syntax,max-len */
/**
 * @author Dennis ritter
 * @created 25.10.17
 * @description
 */

import axios from 'axios';

export default class Map {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  /**
   * @description Service that creates an Open Streets Map using Leaflet and stores it in the response object of the returned promise.
   * @param Leaflet {Object} - The Leaflet dependency to create and manipulate maps (Open Street Map)
   * @param containerId {String} - The Template container element the map will be rendered in.
   * @returns {Promise}
   */
  get(Leaflet, containerId) {
    return new Promise((resolve, reject) => {
      // Init Map
      const map = Leaflet.map(containerId).setView([52.526, 13.314], 10);
      // Get Tiles
      /* Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHJpdHRlciIsImEiOiJjajk2c3doZnIwN2xxMnhueTlyZTVvOGUzIn0.Gp9FjtD5ecQmQdhk92tD1A',
      }).addTo(map); */
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      }).addTo(map);
      const resData = {
        data: {
          map,
        }
      };
      resolve(resData);
      /**
      // Get Marker positions and place markers on map
      const endpoint = 'sensor_list';
      axios.get(`${this.baseUrl}${endpoint}`)
        .then((response) => {
          const sensors = response.data.result;
          for (const sensor of sensors) {
            const position = sensor.location.split(', ');
            const marker = Leaflet.marker([parseFloat(position[0]), parseFloat(position[1])]).addTo(map);
            let dataString = '';
            for (const item of sensor.sensor_data) {
              dataString = dataString.concat(`<br/><b>${item.name}:</b> ${item.data.value}`);
            }
            marker.bindPopup(`<b>${sensor.title}</b><br/>${dataString}`);
          }
          const resData = {
            data: {
              map,
            },
          };
          resolve(resData);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
          reject(error);
        });
       **/
    });
  }
}
