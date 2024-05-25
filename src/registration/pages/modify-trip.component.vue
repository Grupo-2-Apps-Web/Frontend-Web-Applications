<script>


import {Trip} from "../models/trip.entity.js";
import {TripService} from "../services/trip.service.js";

export default {
  name: "modify-trip.component",
  data() {
    return {
      id: this.$route.params.id,
      name: '',
      type: '',
      weight: 0,
      loadLocation: '',
      loadDate: '',
      unloadLocation: '',
      unloadDate: '',
      driverId: 0,
      vehicleId: 0,
      clientId: 0,
      entrepreneurId: 0,
    }
  },
  created() {
    const tripService = new TripService();
    tripService.getOne(this.id)
        .then(response => {
          console.log(response.data);
          const trip = response.data;
          if (trip) {
            this.name = trip.name;
            this.type = trip.type;
            this.weight = trip.weight;
            this.loadLocation = trip.load_location;
            this.loadDate = trip.load_date;
            this.unloadLocation = trip.unload_location;
            this.unloadDate = trip.unload_date;
            this.driverId = trip.driver_id;
            this.vehicleId = trip.vehicle_id;
            this.clientId = trip.client_id;
            this.entrepreneurId = trip.entrepreneur_id;
          }
        });
  },
  methods: {
    saveChanges() {
      const tripA = new Trip(
          this.id,
          this.name,
          this.type,
          this.weight,
          this.loadLocation,
          this.loadDate,
          this.unloadLocation,
          this.unloadDate,
          this.driverId,
          this.vehicleId,
          this.clientId,
          this.entrepreneurId
      );

      console.log(tripA);
      const tripService = new TripService();
      tripService.update(this.id, tripA)
          .then(() => {
            alert('Changes saved successfully.');
          })
          .then(() => {
            this.$router.push('/entrepreneur/register')
          }
      );
    },
    goBack() {
      this.$router.go(-1);
    }
  }

}
</script>
<template>
<div class="container">
  <h1>Modify Trip</h1>
  <div class="grid-container-2-columns">
    <div>
      <p>Name</p>
      <pv-inputtext v-model="name" style="width: 100%;"></pv-inputtext>
    </div>
    <div>
      <p>Type</p>
      <pv-inputtext v-model="type" style="width: 100%;"></pv-inputtext>
    </div>
  </div>
  <div class="grid-container-2-columns">
    <div>
      <p>Weight</p>
      <pv-inputtext type="number" v-model="weight" style="width: 100%;"></pv-inputtext>
    </div>
    <div>
      <p>Load Location</p>
      <pv-inputtext v-model="loadLocation" style="width: 100%;"></pv-inputtext>
    </div>
  </div>
  <div class="grid-container-2-columns">
    <div>
      <p>Load Date</p>
      <pv-inputtext type="date" v-model="loadDate" style="width: 100%;"></pv-inputtext>
    </div>
    <div>
      <p>Unload Location</p>
      <pv-inputtext v-model="unloadLocation" style="width: 100%;"></pv-inputtext>
    </div>
  </div>
  <div class="grid-container-2-columns">
    <div>
      <p>Unload Date</p>
      <pv-inputtext type="date" v-model="unloadDate" style="width: 100%;"></pv-inputtext>
    </div>
    <div>
      <p>Driver ID</p>
      <pv-inputtext type="number" v-model="driverId" style="width: 100%;"></pv-inputtext>
    </div>
  </div>
  <div class="grid-container-2-columns">
    <div>
      <p>Vehicle ID</p>
      <pv-inputtext type="number" v-model="vehicleId" style="width: 100%;"></pv-inputtext>
    </div>
    <div>
      <p>Client ID</p>
      <pv-inputtext type="number" v-model="clientId" style="width: 100%;"></pv-inputtext>
    </div>
  </div>
  <div class="button">
    <pv-button @click="goBack" style="background-color: #870a0a; padding: 15px 45px;" >
      Cancel
    </pv-button>
    <pv-confirm-dialog id="confirm" />
    <pv-button @click="saveChanges" >
      Save
    </pv-button>
  </div>
</div>

</template>

<style scoped>
h1 {
  text-align:start;
}
.container {
  margin: 20px 90px;
}

.grid-container-2-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.button {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 2em;
}
</style>