<template>
  <div class="vehicle" :class="getView">
    <div v-if="getView === 'List'">
      <div class="table-button-container">
        <table>
          <tbody>
          <tr>
            <td>{{vehicle.id}}</td>
            <td>{{vehicle.plate}}</td>
            <td>{{vehicle.model}}</td>
          </tr>
          </tbody>
        </table>
        <div class="button-view-list">
          <pv-button label="View more" :class="['btn', getView]" @click="goToVehicle(vehicle.id)"></pv-button>
        </div>
      </div>
    </div>
    <div v-else>
      <pv-card class="vehicle-card">
        <template #content>
          <div class="title">
            <h2>ID: {{vehicle.id}}</h2>
          </div>
          <div class="content-info-preview">
            <p>PLATE: {{vehicle.plate}}</p>
            <p>MODEL: {{vehicle.model}}</p>
          </div>
        </template>
      </pv-card>
      <div class="btn-container">
        <pv-button label="View more" :class="['btn', getView]" @click="goToVehicle(vehicle.id)"></pv-button>
      </div>

    </div>
  </div>
</template>

<script>
import {Vehicle} from "../../registration/models/vehicle.entity.js";
import {useRouter} from "vue-router";
import { mapGetters } from 'vuex';

export default {
  name: "vehicle-card",
  props: {
    vehicle: {
      type: Vehicle,
      required: true
    }
  },
  setup(){
    const router = useRouter();
    const goToVehicle = (id) => {
      const newPath = `/entrepreneur/vehicles/${id}`;
      router.push(newPath);
    }
    return{
      goToVehicle
    };
  },
  computed: {
    ...mapGetters(['getView'])
  }
}
</script>

<style scoped>

h2, h3{
  font-family: Roboto, sans-serif;
  color: black;
}
p{
  font-family: Roboto, sans-serif;
  color: black;
}

.vehicle.Grid {
  margin: 40px 0 4px auto;
  width: 75%;
  display: flex;
  flex-direction: column;
}

.vehicle.Grid {
  flex-wrap: wrap;
  justify-content: space-between;
}

.vehicle-card {
  background-color: #FFA500;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  height: 100%;
  max-width: 700px;
}

.vehicle-card.Grid {
  max-width: 500px;
}

.content-info-preview {
  width: 250px;
  position: absolute;
  margin: -94px 15px 0 180px;
}

@media (max-width: 1050px) {
  .vehicle {
    margin: 40px 2px 4px 110px;
    width: 100%;
  }
}

@media (max-width: 750px) {
  .vehicle {
    margin: 40px 2px 4px 0;
    width: 100%;
  }
  .content-info-preview {
    width: 240px;
    margin: -80px 0 0 180px;
    font-size: 0.9em;
  }
  .btn {
    margin-left: 250px;
    margin-top: -5px;
  }
}

@media (max-width: 450px) {
  .title {
    margin-bottom: 30px;
  }
  .content-info-preview {
    margin: -80px 0 0 180px;
  }
}

.btn.Grid {
  font-family: Rubik, sans-serif;
  background-color: #006400;
  border-radius: 15px;
  width: 25%;
  max-width: 320px;
  margin-left: 250px;
  margin-top: -25px;
}

/*-----------------------------List View--------------------------------------*/

.vehicle.List {
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


@media (max-width: 500px) {

  .vehicle-card {
    width: 230px;
    font-size: 0.9em;
    height: 320px;
  }

  .content-info-preview {
    width: 100px;
    margin: -10px 0 0 90px;
    font-size: 0.9em;
  }
  .btn-container {
    margin-left: -210px;
    margin-top: -5px;
  }


}

@media (500px <= width <=  695px) {
  .content-info-preview {
    width: 200px;
    margin: -60px 370px 0 90px;
    font-size: 0.8em;
  }
}

</style>