<script>
import {useRouter} from "vue-router";
import {TripService} from "../services/trip.service.js";
import {ExpenseService} from "../services/expense.service.js";

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
      const tripService = new TripService();
      const expenseService = new ExpenseService();
      let response;

      if (this.$route.path.includes('expense')) {
        response = await expenseService.getByTripId(this.tripId);
        if(response){
          this.expenseId = response.data.id;
        }
      } else if (this.$route.path.includes('trip')) {
        response = await tripService.getOne(this.tripId);
      }

      if (response && response.data.length > 0){
        if (this.$route.path.includes('expense')) {
          this.$router.push(`/entrepreneur/modify/expense/${this.expenseId}`);
        } else if (this.$route.path.includes('trip')) {
          this.$router.push(`/entrepreneur/modify/trip/${this.tripId}`);
        }
      } else {
        alert('The ID does not exist. Please enter a valid ID.');
      }
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