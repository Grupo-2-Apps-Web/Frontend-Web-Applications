<script>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {UserService} from "../services/user.service.js";
import {User} from "../models/user.entity.js";

export default {
  name: "subscription.component",
  data(){
    return {
      userId: localStorage.getItem('user_id'),
      userService: new UserService(),
      selectedPlan: ''
    }
  },
  created(){
    this.userService.getOne(this.userId).then(response => {
      const user = response.data;
      this.selectedPlan = user.subscriptionPlan.subscription;
    });
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

      this.userService.getOne(this.userId).then(response => {
        const updatedUser = new User(
            response.data.id,
            response.data.userData.name,
            response.data.userAuthentication.email,
            response.data.userData.phone,
            response.data.userAuthentication.password,
            response.data.userData.ruc,
            response.data.userData.address,
            plan
        );
        console.log(updatedUser);
        this.userService.update(this.userId, updatedUser).then(res => {
          alert(`You have selected the ${plan} plan.`)
        })
      });
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
          <p>Price: S/.35 / month</p>
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