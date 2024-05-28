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
          response.data.name,
          response.data.type,
          response.data.weight,
          response.data.load_location,
          response.data.load_date,
          response.data.unload_location,
          response.data.unload_date,
          response.data.driver_id,
          response.data.vehicle_id,
          response.data.client_id,
          response.data.entrepreneur_id
      );

      this.evidenceService.getOne(this.trip.id).then(response => {
        this.evidence = new Evidence(
          response.data.id,
          response.data.trip_id,
          response.data.link
        );
      });

      this.driverService.getOne(this.trip.driver_id).then(response => {
        this.driver = new Driver(
          response.data.id,
          response.data.name,
          response.data.dni,
          response.data.license,
          response.data.contact_number
        );
      });

      this.vehicleService.getOne(this.trip.vehicle_id).then(response => {
        this.vehicle = new Vehicle(
          response.data.id,
          response.data.model,
          response.data.plate,
          response.data.tractor_plate,
          response.data.max_load,
          response.data.volume
        );
      });

      this.entrepreneurService.getOne(this.trip.entrepreneur_id).then(response => {
        this.entrepreneur = new Entrepreneur(
          response.data.id,
          response.data.logo_image,
          response.data.user_id,
        );

        this.userService.getOne(this.entrepreneur.user_id).then(response => {
          this.user = new User(
            response.data.id,
            response.data.name,
            response.data.email,
            response.data.phone,
            response.data.password,
            response.data.ruc,
            response.data.address,
            response.data.subscription
          );
        });

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
          {{ trip.load_date }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>UNLOAD DATE:</strong>
          {{ trip.unload_date }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>LOAD LOCATION:</strong>
          {{ trip.load_location }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>UNLOAD LOCATION:</strong>
          {{ trip.unload_location }}
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
          {{ vehicle.tractor_plate }}
        </p>
      </div>

      <div class="container-info">
        <p>
          <strong>COMPANY:</strong>
           {{ user.name }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>RUC: </strong>
          {{ user.ruc }}
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