<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const registerTrip = () => {
      router.push('/entrepreneur/register/trip');
    };

    const modifyTrip = () => {
      router.push('/entrepreneur/modify/trip');
    };

    const registerExpense = () => {
      router.push('/entrepreneur/register/expense');
    };

    const modifyExpense = () => {
      router.push('/entrepreneur/modify/expense');
    };

    return {
      registerTrip,
      modifyTrip,
      registerExpense,
      modifyExpense
    };
  }
}
</script>

<template>
  <div class="container">
    <pv-card class="card">
      <template v-slot:title>
        <h3>Register Trips</h3>
      </template>
      <template v-slot:content>
        <p>Click on "Register" to register a new transportation trip for your company.
          Click on "Modify" to modify an existing transportation trip of your company</p>
      </template>
      <template v-slot:footer>
        <pv-button class="register-button" @click="registerTrip">Register</pv-button>
        <pv-button class="modify-button" @click="modifyTrip">Modify</pv-button>
      </template>
    </pv-card>
    <pv-card class="card">
      <template v-slot:title>
        <h3>Register Expense</h3>
      </template>
      <template v-slot:content>
        <p>Click on "Register" to register a new expense for a transportation trip for your company.
          Click on "Modify" to modify an existing expense for a transportation trip of your company</p>
      </template>
      <template v-slot:footer>
        <pv-button class="register-button" @click="registerExpense">Register</pv-button>
        <pv-button class="modify-button" @click="modifyExpense">Modify</pv-button>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-wrap: wrap;
}

.card {
  color: black;
  margin: 20px;
  width: 300px; /* Ancho fijo */
  height: 400px; /* Altura fija */
  text-align: center;
  background-color: #FFA500;
}

.card h3 {
  color: #1E3A8A;
  font-weight: lighter;
}

.register-button {
  margin-top: 20px;
  margin-right: 20px; /* Añadido margen a la derecha */
  background-color: #1E3A8A;
  border-color: #1E3A8A;
}

.modify-button {
  margin-top: 20px;
  background-color: #1E3A8A;
  border-color: #1E3A8A;
}
</style>
