<script>
import AlertCard from './alert-card.component.vue';
import { OnGoingTripService } from '../services/ongoing-trip.service.js';
import { Alert } from '../models/alert.entity.js';

export default {
  name: "alert-list",
  components: {
    AlertCard
  },
  computed: {
    id(){
      return this.$route.params.id;
    }
  },
  data() {
    return {
      alertAPI: new OnGoingTripService(),
      alerts: [],
      alert: Alert,
    }
  },
  created() {
    this.alertAPI.getTripByID(this.id).then(response => {
      response.data[0].alerts.forEach(alert => {
        this.alerts.push(new Alert(
          alert.type,
          alert.description,
          alert.date
        ));
      });
    });
  },
}
</script>

<template>
  <pv-button style="margin-top: 20px; margin-left: 10px;" @click="this.$router.go(-1);">Return</pv-button>
  <div>
    <h1>Alerts</h1>
    <div class="alerts">
      <div v-for="alert in alerts" :key="alert.description">
        <alert-card :alert="alert"></alert-card>
      </div>
    </div>

  </div>
</template>

<style scoped>
.alerts{
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 80%;
  margin: 0 auto;
}
</style>