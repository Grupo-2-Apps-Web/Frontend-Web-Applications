<script>
import {useRouter} from "vue-router";
import {ref} from "vue";

export default {
  name: "payment.component",
  setup() {
    const router = useRouter();
    const cardNumber = ref('');
    const cardHolder = ref('');
    const expiryDate = ref('');
    const cvv = ref('');
    const email = ref('');
    const address = ref('');
    const city = ref('');

    const goBack = () => {
      router.back()
    }

    const submitPayment = (event) => {
      event.preventDefault();
      if(cardNumber.value.length < 16)
        return alert('Card number has to be 16 digits');
      if(new Date(expiryDate.value) < new Date())
        return alert('Invalid card, expired');
      if(cvv.value.length < 3)
        return alert('CVV has to be 3 digits');
      alert('Payment submitted successfully');
    }

    return {
      goBack,
      submitPayment,
      cardNumber,
      cardHolder,
      expiryDate,
      cvv,
      email,
      address,
      city
    }
  }
}
</script>
<template>
  <div class="payment-page">
    <pv-button class="button close-button" @click="goBack">Close</pv-button>
    <h1>Payment Method</h1>
    <form @submit="submitPayment">
      <div class="input-group flex flex-column gap-2">
        <label for="email">Email:</label>
        <pv-inputtext id="email" type="email" v-model="email" required></pv-inputtext>
      </div>
      <div class="input-group flex flex-column gap-2">
        <label for="address">Address:</label>
        <pv-inputtext id="address" type="text" v-model="address" required></pv-inputtext>
      </div>
      <div class="input-group flex flex-column gap-2">
        <label for="city">City:</label>
        <pv-inputtext id="city" type="text" v-model="city" required></pv-inputtext>
      </div>
      <div class="input-group flex flex-column gap-2">
        <label for="cardNumber">Card Number:</label>
        <pv-inputtext id="cardNumber" type="number" v-model="cardNumber" required></pv-inputtext>
      </div>
      <div class="input-group flex flex-column gap-2">
        <label for="cardHolder">Card Holder:</label>
        <pv-inputtext id="cardHolder" type="text" v-model="cardHolder" required></pv-inputtext>
      </div>
      <div class="input-group flex flex-column gap-2">
        <label for="expiryDate">Expiry Date:</label>
        <pv-inputtext id="expiryDate" type="month" v-model="expiryDate" required></pv-inputtext>
      </div>
      <div class="input-group flex flex-column gap-2">
        <label for="cvv">CVV:</label>
        <pv-inputtext id="cvv" type="number" v-model="cvv" required></pv-inputtext>
      </div>
      <pv-button class="form-button" type="submit" required>Submit</pv-button>
    </form>
  </div>
</template>

<style scoped>
.payment-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-button {
  align-self: flex-start;
  margin: 5px 5px;
  background-color: #f44336;
}

.input-group {
  margin-bottom: 10px;
  width: 500px;
}

.form-button{
  width: 200px;
  margin-top: 20px;
  background-color: #006400;

  display: flex;
  justify-content: center;
}

form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>