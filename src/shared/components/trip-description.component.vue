<script>
import { TripService } from '../../client/services/trip.service.js';
import { Trip } from '../../client/models/trip.entity.js';

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
      tripService: new TripService()
    }
  },
  created() {
    this.tripService.getTripByID(this.id).then(response => {
      this.trip = new Trip(
          response.data[0].id,
          response.data[0].name,
          response.data[0].cargo.loadDate,
          response.data[0].cargo.unloadDate,
          response.data[0].cargo.loadLocation,
          response.data[0].cargo.unloadLocation,
          response.data[0].driver.fullName,
          response.data[0].vehicle.plate,
          response.data[0].vehicle.tractorPlate,
          response.data[0].company.name,
          response.data[0].company.ruc,
          response.data[0].cargo.loadImage
      );
    });
  }
}
</script>

<template>
  <pv-button style="margin-top: 20px; margin-left: 10px;" @click="this.$router.go(-1);">Return</pv-button>
  <div class="container-general">
    <div class="evidence">
      <h2>Evidence</h2>
      <img :src="trip.evidence" width="400">
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