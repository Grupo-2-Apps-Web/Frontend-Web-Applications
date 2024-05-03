<script>
import ExpenseCard from "./expense-card.component.vue";
import { Trip } from "../models/trip.entity.js"
import { TripService } from "../services/trip.service.js"
export default {
  name: "expense-list.component",
  components: {ExpenseCard},
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
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
  }

</style>