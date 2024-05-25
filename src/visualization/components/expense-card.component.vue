<template>
  <div class="expense" :class="getView || 'grid'">
    <div v-if="getView === 'list'">
      <div class="table-button-container">
        <table>
          <tbody>
          <tr>
            <td>{{trip.name}}</td>
            <td>{{trip.id}}</td>
            <td>{{ formatDate(trip.load_date) }}</td>
            <td>{{ trip.load_location }}</td>
          </tr>
          </tbody>
        </table>
        <div class="button-view-list">
          <pv-button label="View expenses" :class="['btn', getView]" @click="goToExpenses(trip.id)"></pv-button>
        </div>
      </div>
    </div>
    <div v-else>
      <pv-card class="expense-card">
        <template #content>
          <div class="title">
            <h2>{{trip.name}}</h2>
            <h3>ID: {{trip.id}}</h3>
          </div>
          <div class="content-info-preview">
            <p>FECHA DE CARGA: {{ formatDate(trip.load_date) }}</p>
            <p>LUGAR DE CARGA: {{ trip.load_location }}</p>
          </div>
        </template>
      </pv-card>
      <pv-button label="View expenses" :class="['btn', getView]" @click="goToExpenses(trip.id)"></pv-button>
    </div>
  </div>
</template>

<script>
import { Trip } from "../../registration/models/trip.entity.js";
import {useRouter} from "vue-router";
import {mapGetters} from "vuex";
import {ExpenseService} from "../../registration/services/expense.service.js";

export default {
  name: "expense-card",
  props: {
    trip : {
      type: Trip,
      required: true
    },
  },
  data(){
    return{
      expenseService: new ExpenseService(),
      router: useRouter()
    }
  },
  computed: {
    ...mapGetters(['getView'])
  },
  methods: {
    async goToExpenses(tripId){
      const response = await this.expenseService.getByTripId(tripId);
      if(response){
        this.router.push(`/client/expenses/${response.data.id}`);
      } else {
        alert('There are no expenses for this trip');
      }
    },
    formatDate(dateString) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric'  };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
}
</script>

<style scoped>
h2, h3{
  font-family: Roboto, sans-serif;
  color: black;
}
p{
  font-family: Roboto, sans-serif;
  color: black;
}

.expense.grid {
  margin: 40px 0 4px auto;
  width: 70%;
  display: flex;
  flex-direction: column;
}

.expense.grid {
  flex-wrap: wrap;
  justify-content: space-between;
}

.expense-card {
  background-color: #FFA500;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  height: 100%;
  max-width: 700px;
}

.expense-card.grid {
  width: calc(50% - 160px);
}

.content-info-preview {
  position: absolute;
  margin: -94px 15px 0 170px;
}

.btn.grid {
  font-family: Rubik, sans-serif;
  background-color: #006400;
  border-radius: 15px;
  width: 25%;
  max-width: 320px;
  margin-left: calc(30% - 160px);
  margin-top: -20px;
}

@media (max-width: 1050px) {
  .expense.grid {
    margin: 40px 2px 4px 110px;
    width: 100%;
  }
}

@media (max-width: 750px) {
  .expense.grid {
    margin: 40px 2px 4px 0;
    width: 100%;
  }
  .content-info-preview {
    margin: -94px 15px 0 160px;
  }
  .btn.grid {
    margin-top: -10px;
    margin-left: calc(50% - 160px);
  }
}

@media (max-width: 450px) {
  .title {
    margin-bottom: 30px;
  }
  .content-info-preview {
    margin: -120px 15px 0 160px;
  }
}


/*-----------------------------List View--------------------------------------*/

.expense.list {
  margin: 2px;
  width: 55%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.content-info-preview.list {
  position: static;
  margin: 0;
}

table {
  width: 80%;
  border-collapse: separate;
  border-spacing: 10px;
  table-layout: fixed;
  background-color: white;
  color: #2c2c2c;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 4px;
  text-align: left;
}

.table-button-container {
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
}

.button-view-list {
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn.list {
  font-family: Rubik, sans-serif;
  background-color: #006400;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  margin: 0;
}

.btn:hover.list {
  background-color: #45a049;
}

</style>