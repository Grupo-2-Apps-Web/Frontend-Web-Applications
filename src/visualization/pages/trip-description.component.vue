<script>
import { TripService } from '../../registration/services/trip.service.js';
import { Trip } from '../../registration/models/trip.entity.js';
import {Evidence} from "../../registration/models/evidence.entity.js";
import {EvidenceService} from "../../registration/services/evidence.service.js";
import {DriverService} from "../../registration/services/driver.service.js";
import {Driver} from "../../registration/models/driver.entity.js";
import {VehicleService} from "../../registration/services/vehicle.service.js";
import {Vehicle} from "../../registration/models/vehicle.entity.js";
import {EntrepreneurService} from "../../user/services/entrepreneur.service.js";
import {Entrepreneur} from "../../user/models/entrepreneur.entity.js";
import {UserService} from "../../user/services/user.service.js";
import {User} from "../../user/models/user.entity.js";


export default {
  name: "trip-description",
  computed: {
    id(){
      return this.$route.params.id;
    }
  },
  data() {
    return {
      trip: Trip,
      evidence: Evidence,
      driver: Driver,
      vehicle: Vehicle,
      entrepreneur: Entrepreneur,
      user: User,
      tripService: new TripService(),
      evidenceService: new EvidenceService(),
      driverService: new DriverService(),
      vehicleService: new VehicleService(),
      entrepreneurService: new EntrepreneurService(),
      userService: new UserService()
    }
  },
  created() {
    this.tripService.getOne(this.id).then(response => {
      this.trip = new Trip(
          response.data.id,
          response.data.name.tripName,
          response.data.cargoData.type,
          response.data.cargoData.weight,
          response.data.tripData.loadLocation,
          response.data.tripData.loadDate,
          response.data.tripData.unloadLocation,
          response.data.tripData.unloadDate,
          response.data.driverId,
          response.data.vehicleId,
          response.data.clientId,
          response.data.entrepreneurId
      );

      this.evidenceService.getByTripId(this.trip.id).then(response => {
        this.evidence = new Evidence(
          response.data.id,
          response.data.link,
          response.data.tripId
        );
      });

      this.driverService.getOne(this.trip.driverId).then(response => {
        this.driver = new Driver(
          response.data.id,
          response.data.name,
          response.data.dni,
          response.data.license,
          response.data.contactNumber
        );
      });

      this.vehicleService.getOne(this.trip.vehicleId).then(response => {
        this.vehicle = new Vehicle(
          response.data.id,
          response.data.model,
          response.data.plate,
          response.data.tractorPlate,
          response.data.maxLoad,
          response.data.volume
        );
      });

      this.entrepreneurService.getOne(this.trip.entrepreneurId).then(response => {
        this.entrepreneur = new Entrepreneur(
          response.data.id,
          response.data.name,
          response.data.phone,
          response.data.ruc,
          response.data.address,
          response.data.subscription,
          response.data.userId,
          response.data.logoImage,
        );
      });
    });
  }
}
</script>

<template>
  <pv-button style="margin-top: 20px; margin-left: 10px;" @click="this.$router.go(-1);">Return</pv-button>
  <div class="container-general">
    <div class="evidence">
      <h2>Evidence</h2>
      <img :src="evidence.link" width="400" alt="Evidence for trip">
    </div>
    <div class="container-info-general">
      <h1>{{ trip.name }}</h1>
      <div class="container-info">
        <p>
          <strong>ID:</strong>
          {{ trip.id }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>LOAD DATE:</strong>
          {{ trip.loadDate }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>UNLOAD DATE:</strong>
          {{ trip.unloadDate }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>LOAD LOCATION:</strong>
          {{ trip.loadLocation }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>UNLOAD LOCATION:</strong>
          {{ trip.unloadLocation }}
        </p>
      </div>

      <div class="container-info">
        <p>
          <strong>DRIVER:</strong>
          {{ driver.name }}
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
          <strong>TRACTOR PLATE: </strong>
          {{ vehicle.tractorPlate }}
        </p>
      </div>

      <div class="container-info">
        <p>
          <strong>COMPANY:</strong>
           {{ entrepreneur.name }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>RUC: </strong>
          {{ entrepreneur.ruc }}
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>

.container-general {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container-general img {
  width: 70%;
}

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
  .container-general {
    flex-direction: row;
  }

  .container-general img {
    margin-right: 200px;
    margin-bottom: 0;
  }

  .container-info {
    width: 721px;
  }
}


</style>