
<script>
import {ExpenseService} from "../../client/services/expense.service.js";

export default {
  name: "modify-expense",
  data() {
    return {
      id: this.$route.params.id,
      fuelAmount: '',
      fuelDescription: '',
      tollAmount: '',
      tollDescription: '',
      viaticsAmount: '',
      viaticsDescription: ''
    }
  },
  created() {
    const expenseService = new ExpenseService();
    expenseService.getExpensesByID(this.id)
        .then(response => {
          const expense = response.data.find(expense => expense.id === this.id);
          if (expense) {
            this.fuelAmount = expense.fuel.amount;
            this.fuelDescription = expense.fuel.description;
            this.tollAmount = expense.toll.amount;
            this.tollDescription = expense.toll.description;
            this.viaticsAmount = expense.viatics.amount;
            this.viaticsDescription = expense.viatics.description;
          }
        });
  },
  methods: {
    saveChanges() {
      const expenseService = new ExpenseService();
      const expense = {
        fuel: {
          amount: this.fuelAmount,
          description: this.fuelDescription
        },
        toll: {
          amount: this.tollAmount,
          description: this.tollDescription
        },
        viatics: {
          amount: this.viaticsAmount,
          description: this.viaticsDescription
        }
      };
      expenseService.setExpense(this.id, expense)
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
    <h2>Trip - ID</h2>
    <div class="grid-container-1-column">
      <div>
        <pv-inputtext v-model="id" disabled style="width: 8%;"></pv-inputtext>
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
        <pv-inputtext type="number" v-model="tollAmount" style="width: 50%;"></pv-inputtext>
      </div>
      <div>
        <p>Toll - Details</p>
        <pv-textarea v-model="tollDescription" style="width: 100%;"></pv-textarea>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Viatics - Amount</p>
        <pv-inputtext v-model="viaticsAmount" style="width: 50%;"></pv-inputtext>
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