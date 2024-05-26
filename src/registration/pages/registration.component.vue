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

    const registerDriver = () => {
      router.push('/entrepreneur/register/driver');
    };

    const modifyDriver = () => {
      router.push('/entrepreneur/modify/driver');
    };

    const registerVehicle = () => {
      router.push('/entrepreneur/register/vehicle');
    };

    const modifyVehicle = () => {
      router.push('/entrepreneur/modify/vehicle');
    };

    return {
      registerTrip,
      modifyTrip,
      registerExpense,
      modifyExpense,
      registerDriver,
      modifyDriver,
      registerVehicle,
      modifyVehicle
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
          Click on "Modify" to modify an existing transportation trip of your company.</p>
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
          Click on "Modify" to modify an existing expense for a transportation trip of your company.</p>
      </template>
      <template v-slot:footer>
        <pv-button class="register-button" @click="registerExpense">Register</pv-button>
        <pv-button class="modify-button" @click="modifyExpense">Modify</pv-button>
      </template>
    </pv-card>
    <pv-card class="card">
      <template v-slot:title>
        <h3>Register Driver</h3>
      </template>
      <template v-slot:content>
        <p>Click on "Register" to register a new driver of your company.
          Click on "Modify" to modify an existing driver of your company.</p>
      </template>
      <template v-slot:footer>
        <pv-button class="register-button" @click="registerDriver">Register</pv-button>
        <pv-button class="modify-button" @click="modifyDriver">Modify</pv-button>
      </template>
    </pv-card>
    <pv-card class="card">
      <template v-slot:title>
        <h3>Register Vehicle</h3>
      </template>
      <template v-slot:content>
        <p>Click on "Register" to register a new vehicle for transportation trips.
          Click on "Modify" to modify an existing vehicle for transportation trips.</p>
      </template>
      <template v-slot:footer>
        <pv-button class="register-button" @click="registerVehicle">Register</pv-button>
        <pv-button class="modify-button" @click="modifyVehicle">Modify</pv-button>
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
