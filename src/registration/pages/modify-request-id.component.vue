<script>
import {TripService} from "../services/trip.service.js";
import {ExpenseService} from "../services/expense.service.js";
import {EntrepreneurService} from "../../user/services/entrepreneur.service.js";

export default {
  data(){
    return {
      tripId: 0,
      expenseId: 0
    }
  },
  computed: {
    title() {
      return this.$route.path.includes('expense') ? 'Modify Expenses' : 'Modify Trips';
    }
  },
  methods: {
    async handleNextButton(){
      let userId = localStorage.getItem('user_id');
      const entrepreneurService = new EntrepreneurService();
      const tripService = new TripService();
      const expenseService = new ExpenseService();
      let response;

      entrepreneurService.getByUserId(userId).then((r) => {
        let entrepreneurId = Number(r.data.id);
        if (this.$route.path.includes('expense')) {
          expenseService.getByTripId(this.tripId).then((response) => {
              let trip = response.data;
              if (Number(trip.entrepreneurId) !== entrepreneurId) {
                alert('You are not authorized to modify this expense');
                return;
              }
              this.expenseId = trip.id;
              this.$router.push(`/entrepreneur/modify/expense/${this.expenseId}`);
          }).catch((error) => {
            alert('There are no expenses registered for this trip');
          });
        } else if (this.$route.path.includes('trip')) {
          tripService.getOne(this.tripId).then((response) => {
            let trip = response.data;
            if (Number(trip.entrepreneurId) !== entrepreneurId) {
              alert('You are not authorized to modify this trip');
              return;
            }
            this.tripId = trip.id;
            this.$router.push(`/entrepreneur/modify/trip/${this.tripId}`);
          }).catch((error) => {
            alert('The Trip ID does not exist. Please enter a valid ID.');
          });
        }
      })


    },
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<template>
  <div class="container">
    <pv-card class="pv-card">
      <template v-slot:title>
        <h1 class="title">{{title}}</h1>
      </template>
      <template v-slot:content>
        <p class="instruction">Enter the ID of the Trip to modify the information</p>
        <div class="input-group">
          <pv-inputtext id="trip-id" v-model="tripId" placeholder="ID: 1"></pv-inputtext>
        </div>
      </template>
      <template v-slot:footer>
        <div class="next-button">
          <pv-button style="background-color: #870a0a; margin-right: 10px;" @click="goBack">Discard</pv-button>
          <pv-button @click="handleNextButton">Enter</pv-button>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.pv-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.title {
  text-align: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.input-group label {
  margin-bottom: 10px;
}

.next-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
}
</style>