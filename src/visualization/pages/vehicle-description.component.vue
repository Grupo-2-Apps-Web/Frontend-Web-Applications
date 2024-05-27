<script>
import {Vehicle} from "../../registration/models/vehicle.entity.js";
import {VehicleService} from "../../registration/services/vehicle.service.js";

export default {
  name: "vehicle-description",
  computed: {
    id(){
      return this.$route.params.id;
    }
  },
  data() {
    return {
      vehicle: Vehicle,
      vehicleService: new VehicleService()
    }
  },
  created() {
    this.vehicleService.getOne(this.id).then(response => {
      this.vehicle = new Vehicle(
          response.data.id,
          response.data.model,
          response.data.plate,
          response.data.tractor_plate,
          response.data.max_load,
          response.data.volume
      );
    });

  }
}
</script>

<template>
  <pv-button style="margin-top: 20px; margin-left: 10px;" @click="this.$router.go(-1);">Return</pv-button>
  <div class="container-info-general">
    <h1>Vehicle Info</h1>
    <div class="container-info">
      <p>
        <strong>ID:</strong>
        {{ vehicle.id }}
      </p>
    </div>
    <div class="container-info">
      <p>
        <strong>MODEL:</strong>
        {{ vehicle.model }}
      </p>
    </div>
    <div class="container-info">
      <p>
        <strong>PLATE:</strong>
        {{ vehicle.plate }}
      </p>
    </div>
    <div class="container-info">
      <p>
        <strong>TRACTOR PLATE:</strong>
        {{ vehicle.tractor_plate }}
      </p>
    </div>
    <div class="container-info">
      <p>
        <strong>MAX LOAD:</strong>
        {{ vehicle.max_load }}
      </p>
    </div>
    <div class="container-info">
      <p>
        <strong>VOLUME:</strong>
        {{ vehicle.volume }}
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