<script>
import {VehicleService} from "../services/vehicle.service.js";

export default {
  name: "modify-request-plate.component",
  data(){
    return {
      plate1: '',
      plate2: '',
      vehicleId: 0
    }
  },
  methods: {
    isValidPlate(plate1, plate2) {
      const re = /^[A-Za-z0-9]+$/;
      return re.test(plate1) && re.test(plate2);
    },
    async handleNextButton(){
      if (!this.isValidPlate(this.plate1, this.plate2)) {
        alert('Please enter a valid Plate');
      }
      else {
        const vehicleService = new VehicleService();
        let plate = `${this.plate1.toUpperCase()}-${this.plate2.toUpperCase()}`;
        let response;

        response = await vehicleService.getByPlate(plate);
        if (response) {
          this.vehicleId = response.id;
        }

        if (response) {
          this.$router.push(`/entrepreneur/modify/vehicle/${this.vehicleId}`);
        } else {
          alert('Plate is not registered. Please enter a valid Plate.');
        }
      }
    },
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<template>
  <div class="container">
    <pv-card class="pv-card">
      <template v-slot:title>
        <h1 class="title">Modify Vehicle</h1>
      </template>
      <template v-slot:content>
        <p class="instruction">Enter the Plate of the Vehicle to modify the information</p>
        <div class="input-group">
          <pv-inputtext v-model="plate1" placeholder="ABC" maxlength="3" style="width: 20%;"></pv-inputtext>
          -
          <pv-inputtext v-model="plate2" placeholder="123" maxlength="3" style="width: 20%;"></pv-inputtext>
        </div>
      </template>
      <template v-slot:footer>
        <div class="next-button">
          <pv-button style="background-color: #870a0a; margin-right: 10px;" @click="goBack">Discard</pv-button>
          <pv-button @click="handleNextButton">Enter</pv-button>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.pv-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.title {
  text-align: center;
}

.input-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.input-group label {
  margin-bottom: 10px;
}

.next-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
}
</style>