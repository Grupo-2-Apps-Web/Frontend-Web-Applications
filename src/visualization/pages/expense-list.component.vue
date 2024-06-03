<script>
import ExpenseCard from "../components/expense-card.component.vue";
import { Trip } from "../../registration/models/trip.entity.js"
import { TripService } from "../../registration/services/trip.service.js"
import {mapGetters} from "vuex";
import store from "../../store/store.js";
import {ClientService} from "../../user/services/client.service.js";

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
      tripService: new TripService(),
      clientService: new ClientService()
    };
  },
  created(){
    const id = Number(store.state.user_id);
    this.clientService.getByUserId(id).then(r => {
      this.tripService.getTripsByClientId(r.id).then(response => {
        this.rawTrips = response;
        this.rawTrips.forEach(trip => {
          this.trips.push(new Trip(
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
        });
      });
    })

  }
}
</script>

<template>
  <h2>Expenses</h2>
  <div class="list">
    <table v-if="getView === 'List'">
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