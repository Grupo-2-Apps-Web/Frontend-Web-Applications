<script>
import {Expense} from "../models/expense.entity.js";
import {TripService} from "../services/trip.service.js";
import {ExpenseService} from "../services/expense.service.js";

export default {
  name: "expense-description",
  computed: {
    id(){
      return this.$route.params.id;
    }
  },
  data() {
    return {
      name: "",
      expense: Expense,
      expenseService: new ExpenseService(),
      tripService: new TripService(),
      logoURL: "",
      totalExpenses: 0
    }
  },
  created() {
    this.expenseService.getExpensesByID(this.id).then(response => {
        this.expense = new Expense(
            response.data[0].fuel.amount,
            response.data[0].fuel.description,
            response.data[0].toll.amount,
            response.data[0].toll.description,
            response.data[0].viatics.amount,
            response.data[0].viatics.description,
        );
        this.totalExpenses = JSON.parse(this.expense.fuel) + JSON.parse(this.expense.tolls) + JSON.parse(this.expense.viatics);
    });
    this.tripService.getTripByID(this.id).then(response => {
      this.name = response.data[0].name;
      this.logoURL = response.data[0].company.logoImage;
    });
  }
}
</script>

<template>
  <pv-button style="margin-top: 20px; margin-left: 10px;" @click="this.$router.go(-1);">Return</pv-button>

  <h1>{{name}} - ID: {{ id }}</h1>
  <div class="container">
    <img :src="this.logoURL" alt="company image">
    <div class="gastos">
      <div class="gasto">
        <div class="gasto-header">
          <h2>FUEL</h2>
          <h2>S/. {{expense.fuel}}</h2>
        </div>
        <div class="gasto-descripcion">
          <p>{{expense.fuelDescription}}</p>
        </div>
      </div>

      <div class="gasto">
        <div class="gasto-header">
          <h2>TOLLS</h2>
          <h2>S/. {{expense.tolls}}</h2>
        </div>
        <div class="gasto-descripcion">
          <p>{{expense.tollsDescription}}</p>
        </div>
      </div>

      <div class="gasto">
        <div class="gasto-header">
          <h2>VIATICS</h2>
          <h2>S/. {{expense.viatics}}</h2>
        </div>
        <div class="gasto-descripcion">
          <p>{{expense.viaticsDescription}}</p>
        </div>

      </div>
      <div class="gasto">
        <div class="gasto-header">
          <h2>TOTAL</h2>
          <h2>S/. {{ totalExpenses }}</h2>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

  h1{
    font-size: 48px;
    text-align: center;
  }
  .container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 90%;
    margin: 0 auto;
  }

  img{
    width: 30%;
    margin: 0 auto;
  }

  .gasto-header{
    display: grid;
    grid-template-columns: calc(80% - 5px) calc(20% - 5px);
    grid-gap: 10px;
  }

  .gasto-header h2{
    background-color: #FFA500;
    padding: 5px 0px;
    text-align: center;
    border-radius: 5px;
  }

  .gasto-descripcion{
    background-color: #FFCA6A;
    padding: 5px;
    min-height: 75px;
  }

  @media (max-width: 768px){
    .container{
      grid-template-columns: 1fr;
    }
  }
</style>