<!-- @license Copyright 2022 Thomas Tursics
              SPDX-License-Identifier: Apache-2.0
-->

<template>
  <div :id="mapContainerId" ref="mapref">
    <font-awesome-icon class="fa fs-6 mapContainerPen" :icon="{ prefix: 'fas', iconName: 'pen' }"></font-awesome-icon>
  </div>
</template>

<script>
  /* eslint-disable no-restricted-globals */

  // Import vuex helpers
  import { mapActions, mapGetters } from 'vuex';
  import { isNil, isArray, isString } from 'lodash';
  import Leaflet from 'leaflet';
  // Leaflet extensions will be available from the Leaflet object
  import 'leaflet-draw';
  import 'leaflet-easybutton';
  import 'leaflet-editable';

  export default {
    name: 'PeacockMapBoundsSender',
    dependencies: ['DatasetService'],
    data() {
      return {
        map: {},
        rectangle: false,
        bounds: this.startBounds,
      };
    },
    props: {
      startBounds: {
        // Europe
        default: () => [[34.5970, -9.8437], [71.4691, 41.4843]],
      },
      height: {
        default: '200px',
      },
      width: {
        default: '100%',
      },
      mapContainerId: {
        default: 'mapid',
      },
      boundsId: {
        required: true,
      },
    },
    computed: {
      ...mapGetters('geo', [
        'getGeoBoundsById',
      ]),
      geoStateBoundsWatcher() {
        return this.getGeoBoundsById(this.boundsId);
      },
      getBounds() {
        return this.bounds;
      },
    },
    methods: {
      ...mapActions('datasets', [
        'useService',
      ]),
      ...mapActions('geo', [
        'setGeoBoundsForId',
        'setHoldedGeoBoundsForId',
        'resetGeoBoundsForId',
      ]),
      isNil,
      isArray,
      isString,
      initBounds() {
        this.setGeoBoundsForId({
          boundsId: this.boundsId,
          bounds: undefined,
        });
        let isInvalid = true;
        const bounds = this.$route.query.bounds;
        if (!isNil(bounds) && isArray(bounds) && bounds.length === 2) {
          if (isString(bounds[0]) && isString(bounds[1])) {
            bounds[0] = bounds[0].split(',');
            bounds[1] = bounds[1].split(',');
          }
          if ((isArray(bounds[0]) && bounds[0].length === 2)
            && (isArray(bounds[1]) && bounds[1].length === 2)) {
            if (!isNaN(this.isFloat(bounds[0][0]))
              && !isNaN(this.isFloat(bounds[0][1]))
              && !isNaN(this.isFloat(bounds[1][0]))
              && !isNaN(this.isFloat(bounds[1][1]))) {
              this.setGeoBoundsForId({
                boundsId: this.boundsId,
                bounds,
              });
              isInvalid = false;
            }
          }
        }
        if (isInvalid) {
          // Remove bounds url query params if format is not valid
          if (this.$route.query.bounds) {
            this.$router.replace({ query: Object.assign({}, this.$route.query, { bounds: undefined }) });
          }
        }
      },
      initMap() {
        // Init Map
        const map = Leaflet.map(this.mapContainerId, { editable: true }).fitBounds(this.startBounds);
        // Get Tiles
        /* Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoiZHJpdHRlciIsImEiOiJjajk2c3doZnIwN2xxMnhueTlyZTVvOGUzIn0.Gp9FjtD5ecQmQdhk92tD1A',
        }).addTo(map); */
        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
        }).addTo(map);

        map.invalidateSize();
        map.setZoom(map.getBoundsZoom(this.startBounds));
        return map;
      },
      isFloat(value) {
        if (/^(-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) return Number(value);
        return NaN;
      },
      resetBounds() {
        this.setGeoBoundsForId({
          boundsId: this.boundsId,
          bounds: undefined,
        });
        if (this.rectangle) {
          this.rectangle.remove();
        }
        this.map.flyToBounds(this.startBounds, this.map.getBoundsZoom(this.startBounds));
      },
      createBtnControls(map) {
        const mapContainerPenObj = document.querySelector('.mapContainerPen');
        const mapContainerPen = mapContainerPenObj.outerHTML;
        mapContainerPenObj.style.display = 'none';

        const rectButton = Leaflet.easyButton({
          states: [{
            stateName: 'passive', // name the state
            icon: mapContainerPen, // and define its properties
            title: 'Draw a new Rectangle', // like its title
            onClick: (btn, mapp) => { // and its callback
              btn.state('active');
              if (this.rectangle) {
                this.rectangle.remove();
              }
              // Reset Geo Bounds to fetch Datasets from all regions
              // this.resetGeoBoundsForId(this.boundsId);
              this.rectangle = mapp.editTools.startRectangle();
            },
          }, {
            stateName: 'active',
            icon: mapContainerPen,
            title: 'Cancel Drawing Rectangle',
            onClick: (btn) => {
              btn.state('passive');
            },
          }],
        }).addTo(map);

        map.on('editable:drawing:commit', (e) => {
          const rectBounds = e.layer.getBounds();
          this.bounds = [[rectBounds.getSouthWest().lat, rectBounds.getSouthWest().lng], [rectBounds.getNorthEast().lat, rectBounds.getNorthEast().lng]];
          rectButton.state('passive');
        });
      },
    },
    filters: {},
    watch: {
      height: {
        handler(height) {
          this.$refs.mapref.style.height = height;
          this.map.invalidateSize();
        },
      },
      width: {
        handler(width) {
          this.$refs.mapref.style.width = width;
          this.map.invalidateSize();
        },
      },
      bounds: {
        handler(bounds) {
          this.setHoldedGeoBoundsForId({
            bounds,
            boundsId: this.boundsId,
          });
          const b1 = Leaflet.latLng(bounds[0][0], bounds[0][1]);
          const b2 = Leaflet.latLng(bounds[1][0], bounds[1][1]);
          const b = Leaflet.latLngBounds(b2, b1);
          this.map.flyToBounds(b, this.map.getBoundsZoom(b));
        },
      },
      geoStateBoundsWatcher: {
        deep: true,
        handler(bounds, oldBounds) {
          if (JSON.stringify(bounds) === JSON.stringify(oldBounds)) {
            return;
          }
          if (!bounds) {
            this.map.flyToBounds(this.startBounds, this.map.getBoundsZoom(this.startBounds));
            this.$router.push({ query: Object.assign({}, this.$route.query, { bounds }) });
          } else {
            this.bounds = bounds;
            const b1 = Leaflet.latLng(bounds[0][0], bounds[0][1]);
            const b2 = Leaflet.latLng(bounds[1][0], bounds[1][1]);
            const b = Leaflet.latLngBounds(b2, b1);
            this.map.flyToBounds(b, this.map.getBoundsZoom(b));
            if (JSON.stringify(bounds) !== JSON.stringify(this.$route.query.bounds)) {
              this.$router.push({ query: Object.assign({}, this.$route.query, { bounds }) });
            }
          }
          if (this.rectangle) {
            this.rectangle.remove();
          }
        },
      },
    },
    created() {
      this.useService(this.DatasetService);
      this.initBounds();
    },
    mounted() {
      this.map = this.initMap();
      this.createBtnControls(this.map);
      this.map.on('resize', () => {
        this.map.invalidateSize();
        this.map.flyToBounds(this.startBounds, this.map.getBoundsZoom(this.startBounds));
      });
    },
  };
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
  @import '../styles/bootstrap_theme';
  @import '~leaflet/dist/leaflet.css';
  @import '~leaflet-easybutton/src/easy-button.css';

  @keyframes blink {
    from {color: #009374}
    to {color: #00c69c}
  }

  .easy-button-button {
    padding: 0;
    &:hover {
      background-color: #ccc;
    }
    .state-active{
      color: #009374;
      animation-name: blink;
      animation-iteration-count: infinite;
      animation-duration: 1s;
      animation-direction: alternate;
    }
  }

  .leaflet-zoom-anim .leaflet-zoom-animated {
    will-change: unset !important;
  }
</style>
