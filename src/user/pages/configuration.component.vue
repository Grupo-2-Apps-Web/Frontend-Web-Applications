<script>
import SwitcherThemeComponent from "../components/switcher-theme.component.vue";
import DataCollectionComponent from "../components/data-collection.component.vue";
import SwitcherViewDataComponent from "../components/switcher-view-data.component.vue";
import {ConfigurationService} from "../services/configuration.service.js";
import router from "../../router/index.js";
import store from "../../store/store.js";
import {Configuration} from "../models/configuration.entity.js";

export default {
  name: "configuration.component",
  components: {
    SwitcherThemeComponent,
    DataCollectionComponent,
    SwitcherViewDataComponent
  },
  data(){
    return {
      configurationService: new ConfigurationService(),
      configuration: Configuration,
      userType: localStorage.getItem('user_type'),
    }
  },
  methods: {
    saveConfig(){
      store.commit('SET_THEME', store.state.theme);
      store.commit('SET_VIEW', store.state.view);

      const dataCollection = localStorage.getItem('dataCollection') === 'true';
      const dataSharing = localStorage.getItem('dataSharing') === 'true';
      const configuration = new Configuration(
          this.configuration.id,
          Number(localStorage.getItem('user_id')),
          store.state.theme,
          store.state.view,
          dataCollection,
          dataSharing
      );

      this.configurationService.update(configuration.id, configuration);
      alert("Configuration saved successfully!");
      if (this.userType === 'client') {
        router.push('/client');
      }
      else{
        router.push('/entrepreneur');
      }
    },
    goBack() {
      if (store.state.theme !== store.state.initialConfig.theme || store.state.view !== store.state.initialConfig.view) {
        if (window.confirm("You have unsaved changes. Do you want to save them?")) {
          this.saveConfig();
        } else {
          store.commit('RESET_CONFIG');
        }
      }
      router.back();
    }
  },
  created() {
    let userId = localStorage.getItem('user_id');
    this.configurationService.getByUserId(userId)
        .then(response => {
          this.configuration = response.data;
          store.commit('SET_THEME', this.configuration.theme);
          store.commit('SET_VIEW', this.configuration.view);
          this.$store.commit('SET_INITIAL_CONFIG');
        })
        .catch(error => {
          console.error('Error loading configuration:', error);
        });
  }
}
</script>

<template>
  <h1>Configuration</h1>
  <div class="configuration">
    <div class="personalization">
      <div class="theme">
        <h2>Theme Selection</h2>
        <switcher-theme-component />
      </div>
      <div class="view">
        <h2>View Data</h2>
        <switcher-view-data-component/>
      </div>
    </div>
    <data-collection-component/>
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




/*----------------------------------*/
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

@media (max-width: 500px) {
  .subscription-buttons {
    gap: 10px;
  }

  .button{
    height: 60px;
    width: 150px;
  }
}
</style>