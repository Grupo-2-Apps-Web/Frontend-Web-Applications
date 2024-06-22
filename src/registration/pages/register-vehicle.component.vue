<script>
import { useRouter } from 'vue-router';
import { ref, reactive } from "vue";
import { useConfirm } from 'primevue/useconfirm';
import { VehicleService } from "../services/vehicle.service.js";
import {Vehicle} from "../models/vehicle.entity.js";

export default {
  name: "register-vehicle.component",
  setup() {
    const router = useRouter();
    const confirm = useConfirm();
    const isVisible = ref(false);
    const vehicleService = new VehicleService();
    const vehicleData = reactive({
      id: 0,
      model: '',
      plate1: '',
      plate2: '',
      tractor_plate1: '',
      tractor_plate2: '',
      max_load: 0,
      volume: 0
    });

    const isValidPlate = (plate1, plate2) => {
      const re = /^[A-Za-z0-9]+$/;
      return re.test(plate1) && re.test(plate2);
    };
    const openDialog = () => {
      if (!vehicleData.model || !vehicleData.plate1 || !vehicleData.plate2 || !vehicleData.tractor_plate1 || !vehicleData.tractor_plate2 || !vehicleData.max_load || !vehicleData.volume) {
        alert('All fields are required');
        return;
      }
      // Validate Plates
      if (!isValidPlate(vehicleData.plate1, vehicleData.plate2) || !isValidPlate(vehicleData.tractor_plate1, vehicleData.tractor_plate2)) {
        alert('Plate fields must be alphanumeric');
        return;
      }
      if (vehicleData.plate1.length !== 3 || vehicleData.plate2.length !== 3 || vehicleData.tractor_plate1.length !== 3 || vehicleData.tractor_plate2.length !== 3) {
        alert('Plates must have 6 characters');
        return;
      }
      // Validate Max Load and Volume
      if (vehicleData.max_load <= 0 || vehicleData.volume <= 0) {
        alert('Max Load and Volume must be greater than 0');
        return;
      }
      confirm.require({
        message: 'The data requested for the vehicle will be recorded. Are you sure you want to record it?',
        header: 'Register Vehicle',
        onShow: () => {
          isVisible.value = true;
        },
        onHide: () => {
          isVisible.value = false;
        },
        accept: () => {
          vehicleService.getAll().then(response => {
            const vehicles = response.data;
            let plate = `${vehicleData.plate1.toUpperCase()}-${vehicleData.plate2.toUpperCase()}`;
            let tractor_plate = `${vehicleData.tractor_plate1.toUpperCase()}-${vehicleData.tractor_plate2.toUpperCase()}`;
            const vehicle = vehicles.find(vehicle => vehicle.plate === plate);
            if (vehicle) {
              alert('The vehicle already exists. Plate is registered.');
            } else {
              const newVehicle = new Vehicle(
                  0,
                  vehicleData.model,
                  plate,
                  tractor_plate,
                  Number(vehicleData.max_load),
                  Number(vehicleData.volume)
              );
              vehicleService.create(newVehicle);
              alert('Vehicle registered successfully');
              goBack();
            }
          });

        }
      });
    };


    const goBack = () => {
      router.go(-1);
    }

    return {
      openDialog,
      goBack,
      vehicleData,
      isVisible
    };
  }
}
</script>

<template>
  <div class="container">
    <h1>Register Vehicle</h1>
    <div class="grid-container-1-column">
      <div>
        <p>Model</p>
        <pv-inputtext v-model="vehicleData.model" style="width: 50%;" required></pv-inputtext>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Plate</p>
        <pv-inputtext v-model="vehicleData.plate1" maxlength="3" style="width: 40%;" required></pv-inputtext>
        -
        <pv-inputtext v-model="vehicleData.plate2" maxlength="3" style="width: 40%;" required></pv-inputtext>
      </div>
      <div>
        <p>Tractor Plate</p>
        <pv-inputtext v-model="vehicleData.tractor_plate1" maxlength="3" style="width: 40%;" required></pv-inputtext>
        -
        <pv-inputtext v-model="vehicleData.tractor_plate2" maxlength="3" style="width: 40%;" required></pv-inputtext>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Max Load</p>
        <pv-inputtext type="number" v-model="vehicleData.max_load" style="width: 50%;" required></pv-inputtext>
      </div>
      <div>
        <p>Volume</p>
        <pv-inputtext type="number" v-model="vehicleData.volume" style="width: 50%;" required></pv-inputtext>
      </div>
    </div>
    <div class="button">
      <pv-button @click="goBack" style="background-color: #870a0a; padding: 15px 45px;" >
        Cancel
      </pv-button>
      <pv-confirm-dialog id="confirm" />
      <pv-button @click="openDialog()" label="Confirm" :aria-expanded="isVisible" :aria-controls="isVisible ? 'confirm' : null"
                 style="background-color: #006400; padding: 15px 45px;" >
        Register
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

.button {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 2em;
}
</style>