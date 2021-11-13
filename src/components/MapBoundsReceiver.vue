<template>
  <div :id="mapContainerId" ref="mapref"></div>
</template>

<script>
  // Import vuex helpers
  import { mapGetters } from 'vuex';
  import Leaflet from 'leaflet';

  export default {
    name: 'MapBoundsReceiver',
    data() {
      return {
        map: {},
        bounds: this.initBounds,
      };
    },
    props: {
      initBounds: {
        // Berlin
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
    },
    methods: {
      initMap() {
        // Init Map
        const map = Leaflet.map(this.mapContainerId, { editable: true }).fitBounds(this.initBounds);
        // Get Tiles
        /* Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoiZHJpdHRlciIsImEiOiJjajk2c3doZnIwN2xxMnhueTlyZTVvOGUzIn0.Gp9FjtD5ecQmQdhk92tD1A',
        }).addTo(map); */
        Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
        }).addTo(map);

        this.$refs.mapref.style.height = this.height;
        this.$refs.mapref.style.width = this.width;
        map.invalidateSize();
        map.setZoom(map.getBoundsZoom(this.initBounds));
        return map;
      },
      resetBounds() {
        this.map.flyToBounds(this.initBounds, this.map.getBoundsZoom(this.initBounds));
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
      geoStateBoundsWatcher: {
        deep: true,
        handler(bounds) {
          // console.log(`RECEIVER geoStateBoundsWatcher: ${bounds}`);
          if (!bounds) {
            this.map.flyToBounds(this.initBounds, this.map.getBoundsZoom(this.initBounds));
          } else {
            this.bounds = bounds;
            const b1 = Leaflet.latLng(bounds[0][0], bounds[0][1]);
            const b2 = Leaflet.latLng(bounds[1][0], bounds[1][1]);
            const b = Leaflet.latLngBounds(b2, b1);
            this.map.flyToBounds(b, this.map.getBoundsZoom(b));
          }
        },
      },
    },
    created() {
    },
    mounted() {
      this.map = this.initMap();
      this.map.on('resize', () => {
        this.map.invalidateSize();
      });
    },
  };
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
  @import '../styles/bootstrap_theme';
  @import '~leaflet/dist/leaflet.css';

  .leaflet-zoom-anim .leaflet-zoom-animated {
    will-change: unset !important;
  }
</style>
