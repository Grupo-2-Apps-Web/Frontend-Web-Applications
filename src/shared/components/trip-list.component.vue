<script>
import { TripService } from '../../client/services/trip.service.js';
import { Trip } from '../../client/models/trip.entity.js';
import TripCard from "./trip-card.component.vue";
import {mapGetters} from "vuex";

export default {
  name: "trip-list",
  components: {
    TripCard
  },
  computed: {
    ...mapGetters(['getView'])
  },
  data() {
    return {
      api: new TripService(),
      trips: [],
      trip: Trip,
      selectedFilter: null,
      filters: [
        { name: 'Name', value: 'name' },
        { name: 'Date', value: 'date' },
        { name: 'Place', value: 'place' },
      ],
      searchText: '',
      filteredTrips: [],
    }
  },
  created() {
    this.api.getTrips().then(response => {
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
      this.filteredTrips = this.trips;
    });
  },
  methods: {
    filterTrips() {
      if (!this.selectedFilter && !this.searchText) {
        this.filteredTrips = this.trips;
        return;
      }

      let filterValue = this.selectedFilter ? this.selectedFilter.value : null;
      let searchText = this.searchText ? this.searchText.toLowerCase() : null;

      this.filteredTrips = this.trips.filter(trip => {
        if (filterValue && searchText) {
          let tripProperty;
          switch (filterValue) {
            case 'name':
              tripProperty = trip.name;
              break;
            case 'date':
              tripProperty = trip.loadDate;
              break;
            case 'place':
              tripProperty = trip.loadLocation;
              break;
            default:
              return true;
          }
          return tripProperty ? tripProperty.toLowerCase().includes(searchText) : false;
        } else if (filterValue) {
          return trip.hasOwnProperty(filterValue);
        } else if (searchText) {
          return Object.values(trip).some(val => String(val).toLowerCase().includes(searchText));
        }
        return true;
      });
    }
  }
}

</script>

<template>
  <div class="main-top">
    <h1>Last Trips</h1>
    <pv-button label="Export" style="background-color: #006400" ></pv-button>
  </div>

  <div class="container-search-bar">
    <div class="search-bar">
      <input type="text" v-model="searchText" placeholder="Search" />
    </div>
    <div class="buttons-group">
      <pv-button @click="filterTrips" style="background-color: transparent; border: none; color: black;">
        <i class="pi pi-search"></i>
      </pv-button>


      <div class="dropdown-container">
        <pv-dropdown v-model="selectedFilter" :options="filters" optionLabel="name" placeholder="Select a filter" class="w-full md:w-14rem">
        </pv-dropdown>
      </div>
    </div>
  </div>


  <div class="main-body">
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

    <trip-card v-for="trip in filteredTrips" :trip="trip"/>

  </div>

</template>

<style scoped>

.main-top{
  display: flex;
  justify-content: space-evenly;
  margin: 20px;
}

h1{
  font-size: 48px;
  font-family: Roboto, sans-serif;
}

.p-button{
  height: 50px;
  width: 150px;
  margin: auto 0;
  border-radius: 5px;
  font-family: Rubik, sans-serif;
}
.container-search-bar {
  display: flex;
  text-align: center;
  justify-content: center;
  width: 100%;
}

.search-bar input {
  font-family: Roboto, sans-serif;
  font-size: 20px;
  width: 40vw;
  height: 45px;
  padding: 10px;
  border: black 1px solid;
  border-radius: 5px;
}

.buttons-group {
  display: flex;
  justify-content: space-between;
  width: 10%;
  margin-right: 10px;
}

.main-body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
}

@media (min-width: 1550px) {
  .container-search-bar {
    justify-content: normal;
    margin-left: 500px;
  }
}

/*-------------------List View------------------*/

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