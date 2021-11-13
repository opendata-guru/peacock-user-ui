<template>
  <div :id="mapContainerId" ref="mapref"></div>
</template>

<script>
// Import vuex helpers
import { mapActions } from 'vuex';
import Leaflet from 'leaflet';

// Fix Leaflet Marker Bug (https://github.com/Leaflet/Leaflet/issues/4968#issuecomment-264311098)
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

Leaflet.Marker.prototype.options.icon = Leaflet.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

export default {
  name: 'MapBasic',
  data() {
    return {
      map: {},
    };
  },
  props: {
    /**
     * @description A location that is displayed in the center of the map on init
     *              [[<lat>(float), <lon>(float)], <zoom>(int)]
     * @example [[52.526, 13.314], 10]
     */
    location: {
      // Berlin - Germany
      default: () => [[52.526, 13.314], 10],
    },
    spatialType: {
      default: () => 'Point',
    },
    spatialCoordinates: {
      // Berlin - Germany
      default: () => [
        13.392333984375,
        52.54462541375285,
      ],
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
  },
  computed: {
    type() { return this.spatialType.substring(0, 1).toUpperCase() + this.spatialType.substring(1); },
    coordinates() { return this.spatialCoordinates; },
  },
  methods: {
    ...mapActions('datasets', [
    ]),
    initMap() {
      // Init Map
      const map = Leaflet.map(this.mapContainerId, { editable: true });
      const mapStyle = {
        color: 'red',
        fillColor: 'red',
        fillOpacity: 0.5,
        weight: 2,
        radius: 1,
      };

      // Get Tiles
      /* Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHJpdHRlciIsImEiOiJjajk2c3doZnIwN2xxMnhueTlyZTVvOGUzIn0.Gp9FjtD5ecQmQdhk92tD1A',
      }).addTo(map); */
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Use GeoJSON object
      const geoJsonLayer = Leaflet.geoJSON({
        type: 'Feature',
        properties: {},
        geometry: {
          type: this.type,
          coordinates: this.coordinates,
        },
      }, {
        style: mapStyle,
        pointToLayer: (feature, latLng) => Leaflet.circleMarker(latLng, mapStyle),
      }).addTo(map);

      this.$refs.mapref.style.height = this.height;
      this.$refs.mapref.style.width = this.width;
      map.invalidateSize();
      map.setZoom(map.getBoundsZoom(geoJsonLayer.getBounds()));
      map.fitBounds(geoJsonLayer.getBounds());
      return map;
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
    location: {
      handler(location) {
        this.map.setView(location[0], location[1]);
      },
    },
  },
  created() {},
  mounted() {
    this.map = this.initMap();
    this.map.on('resize', () => {
      this.map.invalidateSize();
    });
  },
};
</script>

<style lang="scss">
  @import '../styles/bootstrap_theme';
  @import '~leaflet/dist/leaflet.css';

  .leaflet-zoom-anim .leaflet-zoom-animated {
    will-change: unset !important;
  }
</style>
