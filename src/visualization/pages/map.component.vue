<script>
import { defineComponent, onMounted, onBeforeMount } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Trip } from "../../registration/models/trip.entity.js";
import {TripService} from "../../registration/services/trip.service.js";
import {OnGoingTripService} from "../../registration/services/ongoing-trip.service.js";
import { useRouter } from 'vue-router';

import axios from 'axios';
import {DriverService} from "../../registration/services/driver.service.js";
import {VehicleService} from "../../registration/services/vehicle.service.js";
import {AlertService} from "../../registration/services/alert.service.js";
import {Alert} from "../../registration/models/alert.entity.js";

export default defineComponent({
  name: 'LMap',
  computed: {
    id(){
      return this.$route.params.id;
    }
  },
  data() {
    return {
      tripService: new TripService(),
      onGoingTripService: new OnGoingTripService(),
      driverService: new DriverService(),
      vehicleService: new VehicleService(),
      alertService: new AlertService(),
      isClient: window.location.pathname.includes('client'),
      trip: Trip,
      driverId: 0,
      vehicleId: 0,
      driver: '',
      plate : '',
      load: '',
      speed: 0,
      distance: 0,
      latitude: 0,
      longitude: 0,
      visible: false,
      googleMapsApiKey: 'AIzaSyCe0niCYse11QSi-ydywisYM0KEOV-cmdk',
    }
  },
  methods:{
    addAlert(){
      this.visible = true;
    },
    async registerAlert(){
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      let newAlert = new Alert(0, title, description, new Date(), Number(this.id));
      console.log(newAlert);
      await this.alertService.create(newAlert)
          .then(
          (response) => {
            alert('Alert added successfully. Client will be notified.');
          }).catch((error) => {
            alert('An error occurred while adding the alert. Please try again.');
          });
      this.visible = false;
    },
    closeDialog() {
      this.visible = false;
    }
  },
  setup(){
    const router = useRouter();
    const goToAlerts = (id) => {
      router.push(`/client/alerts/${id}`);
    }

    const goBack = () => {
      router.go(-1);
    }
    return{
      goToAlerts,
      goBack
    };
  },
  mounted() {
    const carIcon = L.icon({
      iconUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Car_icon_alone.png",
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50]
    });
    this.tripService.getOne(this.id).then(response =>{
      this.driverId = response.data.driverId;
      this.vehicleId = response.data.vehicleId;
      this.load = response.data.cargoData.weight;

      this.driverService.getOne(this.driverId).then(response => {
        this.driver = response.data.name
      });

      this.vehicleService.getOne(this.vehicleId).then(response => {
        this.plate = response.data.plate
      });
    });

    this.onGoingTripService.getByTripId(this.id).then(response => {
      console.log(response);
      this.speed = response.data.speed;
      this.distance = response.data.distance;
      this.latitude = response.data.latitude;
      this.longitude = response.data.longitude;

      // Leaflet Map y marcadores:
      const map = L.map('mapContainer').setView([this.latitude, this.longitude], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      L.marker([this.latitude, this.longitude], {icon: carIcon}).addTo(map)
          .bindPopup('Current location')
          .openPopup();
      L.marker([-12.0464, -77.0428]).addTo(map)
          .bindPopup('Lima')
          .openPopup();


      // Google Maps API (Routes) y logica de movimiento:
      let stepIndex = 0;
      let segmentIndex = 0;
      let segmentsPerStep = 500; // Número de segmentos en los que dividir cada paso
      let marker = L.marker([this.latitude, this.longitude], {icon: carIcon}).addTo(map);
      let routePolyline;

      axios.get(`/maps/api/directions/json?origin=${this.latitude},${this.longitude}&destination=-12.0464,-77.0428&key=${this.googleMapsApiKey}`)
          .then(response => {
            const steps = response.data.routes[0].legs[0].steps;

            // Crea la ruta completa al inicio (routeCoordinates contiene el conjunto de puntos)
            const routeCoordinates = steps.map(step => [step.start_location.lat, step.start_location.lng]);
            routePolyline = L.polyline(routeCoordinates, {color: 'blue'}).addTo(map);

            setInterval(() => {
              if (stepIndex < steps.length) {
                const currentStep = steps[stepIndex];
                const startLatLng = [currentStep.start_location.lat, currentStep.start_location.lng];
                const endLatLng = [currentStep.end_location.lat, currentStep.end_location.lng];

                // Calcula la latitud y longitud del segmento actual
                const segmentLat = startLatLng[0] + (endLatLng[0] - startLatLng[0]) * (segmentIndex / segmentsPerStep);
                const segmentLng = startLatLng[1] + (endLatLng[1] - startLatLng[1]) * (segmentIndex / segmentsPerStep);
                const segmentLatLng = [segmentLat, segmentLng];

                // Mueve el marcador al segmento actual
                marker.setLatLng(segmentLatLng);

                // Actualiza la ruta para mostrar solo la parte que falta por recorrer
                const remainingRouteCoordinates = steps.slice(stepIndex).map(step => [step.start_location.lat, step.start_location.lng]);
                map.removeLayer(routePolyline);
                routePolyline = L.polyline(remainingRouteCoordinates, {color: 'blue'}).addTo(map);

                // Avanza al siguiente segmento o paso
                segmentIndex++;
                if (segmentIndex >= segmentsPerStep) {
                  segmentIndex = 0;
                  stepIndex++;
                }
              }
            }, 20000 / segmentsPerStep); // Mueve el marcador y actualiza la ruta cada segundo / segmentsPerStep
          })
          .catch(error => {
            console.log("Ocurrio un:", error);
          });
    });

  }
})
</script>
<template>
  <div class="container">
    <div class="info-card">
      <pv-button label="Return" class="back-btn" @click="goBack"></pv-button>
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
      <pv-button v-if="!isClient" label="Add Alert" class="btn" @click="addAlert"></pv-button>
      <pv-button v-if="isClient" label="Alerts" class="btn" @click="goToAlerts(id)"></pv-button>
    </div>
      <pv-dialog :visible="visible" header="Add Alert" :closable="false">
        <template #header>
          <h2>Add Alert</h2>
        </template>
        <div class="flex flex-column m-2">
          <label for="title" class="font-semibold w-6rem mb-2">Title</label>
          <pv-inputtext id="title" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex flex-column m-2">
          <label for="description" class="font-semibold w-6rem mb-2">Description</label>
          <pv-textarea cols="40" rows="6" id="description" class="flex-auto" autocomplete="off" />
        </div>
        <template #footer>
          <pv-button @click="closeDialog" text severity="danger">Cancel</pv-button>
          <pv-button @click="registerAlert" outlined severity="success">Add</pv-button>
        </template>
      </pv-dialog>
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
.back-btn {
  margin-bottom: 20px;
  margin-left: 100px;
  align-self: flex-start;
}

#mapContainer {
  height: calc(100vh - 81px);
}

#description{
  resize: none;
}

@media (max-width: 850px) {
  .container {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
  }

  .p-card{
    width: 100%;
  }
}
</style>