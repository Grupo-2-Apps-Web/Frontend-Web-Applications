<script>
import { VehicleService } from '../../registration/services/vehicle.service.js';
import { Vehicle } from '../../registration/models/vehicle.entity.js';
import VehicleCard from "../components/vehicle-card.component.vue";
import {mapGetters} from "vuex";

export default {
  name: "vehicle-list",
  components: {
    VehicleCard
  },
  computed: {
    ...mapGetters(['getView'])
  },
  watch: {
    selectedFilter: 'filterVehicles',
    searchText: 'filterVehicles'
  },
  data() {
    return {
      userId: 0,
      vehicleService: new VehicleService(),
      vehicles: [],
      vehicle: Vehicle,
      selectedFilter: null,
      filters: [
        { name: 'Plate', value: 'plate' },
        { name: 'Model', value: 'model' },
      ],
      searchText: '',
      filteredVehicles: [],
    }
  },
  created() {
    this.vehicleService.getAll().then(response => {
      this.vehicles = response.data.map(vehicle => new Vehicle(
          vehicle.id,
          vehicle.model,
          vehicle.plate,
          vehicle.tractor_plate,
          vehicle.max_load,
          vehicle.volume
      ));
      this.filteredVehicles = this.vehicles;

    });
  },
  methods: {
    filterVehicles() {
      if (!this.selectedFilter || !this.searchText) {
        this.filteredVehicles = this.vehicles;
        return;
      }

      let filterValue = this.selectedFilter ? this.selectedFilter.value : null;
      let searchText = this.searchText ? this.searchText.toLowerCase() : null;

      this.filteredVehicles = this.vehicles.filter(vehicle => {
        if (filterValue && searchText) {
          let vehicleProperty;
          switch (filterValue) {
            case 'plate':
              vehicleProperty = vehicle.plate;
              break;
            case 'model':
              vehicleProperty = vehicle.model;
              break;
            default:
              return true;
          }
          return vehicleProperty ? vehicleProperty.toLowerCase().includes(searchText) : false;
        } else if (filterValue) {
          return vehicle.hasOwnProperty(filterValue);
        } else if (searchText) {
          return Object.values(vehicle).some(val => String(val).toLowerCase().includes(searchText));
        }
        return true;
      });
    }
  }
}

</script>

<template>
  <div class="main-top">
    <h1>Vehicles</h1>
  </div>

  <div class="container-search-bar">
    <div class="search-bar">
      <input type="text" v-model="searchText" placeholder="Search" />
    </div>
    <div class="buttons-group">
      <pv-button @click="filterVehicles" style="background-color: transparent; border: none; color: black;">
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
        <th>Id</th>
        <th>Plate</th>
        <th>Model</th>
        <th>View</th>
      </tr>
      </thead>

    </table>

    <vehicle-card v-for="vehicle in filteredVehicles" :vehicle="vehicle"/>
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