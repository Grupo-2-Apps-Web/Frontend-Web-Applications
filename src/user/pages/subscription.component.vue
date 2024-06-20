<script>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {ClientService} from "../services/client.service.js";
import {Client} from "../models/client.entity.js";
import {EntrepreneurService} from "../services/entrepreneur.service.js";
import {Entrepreneur} from "../models/entrepreneur.entity.js";

export default {
  name: "subscription.component",
  data(){
    return {
      userId: localStorage.getItem('user_id'),
      userType: localStorage.getItem('user_type'),
      clientService: new ClientService(),
      entrepreneurService: new EntrepreneurService(),
      selectedPlan: '',
    }
  },
  created(){
    if (this.userType === 'client') {
      this.clientService.getByUserId(this.userId).then((response) => {
        const client = response.data;
        this.selectedPlan = client.subscription;
      });
    }
    else {
      this.entrepreneurService.getByUserId(this.userId).then((response) => {
        const entrepreneur = response.data;
        this.selectedPlan = entrepreneur.subscription;
      });
    }
  },
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.back()
    }
    return {
      goBack,
    }
  },
  methods:{
    selectPlan(plan){
      this.selectedPlan = plan;

      if (this.userType === 'client') {
        this.clientService.getByUserId(this.userId).then(response => {
          const updatedClient = new Client(
              response.data.id,
              response.data.name,
              response.data.phone,
              response.data.ruc,
              response.data.address,
              plan,
              response.data.userId
          );
          console.log(updatedClient);
          this.clientService.update(this.userId, updatedClient).then(res => {
            alert(`You have selected the ${plan} plan.`)
          })
        });
      }
      else {
        this.entrepreneurService.getByUserId(this.userId).then(response => {
          const updatedEntrepreneur = new Entrepreneur(
              response.data.id,
              response.data.name,
              response.data.phone,
              response.data.ruc,
              response.data.address,
              response.data.logoImage,
              plan,
              response.data.userId
          );
          console.log(updatedEntrepreneur);
          this.entrepreneurService.update(this.userId, updatedEntrepreneur).then(res => {
            alert(`You have selected the ${plan} plan.`)
          })
        });
      }

    }
  }
}
</script>
<template>
  <div class="subscription-page">
    <pv-button class="button close-button" @click="goBack">Close</pv-button>
    <h1>Subscription</h1>
    <div class="subscription-cards">
      <pv-card>
        <template #title>
          <h2>Basic Plan</h2>
        </template>
        <template #subtitle>
          <p>Price: S/.20 / month</p>
        </template>
        <template #content>
          <div class="card-content">
            <ul>
              <li>GPS and real-time alerts</li>
              <li>History limited to 50 records</li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="card-footer">
            <pv-button
                class="button select-button"
                :class="{ 'selected': this.selectedPlan === 'Basic' }"
                @click="selectPlan('Basic')"
            >
              {{ selectedPlan === 'Basic' ? 'Selected' : 'Select' }}
            </pv-button>
          </div>
        </template>
      </pv-card>
      <pv-card>
        <template #title>
          <h2>Premium Plan</h2>
        </template>
        <template #subtitle>
          <p>Price: S/.50 / month</p>
        </template>
        <template #content>
          <div class="card-content">
            <ul>
              <li>GPS and real-time alerts</li>
              <li>Unlimited history and data export</li>
              <li>Shipping statistics</li>
            </ul>
          </div>
        </template>
        <template #footer>
          <div class="card-footer">
            <pv-button
                class="button select-button"
                :class="{ 'selected': this.selectedPlan === 'Premium' }"
                @click="selectPlan('Premium')"
            >
              {{ selectedPlan === 'Premium' ? 'Selected' : 'Select' }}
            </pv-button>
          </div>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style scoped>
.subscription-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-button {
  align-self: flex-start;
  margin: 5px 5px;
  background-color: #f44336;
}

.subscription-cards{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.select-button {
  background-color: #2196F3;
  color: #fff;
  margin-top: 20px;
}

.card-footer{
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content{
  min-height: 100px;
}

.selected {
  background-color: #006400;
}

@media (max-width: 600px) {
  .subscription-cards {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr;
  }
}
</style>