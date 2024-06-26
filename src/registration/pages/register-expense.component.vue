<script>
import { useRouter } from 'vue-router';
import { ref, reactive } from "vue";
import { useConfirm } from 'primevue/useconfirm';
import { ExpenseService } from "../services/expense.service.js";
import {Expense} from "../models/expense.entity.js";
import {TripService} from "../services/trip.service.js";
import {EntrepreneurService} from "../../user/services/entrepreneur.service.js";

export default {
  name: "register-expense.component",
  setup() {
    const router = useRouter();
    const confirm = useConfirm();
    const isVisible = ref(false);
    const expenseService = new ExpenseService();
    const tripService = new TripService();
    const expenseData = reactive({
      id: 0,
      tripId: 0,
      fuelAmount: 0,
      fuelDescription: '',
      viaticsAmount: 0,
      viaticsDescription: '',
      tollsAmount: 0,
      tollsDescription: ''
    });

    const openDialog = () => {
      if (expenseData.tripId === 0 || expenseData.fuelAmount === 0 || expenseData.tollsAmount === 0 || expenseData.viaticsAmount === 0) {
        alert('All fields are required');
        return;
      }
      confirm.require({
        message: 'The data requested for the expense will be recorded. Are you sure you want to record it?',
        header: 'Register Expense',
        onShow: () => {
          isVisible.value = true;
        },
        onHide: () => {
          isVisible.value = false;
        },
        accept: () => {
          tripService.getOne(expenseData.tripId).then((r) => {
            // validate if the entrepreneur is the owner of the trip
            let entrepreneurIdFromTrip = Number(r.data.entrepreneurId);
            let userId = Number(localStorage.getItem('user_id'));
            const entrepreneurService = new EntrepreneurService();
            entrepreneurService.getByUserId(userId).then((res) => {
              let entrepreneurId = Number(res.data.id);
              if (entrepreneurIdFromTrip !== entrepreneurId) {
                alert('You are not authorized to register expenses for this trip');
              }
              else {
                expenseService.getByTripId(expenseData.tripId).then((response) => {
                  alert('An expense with this trip ID already exists.')
                }).catch((e) => {
                  const newExpense = new Expense(
                      0,
                      Number(expenseData.fuelAmount),
                      expenseData.fuelDescription,
                      Number(expenseData.viaticsAmount),
                      expenseData.viaticsDescription,
                      Number(expenseData.tollsAmount),
                      expenseData.tollsDescription,
                      Number(expenseData.tripId)
                  );
                  expenseService.create(newExpense);
                  alert('Expense registered successfully');
                  goBack();
                })
              }
            });
          }).catch((error) => {
            alert('Expense not registered. Please enter a valid trip ID.');
          });

        }
      });
    };


    const goBack = () => {
      router.go(-1);
    }

    return {
      openDialog,
      goBack,
      expenseData,
      isVisible
    };
  }
}
</script>

<template>
  <div class="container">
    <h1>Register Expenses</h1>
    <h2>Trip ID</h2>
    <div class="grid-container-1-column">
      <div>
        <pv-inputtext type="number" v-model="expenseData.tripId" style="width: 8%;" required></pv-inputtext>
      </div>
    </div>
    <h2>Expenses</h2>
    <div class="grid-container-2-columns">
      <div>
        <p>Fuel - Amount</p>
        <pv-inputtext type="number" v-model="expenseData.fuelAmount" style="width: 50%;" required></pv-inputtext>
      </div>
      <div>
        <p>Fuel - Details</p>
        <pv-textarea v-model="expenseData.fuelDescription" style="width: 100%;" required></pv-textarea>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Tolls - Amount</p>
        <pv-inputtext type="number" v-model="expenseData.tollsAmount" style="width: 50%;" required></pv-inputtext>
      </div>
      <div>
        <p>Tolls - Details</p>
        <pv-textarea v-model="expenseData.tollsDescription" style="width: 100%;" required></pv-textarea>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Viatics - Amount</p>
        <pv-inputtext type="number" v-model="expenseData.viaticsAmount" style="width: 50%;" required></pv-inputtext>
      </div>
      <div>
        <p>Viatics - Details</p>
        <pv-textarea v-model="expenseData.viaticsDescription" style="width: 100%;" required></pv-textarea>
      </div>
    </div>
    <div class="button">
      <pv-button @click="goBack" style="background-color: #870a0a; padding: 15px 45px;" >
        Cancel
      </pv-button>
      <pv-confirm-dialog id="confirm" />
      <pv-button @click="openDialog()" label="Confirm" :aria-expanded="isVisible" :aria-controls="isVisible ? 'confirm' : null"
                 style="background-color: #006400; padding: 15px 45px;" >
        Register
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

.button {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 2em;
}

</style>