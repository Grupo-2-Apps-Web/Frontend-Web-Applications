<script>
import { useRouter } from 'vue-router';
import { ref, reactive } from "vue";
import { useConfirm } from 'primevue/useconfirm';
import {ExpenseService} from "../services/expense.service.js";

export default {
  name: "register-expense.component",
  setup() {
    const router = useRouter();
    const confirm = useConfirm();
    const isVisible = ref(false);
    const expenseService = new ExpenseService();
    const expense = reactive({
      id: "",
      fuel: {
        amount: "",
        description: ""
      },
      toll: {
        amount: "",
        description: ""
      },
      viatics: {
        amount: "",
        description: ""
      }
    });

    const openDialog = () => {
      if (!expense.id || !expense.fuel.amount || !expense.toll.amount || !expense.viatics.amount) {
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
          if (expense.id) {
            expenseService.getExpensesByID(expense.id)
                .then(response => {
                  if (response.data.length > 0) {
                    alert('An expense with this trip ID already exists. You can change the expense with the Modify option.');
                  } else {
                    expenseService.addExpense(expense);
                    alert('Expense registered successfully');
                    goBack();
                  }
                })
                .catch(error => {
                  console.error('Error getting expenses by ID:', error);
                });
          } else {
            console.error('Expense ID is not defined');
          }
        }
      });
    };


    const goBack = () => {
      router.go(-1);
    }

    return {
      openDialog,
      goBack,
      expense
    };
  }
}
</script>

<template>
  <div class="container">
    <h1>Register Expenses</h1>
    <h2>Trip - ID</h2>
    <div class="grid-container-1-column">
      <div>
        <pv-inputtext v-model="expense.id" style="width: 8%;" required></pv-inputtext>
      </div>
    </div>
    <h2>Expenses</h2>
    <div class="grid-container-2-columns">
      <div>
        <p>Diesel Gasoline - Amount</p>
        <pv-inputtext v-model="expense.fuel.amount" style="width: 50%;" required></pv-inputtext>
      </div>
      <div>
        <p>Diesel Gasoline - Details</p>
        <pv-textarea v-model="expense.fuel.description" style="width: 100%;" required></pv-textarea>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Toll - Amount</p>
        <pv-inputtext v-model="expense.toll.amount" style="width: 50%;" required></pv-inputtext>
      </div>
      <div>
        <p>Toll - Details</p>
        <pv-textarea v-model="expense.toll.description" style="width: 100%;" required></pv-textarea>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Viatics - Amount</p>
        <pv-inputtext v-model="expense.viatics.amount" style="width: 50%;" required></pv-inputtext>
      </div>
      <div>
        <p>Viatics - Details</p>
        <pv-textarea v-model="expense.viatics.description" style="width: 100%;" required></pv-textarea>
      </div>
    </div>
    <div class="button">
      <pv-button @click="goBack" style="background-color: #870a0a; padding: 15px 45px;" >
        Cancel
      </pv-button>
      <pv-confirm-dialog id="confirm" />
      <pv-button @click="openDialog()" label="Confirm" :aria-expanded="visible" :aria-controls="visible ? 'confirm' : null"
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