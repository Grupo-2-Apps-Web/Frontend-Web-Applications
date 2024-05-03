<script>
import { defineComponent, onMounted, onBeforeMount } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Trip } from "../models/trip.entity.js";
import {TripService} from "../services/trip.service.js";
import {OnGoingTripService} from "../services/ongoing-trip.service.js";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LMap',
  computed: {
    id(){
      return this.$route.params.id;
    }
  },
  data() {
    return {
      tripAPI: new TripService(),
      onGoingTripAPI: new OnGoingTripService(),
      trip: Trip,
      driver: '',
      plate : '',
      load: '',
      speed: 0,
      distance: 0,
      latitude: 0,
      longitude: 0
    }
  },
  setup(){
    const router = useRouter();

    const goToAlerts = (id) => {
      router.push(`/client/alerts/${id}`);
    }
    return{
      goToAlerts
    };
  },
  mounted() {
    const carIcon = L.icon({
      iconUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Car_icon_alone.png",
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50]
    });

    this.tripAPI.getTripByID(this.id).then(response => {
      this.driver = response.data[0].driver.fullName;
      this.plate = response.data[0].vehicle.plate;
      this.load = response.data[0].cargo.weight;
    });
    this.onGoingTripAPI.getTripByID(this.id).then(response => {
      console.log(response.data[0]);
      this.speed = response.data[0].speed;
      this.distance = response.data[0].distance;
      this.latitude = response.data[0].latitude;
      this.longitude = response.data[0].longitude;

      const map = L.map('mapContainer').setView([this.latitude, this.longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      L.marker([this.latitude, this.longitude], {icon: carIcon}).addTo(map)
          .bindPopup('Current location')
          .openPopup();
    });

  }
})
</script>
<template>
  <pv-button style="margin-top: 20px; margin-left: 10px;" @click="this.$router.go(-1);">Return</pv-button>
  <div class="container">
    <div class="info-card">
      <pv-card>
        <template #content>
          <div class="content">
            <h1>Trip Information</h1>
            <p><strong>Driver:</strong> {{ driver }}</p>
            <p><strong>Plate:</strong> {{ plate }}</p>
            <p><strong>Load:</strong> {{ load }} kg</p>
            <p><strong>Speed:</strong> {{ speed }} km/h</p>
            <p><strong>Distance:</strong> {{ distance }} km</p>
            <p><strong>Latitude:</strong> {{ latitude }}</p>
            <p><strong>Longitude:</strong> {{ longitude }}</p>
          </div>
        </template>
      </pv-card>
      <pv-button label="Alerts" class="btn" @click="goToAlerts(id)"></pv-button>
    </div>
    <div id="mapContainer"></div>
  </div>


</template>

<style scoped>
.container{
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.content{
  color: black;
}

.info-card{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.p-card {
  background-color: #FFA500;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  width: 70%;
  min-height: 500px;
  margin: 0 auto;
}

.btn{
  font-family: Rubik, sans-serif;
  background-color: #006400;
  border-radius: 15px;
  width: 25%;
  margin-top: -20px;
}

#mapContainer {
  height: calc(100vh - 81px);
}

@media (max-width: 1000px) {
  .container{
    display: flex;
    flex-direction: column;
  }
  .info-card{
    margin-top: 20px;
  }
  #mapContainer {
    height: 500px;
  }
}

</style>