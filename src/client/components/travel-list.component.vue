<script>
import {Trip} from "../models/trip.entity.js";
import TravelCard from "./travel-card.component.vue";
import {OnGoingTripService} from "../services/ongoing-trip.service.js";
import {TripService} from "../services/trip.service.js";

export default {
  name: "travel-list",
  components: {
    TravelCard
  },
  data() {
    return {
      tripAPI: new TripService(),
      onGoingTripAPI: new OnGoingTripService(),
      tripsID: [],
      trips: [],
      trip: Trip,
      filteredTrips: [],
    }
  },
  created() {
    this.onGoingTripAPI.getTrips().then(response => {
      response.data.forEach(trip => {
        this.tripsID.push(trip.id);
      });
    });

    this.tripAPI.getTrips().then(response => {
      this.trips = response.data.map(trip => new Trip(
        trip.id,
        trip.name,
        trip.cargo.loadDate,
        trip.cargo.unloadDate,
        trip.cargo.loadLocation,
        trip.cargo.unloadLocation,
        trip.driver.fullName,
        trip.vehicle.plate,
        trip.vehicle.tractorPlate,
        trip.company.name,
        trip.company.ruc,
        trip.company.logoImage
      ));
      this.filteredTrips = this.trips.filter(trip => this.tripsID.includes(trip.id));
    });
  },
}

</script>

<template>
  <div class="main-top">
    <h1>View trips in progress</h1>
  </div>
  <div class="list">
    <travel-card v-for="trip in filteredTrips" :trip="trip"/>
  </div>

</template>

<style scoped>
h1{
  text-align: center;
  font-size: 48px;
}

.list{
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}
</style>