<script>
import {Expense} from "../../registration/models/expense.entity.js";
import {TripService} from "../../registration/services/trip.service.js";
import {ExpenseService} from "../../registration/services/expense.service.js";
import {EntrepreneurService} from "../../user/services/entrepreneur.service.js";
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
      entrepreneurService: new EntrepreneurService(),
      logoURL: "",
      totalExpenses: 0
    }
  },
  created() {
    this.expenseService.getByTripId(this.id).then(response => {
        this.expense = new Expense(
            response.data.id,
            this.id,
            response.data.fuel_amount,
            response.data.fuel_description,
            response.data.tolls_amount,
            response.data.tolls_description,
            response.data.viatics_amount,
            response.data.viatics_description,
        );
        this.totalExpenses = JSON.parse(this.expense.fuelAmount) + JSON.parse(this.expense.tollsAmount) + JSON.parse(this.expense.viaticsAmount);
    });
    this.tripService.getOne(response.data.trip_id).then(response => {
      this.name = response.data.name;
      this.entrepreneurService.getOne(response.data.entreprenurId).then(response => {
        this.logoURL = response.data.logo_image;
      });
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
          <h2>S/. {{expense.fuelAmount}}</h2>
        </div>
        <div class="gasto-descripcion">
          <p>{{expense.fuelDescription}}</p>
        </div>
      </div>

      <div class="gasto">
        <div class="gasto-header">
          <h2>TOLLS</h2>
          <h2>S/. {{expense.tollsAmount}}</h2>
        </div>
        <div class="gasto-descripcion">
          <p>{{expense.tollsDescription}}</p>
        </div>
      </div>

      <div class="gasto">
        <div class="gasto-header">
          <h2>VIATICS</h2>
          <h2>S/. {{expense.viaticsAmount}}</h2>
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