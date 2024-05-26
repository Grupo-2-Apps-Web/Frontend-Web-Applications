<script>
import { TripService } from '../../registration/services/trip.service.js';
import { Trip } from '../../registration/models/trip.entity.js';
import {Evidence} from "../../registration/models/evidence.entity.js";
import {EvidenceService} from "../../registration/services/evidence.service.js";

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
      tripService: new TripService(),
      evidenceService: new EvidenceService()
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
      <!-- MISSING DRIVER AND TRAILER ENDPOINT CALLING
      <div class="container-info">
        <p>
          <strong>DRIVER:</strong>
           {{ trip.driver }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>PLATE:</strong>
          {{ trip.trailerPlate }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>TRACTOR PLATE: </strong>
          {{ trip.tractorPlate }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>COMPANY:</strong>
           {{ trip.company }}
        </p>
      </div>
      <div class="container-info">
        <p>
          <strong>RUC: </strong>
          {{ trip.ruc }}
        </p>
      </div>
      -->
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