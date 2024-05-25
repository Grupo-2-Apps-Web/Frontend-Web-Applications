<script>
import {Trip} from "../../registration/models/trip.entity.js";
import TravelCard from "../components/travel-card.component.vue";
import {OnGoingTripService} from "../../registration/services/ongoing-trip.service.js";
import {TripService} from "../../registration/services/trip.service.js";
import {mapGetters} from "vuex";

export default {
  name: "travel-list",
  components: {
    TravelCard
  },
  computed: {
    ...mapGetters(['getView'])
  },
  data() {
    return {
      tripService: new TripService(),
      onGoingTripService: new OnGoingTripService(),
      tripsID: [],
      trips: [],
      trip: Trip,
      filteredTrips: [],
    }
  },
  created() {
    this.onGoingTripService.getAll().then(response => {
      response.data.forEach(trip => {
        this.tripsID.push(trip.trip_id);
      });

    });

    this.tripService.getAll().then(response => {
      this.trips = response.data.map(trip => new Trip(
        trip.id,
        trip.name,
        trip.type,
        trip.weight,
        trip.load_location,
        trip.load_date,
        trip.unload_location,
        trip.unload_date,
        trip.driver_id,
        trip.vehicle_id,
        trip.client_id,
        trip.entrepreneur_id
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
    <table v-if="getView === 'list'">
      <thead>
      <tr>
        <th>Viaje</th>
        <th>Id</th>
        <th>Load Date</th>
        <th>Load Location</th>
        <th>View</th>
      </tr>
      </thead>
    </table>
    <travel-card v-for="trip in filteredTrips" :trip="trip"/>
  </div>

</template>

<style scoped>

  h1{
    text-align: center;
    font-size: 48px;
  }

  .list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px;
  }

  /*---------------------------List View--------------------*/

  table {
    width: 55%;
    border-collapse: separate;
    border-spacing: 10px;
    table-layout: fixed;
    background-color: #FFA500;
    color: #2c2c2c;
  }

  table th, table td {
    border-bottom: 1px solid black;
    padding: 4px;
    text-align: left;
  }

  table thead {
    color: black; /* Cambia esto al color que prefieras */
  }

  table thead tr {
    height: 50px;
  }

  @media (max-width: 767px) {

    table {
      width: 80%;
    }

  }

</style>