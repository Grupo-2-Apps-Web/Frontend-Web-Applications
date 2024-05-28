<script>
import { EntrepreneurService } from "../../user/services/entrepreneur.service.js";
import { ClientService } from '../../user/services/client.service.js';
import { UserService } from "../../user/services/user.service.js";
import { User } from '../../user/models/user.entity.js';
import ClientCard from "../components/client-card.component.vue";
import {mapGetters} from "vuex";
import store from "../../store/store.js";
import {TripService} from "../../registration/services/trip.service.js";

export default {
  name: "client-list",
  components: {
    ClientCard
  },
  computed: {
    ...mapGetters(['getView'])
  },
  watch: {
    selectedFilter: 'filterClients',
    searchText: 'filterClients'
  },
  data() {
    return {
      entrepreneurId: 0,
      entrepreneurService: new EntrepreneurService(),
      clientService: new ClientService(),
      userService: new UserService(),
      tripService: new TripService(),
      clients: [],
      client: User,
      selectedFilter: null,
      filters: [
        { name: 'Name', value: 'name' },
        { name: 'RUC', value: 'ruc' },
      ],
      searchText: '',
      filteredClients: [],
    }
  },
  created() {
    // user_id del usuario que inició sesión
    const user_id = Number(store.state.user_id);
    // arreglo para guardar los client_id de los trips
    let clients_ids = [];
    this.entrepreneurService.getByUserId(user_id).then(r => {
      // entrepreneur_id del usuario
      this.entrepreneurId = r.id;
      console.log(this.entrepreneurId);
      this.tripService.getTripsByEntrepreneurId(this.entrepreneurId).then(res => {
        // guardar los ids de los clientes y evitar que se repitan
        res.forEach(trip => {
          if (!clients_ids.includes(trip.client_id)) {
            clients_ids.push(trip.client_id);
          }
        });
        console.log(clients_ids);
        for (let i = 0; i < clients_ids.length; i++) {
          this.clientService.getOne(clients_ids[i]).then(resp => {
            // obtener el user_id de cada cliente para obtener su información
            let user_id = resp.data.user_id;
            this.userService.getOne(user_id).then(response => {
              this.clients.push(new User(
                response.data.id,
                response.data.name,
                response.data.email,
                response.data.password,
                response.data.phone,
                response.data.ruc,
                response.data.address,
                response.data.subscription
              ));
            });
          })
        }
        this.filteredClients = this.clients;
      });
    })



  },
  methods: {
    filterClients() {
      if (!this.selectedFilter || !this.searchText) {
        this.filteredClients = this.clients;
        return;
      }

      let filterValue = this.selectedFilter ? this.selectedFilter.value : null;
      let searchText = this.searchText ? this.searchText.toLowerCase() : null;

      this.filteredClients = this.clients.filter(client => {
        if (filterValue && searchText) {
          let clientProperty;
          switch (filterValue) {
            case 'name':
              clientProperty = client.name;
              break;
            case 'ruc':
              clientProperty = client.ruc;
              break;
            default:
              return true;
          }
          return clientProperty ? clientProperty.toLowerCase().includes(searchText) : false;
        } else if (filterValue) {
          return client.hasOwnProperty(filterValue);
        } else if (searchText) {
          return Object.values(client).some(val => String(val).toLowerCase().includes(searchText));
        }
        return true;
      });
    }
  }
}

</script>

<template>
  <div class="main-top">
    <h1>Clients</h1>
  </div>

  <div class="container-search-bar">
    <div class="search-bar">
      <input type="text" v-model="searchText" placeholder="Search" />
    </div>
    <div class="buttons-group">
      <pv-button @click="filterClients" style="background-color: transparent; border: none; color: black;">
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
        <th>Name</th>
        <th>RUC</th>
        <th>View</th>
      </tr>
      </thead>

    </table>

    <client-card v-for="client in filteredClients" :client="client"/>
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