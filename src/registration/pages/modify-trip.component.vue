<script>


import {Trip} from "../models/trip.entity.js";
import {TripService} from "../services/trip.service.js";
import {DriverService} from "../services/driver.service.js";
import {VehicleService} from "../services/vehicle.service.js";
import {ClientService} from "../../user/services/client.service.js";

export default {
  name: "modify-trip.component",
  data() {
    return {
      id: this.$route.params.id,
      name: "",
      type: "",
      weight: 0,
      loadLocation: "",
      loadDate: "",
      unloadLocation: "",
      unloadDate: "",
      driverDni: "",
      driverId: 0,
      vehiclePlatePart1: "",
      vehiclePlatePart2: "",
      vehicleId: 0,
      clientRUC: "",
      clientId: 0,
      entrepreneurId: 0,
      evidenceLink: "",
      tripService: new TripService(),
      driverService: new DriverService(),
      vehicleService: new VehicleService(),
      clientService: new ClientService(),
    }
  },
  created() {
    this.tripService.getOne(this.id)
        .then(async response => {
          console.log(response.data);
          const trip = response.data;
          // format date from YYYY-MM-DDTHH:MM:SS to YYYY-MM-DD
          const loadDate = trip.tripData.loadDate.split('T')[0];
          const unloadDate = trip.tripData.unloadDate.split('T')[0];
          let driver = await this.driverService.getOne(trip.driverId);
          let vehicle = await this.vehicleService.getOne(trip.vehicleId);
          const plate = vehicle.data.plate.split('-');
          let client = await this.clientService.getOne(trip.clientId);
          if (trip) {
            this.name = trip.name.tripName;
            this.type = trip.cargoData.type;
            this.weight = trip.cargoData.weight;
            this.loadLocation = trip.tripData.loadLocation;
            this.loadDate = loadDate;
            this.unloadLocation = trip.tripData.unloadLocation;
            this.unloadDate = unloadDate;
            this.driverId = trip.driverId;
            this.driverDni = driver.data.dni;
            this.vehicleId = trip.vehicleId;
            this.vehiclePlatePart1 = plate[0];
            this.vehiclePlatePart2 = plate[1];
            this.clientId = trip.clientId;
            this.clientRUC = client.data.ruc;
            this.entrepreneurId = trip.entrepreneurId;
          }
        });
  },
  methods: {
    async saveChanges() {
      // validate driver dni
      let driver = await this.driverService.getByDNI(this.driverDni);
      if (driver === null) {
        alert('Driver not found');
        return;
      }
      this.driverId = driver.id;

      // validate vehicle plate
      let plate = `${this.vehiclePlatePart1.toUpperCase()}-${this.vehiclePlatePart2.toUpperCase()}`;
      let vehicle = await this.vehicleService.getByPlate(plate);
      if (vehicle === null) {
        alert('Vehicle not found');
        return;
      }
      this.vehicleId = vehicle.id;

      // validate client RUC
      let client = await this.clientService.getByRuc(this.clientRUC);
      if (client === null) {
        alert('Client not found');
        return;
      }
      this.clientId = client.id;
      const tripA = new Trip(
          this.id,
          this.name,
          this.type,
          Number(this.weight),
          this.loadLocation,
          this.loadDate,
          this.unloadLocation,
          this.unloadDate,
          Number(this.driverId),
          Number(this.vehicleId),
          Number(this.clientId),
          Number(this.entrepreneurId)
      );

      console.log(tripA);
      this.tripService.update(this.id, tripA)
          .then(() => {
            alert('Changes saved successfully.');
          })
          .then(() => {
                this.$router.push('/entrepreneur/register')
              }
          );
    },
    goBack() {
      this.$router.go(-1);
    }
  }

}
</script>
<template>
<div class="container">
  <h1>Modify Trip</h1>
  <div class="grid-container-2-columns">
    <div>
      <p>Name</p>
      <pv-inputtext v-model="name" style="width: 100%;"></pv-inputtext>
    </div>
    <div>
      <p>Type</p>
      <pv-inputtext v-model="type" style="width: 100%;"></pv-inputtext>
    </div>
  </div>
  <div class="grid-container-2-columns">
    <div>
      <p>Weight</p>
      <pv-inputtext type="number" v-model="weight" style="width: 100%;"></pv-inputtext>
    </div>
    <div>
      <p>Load Location</p>
      <pv-inputtext v-model="loadLocation" style="width: 100%;"></pv-inputtext>
    </div>
  </div>
  <div class="grid-container-2-columns">
    <div>
      <p>Load Date</p>
      <pv-inputtext type="date" v-model="loadDate" style="width: 100%;"></pv-inputtext>
    </div>
    <div>
      <p>Unload Location</p>
      <pv-inputtext v-model="unloadLocation" style="width: 100%;"></pv-inputtext>
    </div>
  </div>
  <div class="grid-container-2-columns">
    <div>
      <p>Unload Date</p>
      <pv-inputtext type="date" v-model="unloadDate" style="width: 100%;"></pv-inputtext>
    </div>
    <div>
      <p>Driver DNI</p>
      <pv-inputtext type="text" v-model="driverDni" maxlength="8" style="width: 100%;"></pv-inputtext>
    </div>
  </div>
  <div class="grid-container-2-columns">
    <div>
      <p>Vehicle Plate</p>
      <pv-inputtext v-model="vehiclePlatePart1" maxlength="3" style="width: 40%;" required></pv-inputtext>
      -
      <pv-inputtext v-model="vehiclePlatePart2" maxlength="3" style="width: 40%;" required></pv-inputtext>
    </div>
    <div>
      <p>Client RUC</p>
      <pv-inputtext type="text" v-model="clientRUC" maxlength="11" style="width: 100%;"></pv-inputtext>
    </div>
  </div>
  <div class="button">
    <pv-button @click="goBack" style="background-color: #870a0a; padding: 15px 45px;" >
      Cancel
    </pv-button>
    <pv-confirm-dialog id="confirm" />
    <pv-button @click="saveChanges" >
      Save
    </pv-button>
  </div>
</div>

</template>

<style scoped>
h1 {
  text-align:start;
}
.container {
  margin: 20px 90px;
}

.grid-container-2-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.button {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 2em;
}
</style>