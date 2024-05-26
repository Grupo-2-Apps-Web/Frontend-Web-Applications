<script>
import {ExpenseService} from "../services/expense.service.js";
import {Expense} from "../models/expense.entity.js";

export default {
  name: "modify-expense",
  data() {
    return {
      id: this.$route.params.id,
      tripId: 0,
      fuelAmount: 0,
      fuelDescription: '',
      tollsAmount: 0,
      tollsDescription: '',
      viaticsAmount: 0,
      viaticsDescription: ''
    }
  },
  created() {
    const expenseService = new ExpenseService();
    expenseService.getOne(this.id)
        .then(response => {
            this.id = response.data.id;
            this.tripId = response.data.trip_id;
            this.fuelAmount = response.data.fuel_amount;
            this.fuelDescription = response.data.fuel_description;
            this.tollsAmount = response.data.tolls_amount;
            this.tollsDescription = response.data.tolls_description;
            this.viaticsAmount = response.data.viatics_amount;
            this.viaticsDescription = response.data.viatics_description;
        });
  },
  methods: {
    saveChanges() {
      const expenseService = new ExpenseService();
      const expense = new Expense(
          this.id,
          this.tripId,
          Number(this.fuelAmount),
          this.fuelDescription,
          Number(this.viaticsAmount),
          this.viaticsDescription,
          Number(this.tollsAmount),
          this.tollsDescription
      )
      expenseService.update(expense.id, expense)
          .then(() => {
            alert('Changes saved successfully.');
          })
          .then(() => {
            this.$router.push('/entrepreneur/register')
          });
    },

    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>Modify Expenses</h1>
    <h2>Trip ID</h2>
    <div class="grid-container-1-column">
      <div>
        <pv-inputtext v-model="tripId" disabled style="width: 8%;"></pv-inputtext>
      </div>
    </div>
    <h2>Expenses</h2>
    <div class="grid-container-2-columns">
      <div>
        <p>Diesel Gasoline - Amount</p>
        <pv-inputtext type="number" v-model="fuelAmount" style="width: 50%;"></pv-inputtext>
      </div>
      <div>
        <p>Diesel Gasoline - Details</p>
        <pv-textarea v-model="fuelDescription" style="width: 100%;"></pv-textarea>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Toll - Amount</p>
        <pv-inputtext type="number" v-model="tollsAmount" style="width: 50%;"></pv-inputtext>
      </div>
      <div>
        <p>Toll - Details</p>
        <pv-textarea v-model="tollsDescription" style="width: 100%;"></pv-textarea>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Viatics - Amount</p>
        <pv-inputtext type="number" v-model="viaticsAmount" style="width: 50%;"></pv-inputtext>
      </div>
      <div>
        <p>Viatics - Details</p>
        <pv-textarea v-model="viaticsDescription" style="width: 100%;"></pv-textarea>
      </div>
    </div>
    <div class="buttons">
      <pv-button @click="goBack" style="background-color: #870a0a; padding: 15px 45px; position: absolute; bottom: 20px; left: 20px;" >
        Cancel
      </pv-button>
      <pv-button @click="saveChanges" style="background-color: #006400; padding: 15px 45px; position: absolute; bottom: 20px; right: 20px;" >
        Save
      </pv-button>
    </div>
  </div>
</template>

<style scoped>
h1, h2 {
  text-align:start;
}
.container {
  margin: 20px 90px;
  position: relative;
  padding-bottom: 120px;
}

.grid-container-1-column {
  display: grid;
  grid-template-columns: 1fr;
}

.grid-container-2-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.buttons {
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}

</style>