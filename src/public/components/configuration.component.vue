<script>

import {useRouter} from "vue-router";

export default {
  name: "configuration.component",
  setup() {
    const router = useRouter()

    const goBack = () => {
      router.back();
    }

    const saveConfig = () => {
      alert("Configuration saved successfully!");
      //add logic to save configuration
      router.back();
    }

    return {
      goBack,
      saveConfig
    }
  }
}
</script>

<template>
  <h1>Configuration</h1>
  <div class="configuration">
    <div class="personalization">
      <div class="theme">
        <h2>Theme Selection</h2> <!-- Change p for select button -->
        <p>Light</p>
        <p>Dark</p>
      </div>
      <div class="view">
        <h2>View Selection</h2> <!-- Change p for select button -->
        <p>List</p>
        <p>Grid</p>
      </div>
    </div>
    <div class="data">
      <h2>Allow data collection</h2> <!-- Add checkbox -->
      <h2>Allow third-party data sharing</h2> <!-- Add checkbox -->
    </div>
  </div>
  <div class="subscription">
    <h2>Subscription</h2>
    <div class="subscription-buttons">
      <router-link to="/subscription">
        <pv-button class="button">Manage subscription</pv-button>
      </router-link>
      <router-link to="/payment">
        <pv-button class="button">Manage payment method</pv-button>
      </router-link>
    </div>
  </div>

  <div class="action-buttons">
    <pv-button class="button action-button" @click="goBack">Close</pv-button>
    <pv-button class="button action-button" @click="saveConfig">Save</pv-button>
  </div>
</template>

<style scoped>
.configuration{
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
}
.subscription{
  text-align: center;
}

.subscription-buttons{
  display: flex;
  justify-content: center;
  gap: 20px;
}

.button{
  height: 50px;
  width: 200px;
  margin: auto 0;
  border-radius: 5px;
  font-family: Rubik, sans-serif;
  background-color: #006400;
}

.action-buttons{
  display: flex;
  justify-content: space-around;
  margin-top: 100px;
}

.action-button{
  font-size: 24px;
  height: 75px;
  width: 200px;

  display: flex;
  justify-content: center;
  background-color: #2196F3;

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);
}

.action-button:hover{
  background-color: #1E3A8A;
}
</style>