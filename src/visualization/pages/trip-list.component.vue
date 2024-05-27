<script>
import { TripService } from '../../registration/services/trip.service.js';
import { Trip } from '../../registration/models/trip.entity.js';
import TripCard from "../components/trip-card.component.vue";
import {mapGetters} from "vuex";
import { js2xml } from 'xml-js';

export default {
  name: "trip-list",
  components: {
    TripCard
  },
  computed: {
    ...mapGetters(['getView'])
  },
  watch: {
    selectedFilter: 'filterTrips',
    searchText: 'filterTrips'
  },
  data() {
    return {
      userId: 0,
      visible: false,
      tripService: new TripService(),
      trips: [],
      trip: Trip,
      selectedFilter: null,
      filters: [
        { name: 'Name', value: 'name' },
        { name: 'Date (YYYY-MM-DD)', value: 'date' },
        { name: 'Place', value: 'place' },
      ],
      searchText: '',
      filteredTrips: [],
    }
  },
  created() {
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
      this.filteredTrips = this.trips;

    });
  },
  methods: {
    downloadJSON(){
      const client_id = 1; //Hard Coded
      const entrepreneur_id = 1; //Hard Coded
      this.tripService.getAll().then(response => {
        let trips = response.data;
        const filteredTrips = trips.filter(trip => trip.client_id === client_id || trip.entrepreneur_id === entrepreneur_id);
        const data = JSON.stringify(filteredTrips);
        const blob = new Blob([data], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'trips.json';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    },
    downloadXML(){
      const client_id = 1; //Hard Coded
      const entrepreneur_id = 1; //Hard Coded
      this.tripService.getAll().then(response => {
        let trips = response.data;
        const filteredTrips = trips.filter(trip => trip.client_id === Number(client_id) || trip.entrepreneur_id === Number(entrepreneur_id) );

        // Convert the array of trips to an object with valid XML tags
        const tripsWithValidTags = filteredTrips.reduce((obj, trip, index) => {
          obj[`trip${index}`] = trip;
          return obj;
        }, {});

        let xmlData = js2xml({trips: tripsWithValidTags}, {compact: true, spaces: 4});
        const blob = new Blob([xmlData], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'trips.xml';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    },
    filterTrips() {
      if (!this.selectedFilter || !this.searchText) {
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
              console.log(trip.load_date);
              console.log(trip.load_location)
              break;
            case 'date':
              // Asegúrate de que la fecha de búsqueda esté en la misma zona horaria que la fecha de carga
              let searchDate = new Date(`${searchText}T00:00:00`);
              tripProperty = new Date(trip.load_date);
              tripProperty = `${tripProperty.getFullYear()}-${tripProperty.getMonth() + 1}-${tripProperty.getDate()}`;
              return tripProperty === `${searchDate.getFullYear()}-${searchDate.getMonth() + 1}-${searchDate.getDate()}`;
            case 'place':
              tripProperty = trip.load_location;
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
    <pv-button label="Export" @click="visible = true" style="background-color: #006400" ></pv-button>
  </div>
  <pv-dialog :visible="visible" header="Download trips information" :closable="false">
    <template #header>
      <div class="flex">
        <h3>Download trips information</h3>
        <pv-button class="p-button-text w-2rem h-2rem mr-2 ml-2" icon="pi pi-times" @click="visible = false"/>
      </div>
    </template>
    <span class="p-text-secondary block mb-5">What type of file do you want to download?</span>
    <template #footer>
      <div class="flex justify-content-evenly gap-3">
        <pv-button class="justify-content-center" @click="downloadJSON" severity="info">JSON</pv-button>
        <pv-button class="justify-content-center" @click="downloadXML" severity="info">XML</pv-button>
      </div>

    </template>
  </pv-dialog>
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
  width: 50%;
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

@media (max-width: 790px) {
  .main-top {
    flex-direction: column;
    align-items: center;
  }

  .container-search-bar, .buttons-group {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  .search-bar input {
    width: 90%;
  }

  .main-body {
    padding-right: 100px;
  }
}
</style>