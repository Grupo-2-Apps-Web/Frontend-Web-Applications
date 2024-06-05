<template>
  <div class="travel" :class="getView || 'Grid'">
    <div v-if="getView === 'List'">
      <div class="table-button-container">
        <table>
          <tbody>
          <tr>
            <td>{{trip.name}}</td>
            <td>{{trip.id}}</td>
            <td>{{ formatDate(trip.loadDate) }}</td>
            <td>{{ trip.loadLocation }}</td>
          </tr>
          </tbody>
        </table>
        <div class="button-view-list">
          <pv-button label="View GPS" :class="['btn', getView]" @click="goToGPS(trip.id)"></pv-button>
        </div>
      </div>
    </div>
    <div v-else>
      <pv-card class="travel-card">
        <template #content>
          <div class="title">
            <h2>{{trip.name}}</h2>
            <h3>ID: {{trip.id}}</h3>
          </div>
          <div class="content-info-preview">
            <p>LOAD DATE: {{ formatDate(trip.loadDate) }}</p>
            <p>LOAD LOCATION: {{ trip.loadLocation }}</p>
          </div>
        </template>
      </pv-card>
      <pv-button label="View GPS" :class="['btn', getView]" @click="goToGPS(trip.id)"></pv-button>
    </div>
  </div>
</template>

<script>
import {Trip} from "../../registration/models/trip.entity.js"
import {useRouter} from "vue-router";
import {mapGetters} from "vuex";

export default {
  name: "travel-card",
  props: {
    trip: {
      type: Trip,
      required: true
    }
  },
  setup(){
    const router = useRouter();
    const goToGPS = (id) => {
      const currentPath = window.location.pathname;
      const isClient = currentPath.includes('client');
      const newPath = isClient ? `/client/gps/${id}` : `/entrepreneur/gps/${id}`;
      router.push(newPath);
    }
    return{
      goToGPS
    };
  },
  computed: {
    ...mapGetters(['getView'])
  },
  methods: {
    formatDate(dateString) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric'  };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
}
</script>

<style scoped>
h2, h3{
  color: black;
  font-family: Roboto, sans-serif;
}
p{
  color: black;
  font-family: Roboto, sans-serif;
}

.travel.Grid {
  margin: 40px 0 4px auto;
  width: 70%;
  display: flex;
  flex-direction: column;
}

.travel.Grid {
  flex-wrap: wrap;
  justify-content: space-between;
}


.travel-card {
  background-color: #FFA500;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  height: 100%;
  max-width: 700px;
}

.travel-card.Grid {
  width: calc(50% - 160px);
}

.content-info-preview {
  position: absolute;
  margin: -94px 15px 0 170px;
}

.btn.Grid {
  font-family: Rubik, sans-serif;
  background-color: #006400;
  border-radius: 15px;
  width: 25%;
  max-width: 320px;
  margin-left: calc(30% - 160px);
  margin-top: -20px;
}

@media (max-width: 1050px) {
  .travel.Grid {
    margin: 40px 2px 4px 110px;
    width: 100%;
  }
}

@media (max-width: 750px) {
  .travel.Grid {
    margin: 40px 2px 4px 0;
    width: 100%;
  }
  .content-info-preview {
    margin: -94px 15px 0 160px;
  }
  .btn.Grid {
    margin-top: -5px;
    margin-left: calc(50% - 160px);
  }
}

@media (max-width: 450px) {
  .title {
    margin-bottom: 30px;
  }
  .content-info-preview {
    margin: -120px 15px 0 160px;
  }
}

/*-----------------------------List View--------------------------------------*/

.travel.List {
  margin: 2px;
  width: 55%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.content-info-preview.List {
  position: static;
  margin: 0;
}

table {
  width: 80%;
  border-collapse: separate;
  border-spacing: 10px;
  table-layout: fixed;
  background-color: white;
  color: #2c2c2c;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 4px;
  text-align: left;
}

.table-button-container {
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
}

.button-view-list {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn.List {
  font-family: Rubik, sans-serif;
  background-color: #006400;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  margin: 0;
}

.btn:hover.List {
  background-color: #45a049;
}

@media (max-width: 767px) {

  .travel.List {
    width: 80%;
  }

  table th, table td {
    padding: 2px;
    font-size: 10px;
  }

  .btn.List {
    width: 40px;
    height: 40px;
    font-size: 10px;
    display: flex;
    text-align: center;
  }

}

</style>