<script>
import {VehicleService} from "../services/vehicle.service.js";
import {Vehicle} from "../models/vehicle.entity.js";

export default {
  name: "modify-vehicle.component",
  data() {
    return {
      id: this.$route.params.id,
      model: '',
      plate: '',
      plate1: '',
      plate2: '',
      tractor_plate: '',
      tractor_plate1: '',
      tractor_plate2: '',
      max_load: 0,
      volume: 0
    }
  },
  created() {
    const splitPlate = (plate) => {
      return plate.split('-');
    };

    const vehicleService = new VehicleService();
    vehicleService.getOne(this.id)
        .then(response => {
          this.id = response.data.id;
          this.model = response.data.model;
          this.plate = response.data.plate;
          this.tractor_plate = response.data.tractorPlate;
          this.max_load = response.data.maxLoad;
          this.volume = response.data.volume;

          // Split plate and tractor_plate
          // EXAMPLE: "ABC-123" -> "ABC", "123"
          const plateArray = splitPlate(this.plate);
          this.plate1 = plateArray[0];
          this.plate2 = plateArray[1];
          const tractorPlateArray = splitPlate(this.tractor_plate);
          this.tractor_plate1 = tractorPlateArray[0];
          this.tractor_plate2 = tractorPlateArray[1];
        });
  },
  methods: {
    saveChanges() {
      const isValidPlate = (plate1, plate2) => {
        const re = /^[A-Za-z0-9]+$/;
        return re.test(plate1) && re.test(plate2);
      };
      if(this.model === '' || this.plate1 === '' || this.plate2 === '' || this.tractor_plate1 === '' || this.tractor_plate2 === '' || this.max_load === 0 || this.volume === 0) {
        alert('All fields are required.');
        return;
      }
      // Validate plates
      if (!isValidPlate(this.plate1, this.plate2) || !isValidPlate(this.tractor_plate1, this.tractor_plate2)) {
        alert('Enter a valid Plate');
        return;
      }

      // Update plates
      this.plate = `${this.plate1.toUpperCase()}-${this.plate2.toUpperCase()}`;
      this.tractor_plate = `${this.tractor_plate1.toUpperCase()}-${this.tractor_plate2.toUpperCase()}`;

      const vehicleService = new VehicleService();
      const vehicle = new Vehicle(
          this.id,
          this.model,
          this.plate,
          this.tractor_plate,
          this.max_load,
          this.volume

      )
      vehicleService.update(vehicle.id, vehicle)
          .then(() => {
            alert('Changes saved successfully.');
          })
          .then(() => {
            this.$router.push('/entrepreneur/register')
          });
    },

    goBack() {
      this.$router.go(-1);
    }
  }

}
</script>

<template>
  <div class="container">
    <h1>Modify Vehicle</h1>
    <div class="grid-container-1-column">
      <div>
        <p>Model</p>
        <pv-inputtext v-model="model" style="width: 30%;" required></pv-inputtext>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Plate</p>
        <pv-inputtext v-model="plate1" maxlength="3" style="width: 10%;" required></pv-inputtext>
        -
        <pv-inputtext v-model="plate2" maxlength="3" style="width: 10%;" required></pv-inputtext>
      </div>
      <div>
        <p>Tractor Plate</p>
        <pv-inputtext v-model="tractor_plate1" maxlength="3" style="width: 10%;" required></pv-inputtext>
        -
        <pv-inputtext v-model="tractor_plate2" maxlength="3" style="width: 10%;" required></pv-inputtext>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Max Load</p>
        <pv-inputtext type="number" v-model="max_load" style="width: 50%;" required></pv-inputtext>
      </div>
      <div>
        <p>Volume</p>
        <pv-inputtext type="number" v-model="volume" style="width: 50%;" required></pv-inputtext>
      </div>
    </div>
    <div class="buttons">
      <pv-button @click="goBack" style="background-color: #870a0a; padding: 15px 45px;" >
        Cancel
      </pv-button>
      <pv-button @click="saveChanges" style="background-color: #006400; padding: 15px 45px;" >
        Save
      </pv-button>
    </div>
  </div>
</template>

<style scoped>
h1, h2 {
  text-align:start;
}
.container {
  margin: 20px 90px;
  position: relative;
  padding-bottom: 120px;
}

.grid-container-1-column {
  display: grid;
  grid-template-columns: 1fr;
}

.grid-container-2-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 2em;
}
</style>