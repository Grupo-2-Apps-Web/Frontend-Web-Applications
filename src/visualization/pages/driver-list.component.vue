<script>
import { DriverService } from '../../registration/services/driver.service.js';
import { Driver } from '../../registration/models/driver.entity.js';
import DriverCard from "../components/driver-card.component.vue";
import {mapGetters} from "vuex";

export default {
  name: "driver-list",
  components: {
    DriverCard
  },
  computed: {
    ...mapGetters(['getView'])
  },
  watch: {
    selectedFilter: 'filterDrivers',
    searchText: 'filterDrivers'
  },
  data() {
    return {
      userId: 0,
      driverService: new DriverService(),
      drivers: [],
      driver: Driver,
      selectedFilter: null,
      filters: [
        { name: 'Name', value: 'name' },
        { name: 'DNI', value: 'dni' },
      ],
      searchText: '',
      filteredDrivers: [],
    }
  },
  created() {
    this.driverService.getAll().then(response => {
      this.drivers = response.data.map(driver => new Driver(
          driver.id,
          driver.name,
          driver.dni,
          driver.license,
          driver.contact_number
      ));
      this.filteredDrivers = this.drivers;

    });
  },
  methods: {
    filterDrivers() {
      if (!this.selectedFilter || !this.searchText) {
        this.filteredDrivers = this.drivers;
        return;
      }

      let filterValue = this.selectedFilter ? this.selectedFilter.value : null;
      let searchText = this.searchText ? this.searchText.toLowerCase() : null;

      this.filteredDrivers = this.drivers.filter(driver => {
        if (filterValue && searchText) {
          let driverProperty;
          switch (filterValue) {
            case 'name':
              driverProperty = driver.name;
              break;
            case 'dni':
              driverProperty = driver.dni;
              break;
            default:
              return true;
          }
          return driverProperty ? driverProperty.toLowerCase().includes(searchText) : false;
        } else if (filterValue) {
          return driver.hasOwnProperty(filterValue);
        } else if (searchText) {
          return Object.values(driver).some(val => String(val).toLowerCase().includes(searchText));
        }
        return true;
      });
    }
  }
}

</script>

<template>
  <div class="main-top">
    <h1>Drivers</h1>
  </div>

  <div class="container-search-bar">
    <div class="search-bar">
      <input type="text" v-model="searchText" placeholder="Search" />
    </div>
    <div class="buttons-group">
      <pv-button @click="filterDrivers" style="background-color: transparent; border: none; color: black;">
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
        <th>DNI</th>
        <th>Name</th>
        <th>View</th>
      </tr>
      </thead>

    </table>

    <driver-card v-for="driver in filteredDrivers" :driver="driver"/>
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