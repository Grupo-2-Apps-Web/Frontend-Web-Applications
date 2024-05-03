<script>
import {Trip} from "../models/trip.entity.js";
import {useRouter} from "vue-router";

export default {
  name: "trip-card",
  props: {
    trip: {
      type: Trip,
      required: true
    }
  },
  setup(){
    const router = useRouter();
    const goToTrip = (id) => {
      router.push(`/client/history/${id}`);
    }
    return{
      goToTrip
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric'  };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
}

</script>

<template>
  <div class="trip">
    <pv-card class="trip-card">
      <template #content>
        <div class="title">
          <h2>{{trip.name}}</h2>
          <h3>ID: {{trip.id}}</h3>
        </div>
        <div class="content-info-preview">
          <p>LOAD DATE: {{ formatDate(trip.loadDate) }}</p>
          <p>LOAD LOCATION: {{ trip.loadLocation }}</p>
        </div>
      </template>
    </pv-card>
    <pv-button label="View more" class="btn" @click="goToTrip(trip.id)"></pv-button>
  </div>
</template>

<style scoped>
h2, h3{
  font-family: Roboto, sans-serif;
  color: black;
}
p{
  font-family: Roboto, sans-serif;
  color: black;
}

.trip {
  margin: 40px 0 4px auto;
  width: 75%;
  display: flex;
  flex-direction: column;
}

.trip-card {
  background-color: #FFA500;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  height: 100%;
  max-width: 700px;
}

.content-info-preview {
  position: absolute;
  margin: -94px 15px 0 170px;
}

.btn {
  font-family: Rubik, sans-serif;
  background-color: #006400;
  border-radius: 15px;
  width: 25%;
  max-width: 320px;
  margin-left: 250px;
  margin-top: -25px;
}

@media (max-width: 1050px) {
  .trip {
    margin: 40px 2px 4px 110px;
    width: 100%;
  }
}

@media (max-width: 750px) {
  .trip {
    margin: 40px 2px 4px 0;
    width: 100%;
  }
  .content-info-preview {
    margin: -94px 15px 0 210px;
  }
  .btn {
    margin-left: 250px;
    margin-top: -5px;
  }
}

@media (max-width: 450px) {
  .title {
    margin-bottom: 30px;
  }
  .content-info-preview {
    margin: -120px 15px 0 170px;
  }
}


</style>