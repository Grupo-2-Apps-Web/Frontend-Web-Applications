<script>
import AlertCard from '../components/alert-card.component.vue';
import { OnGoingTripService } from '../../registration/services/ongoing-trip.service.js';
import { Alert } from '../../registration/models/alert.entity.js';
import {AlertService} from "../../registration/services/alert.service.js";

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
      alertService: new AlertService(),
      alerts: [],
      alert: Alert,
    }
  },
  created() {
    this.alertService.getByTripId(this.id).then(response => {
      this.alerts = response.map(alert => new Alert(
        alert.id,
        alert.title,
        alert.description,
        alert.date,
        alert.tripId,
      ));
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