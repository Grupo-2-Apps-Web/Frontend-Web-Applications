<script>
import {Driver} from "../../registration/models/driver.entity.js";
import {DriverService} from "../../registration/services/driver.service.js";

export default {
  name: "driver-description",
  computed: {
    id(){
      return this.$route.params.id;
    }
  },
  data() {
    return {
      driver: Driver,
      driverService: new DriverService()
    }
  },
  created() {
    this.driverService.getOne(this.id).then(response => {
      this.driver = new Driver(
          response.data.id,
          response.data.name,
          response.data.dni,
          response.data.license,
          response.data.contact_number
      );
    });

  }
}
</script>

<template>
  <pv-button style="margin-top: 20px; margin-left: 10px;" @click="this.$router.go(-1);">Return</pv-button>
  <div class="container-info-general">
    <h1>Driver Info</h1>
    <div class="container-info">
      <p>
        <strong>ID:</strong>
        {{ driver.id }}
      </p>
    </div>
    <div class="container-info">
      <p>
        <strong>NAME:</strong>
        {{ driver.name }}
      </p>
    </div>
    <div class="container-info">
      <p>
        <strong>DNI:</strong>
        {{ driver.dni }}
      </p>
    </div>
    <div class="container-info">
      <p>
        <strong>LICENSE:</strong>
        {{ driver.license }}
      </p>
    </div>
    <div class="container-info">
      <p>
        <strong>CONTACT NUMBER:</strong>
        {{ driver.contact_number }}
      </p>
    </div>
  </div>
</template>

<style scoped>

.container-general h1 {
  text-align: center;
}
.container-info-general {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container-info {
  background-color: #FFA500;
  width: 80%;
  margin-bottom: 10px;
}

.container-info p {
  padding: 0 10px;
}

@media (min-width: 1300px) {

  .container-general img {
    margin-right: 200px;
    margin-bottom: 0;
  }

  .container-info {
    width: 721px;
  }
}
</style>