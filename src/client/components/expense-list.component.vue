<script>
import ExpenseCard from "./expense-card.component.vue";
import { Trip } from "../models/trip.entity.js"
import { TripService } from "../services/trip.service.js"
import {mapGetters} from "vuex";

export default {
  name: "expense-list.component",
  components: {ExpenseCard},
  computed: {
    ...mapGetters(['getView'])
  },
  data(){
    return {
      rawTrips: [],
      trips: [],
      tripService: new TripService()
    };
  },
  created(){
    this.tripService.getTrips().then(response => {
      this.rawTrips = response.data;
      this.rawTrips.forEach(trip => {
        this.trips.push(new Trip(
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
            )
        );
      });
    });
  }
}
</script>

<template>
  <h2>Expenses</h2>
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
    <div class="list-content" v-for="trip in trips">
      <expense-card :trip="trip"></expense-card>
    </div>
  </div>
</template>

<style scoped>

  h2{
    font-size: 48px;
    text-align: center;
  }

  .list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px;
  }

  .list-content {
    width: 100%;
    display: flex;
    justify-content: center;
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


  @media (max-width: 767px) {

    table {
      width: 80%;
    }

  }

</style>