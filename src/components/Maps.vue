<template>
  <div class="container-fluid maps">
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Explore FOKUS Weather Stations</h3>
        </div>
        <div class="card-body">
          <div id="mapid" ref="mapref"></div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Leaflet from 'leaflet';
  // Import Leaflet Marker Images
  // BUG https://github.com/Leaflet/Leaflet/issues/4968
  import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
  import iconUrl from 'leaflet/dist/images/marker-icon.png';
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

  // Fixes Markers img BUG --> https://github.com/Leaflet/Leaflet/issues/4968
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
    name: 'Maps',
    dependencies: 'MapService',
    data() {
      return {
        sensors: [],
      };
    },
    computed: {
      ...mapGetters('mapsData', [
        'getMap',
      ]),
    },
    methods: {
      ...mapActions('mapsData', [
        'useService',
        'loadMap',
      ]),
    },
    filters: {},
    watch: {},
    created() {
      this.useService(this.MapService);
    },
    mounted() {
      this.map = this.loadMap({
        Leaflet,
        containerId: 'mapid',
      });
    },
  };
</script>

<style lang="scss" scoped>
  #mapid {
    height: 600px;
    width: 100%;
  }
</style>
<style lang="scss">
  @import '~leaflet/dist/leaflet.css';
</style>
