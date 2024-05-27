<script>
import {DriverService} from "../services/driver.service.js";

export default {
  name: "modify-request-dni.component",
  data(){
    return {
      dni: '',
      driverId: 0
    }
  },
  methods: {
    isNumeric(value) {
      const re = /^\d+$/;
      return re.test(String(value));
    },
    async handleNextButton(){
      if(!this.isNumeric(this.dni)){
        alert('Please enter a valid DNI.');
      }
      else {
        const driverService = new DriverService();
        let response;

        response = await driverService.getByDNI(this.dni);
        if (response) {
          this.driverId = response.id;
        }

        if (response) {
          this.$router.push(`/entrepreneur/modify/driver/${this.driverId}`);
        } else {
          alert('DNI is not registered. Please enter a valid DNI.');
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
        <h1 class="title">Modify Driver</h1>
      </template>
      <template v-slot:content>
        <p class="instruction">Enter the DNI of the Driver to modify the information</p>
        <div class="input-group">
          <pv-inputtext id="dni" v-model="dni" placeholder="DNI: 09123456" maxlength="8"></pv-inputtext>
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
  flex-direction: column;
  align-items: center;
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