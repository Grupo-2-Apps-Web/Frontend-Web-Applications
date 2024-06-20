<script setup>
import {computed, ref, watch, onMounted} from "vue";
import { defineProps } from "vue";
import { useStore } from 'vuex';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  toggleSidebar: {
    type: Function,
    default: () => {}
  }
});

const localVisible = ref(props.visible);

const togglesidebar = () => {
  localVisible.value = !localVisible.value;
  props.toggleSidebar();
};

let store = useStore();
let userType = computed(() => store.state.user_type) // Nuevo
let isActive = computed(() => store.state.isActive === 'true' || store.state.isActive === true)

// Observa el estado del tema en el store de Vuex
let theme = computed(() => store.state.theme)

// Aplica el tema al cuerpo del documento cada vez que cambie
watch(theme, (newTheme) => {
  document.body.className = newTheme;
});


onMounted(() => {
  document.body.className = theme.value;
  if (localStorage.getItem('isActive')) {
    store.commit('setIsActive', JSON.parse(localStorage.getItem('isActive')));
  }
});

const logOut = () => {
  store.commit('setIsActive', false);
  store.commit('setUserId', 0);
  store.commit('setUserType', null);
  store.commit('SET_THEME', 'Light');
  store.commit('SET_VIEW', 'Grid');
  localStorage.setItem('token', '');
  togglesidebar();
};

</script>

<template>
    <pv-sidebar v-model:visible="localVisible" header="Menu">
    <template #header>
        <h1 class="sidebar-title">CargoApp</h1>
    </template>
      <template #closeicon>
        <i class="pi pi-times" style="color: #686f75;" @click="togglesidebar"/>
      </template>
      <ul>
        <li v-if="userType === 'client'"><router-link to="/client/history">Record</router-link></li>
        <li v-if="userType === 'client'"><router-link to="/client/expenses">Expenses</router-link></li>
        <li v-if="userType === 'client'"><router-link to="/client/gps">GPS</router-link></li>
        <li v-if="userType === 'client'"><router-link to="/client/statistics">Statistics</router-link></li>
        <li v-if="userType === 'entrepreneur'"><router-link to="/entrepreneur/register">Registry</router-link></li>
        <li v-if="userType === 'entrepreneur'"><router-link to="/entrepreneur/clients">Clients</router-link></li>
        <li v-if="userType === 'entrepreneur'"><router-link to="/entrepreneur/drivers">Drivers</router-link></li>
        <li v-if="userType === 'entrepreneur'"><router-link to="/entrepreneur/vehicles">Vehicles</router-link></li>
        <li v-if="userType === 'entrepreneur'"><router-link to="/entrepreneur/history">Record</router-link></li>
        <li v-if="userType === 'entrepreneur'"><router-link to="/entrepreneur/gps">GPS</router-link></li>
      </ul>
      <div v-if="isActive === true" class = "button-container">
        <router-link to="/">
          <pv-button style="background-color: #1E3A8A; font-size: 24px; border-radius: 5px;" @click="logOut">
            Log Out
          </pv-button>
        </router-link>
      </div>

    </pv-sidebar>
  <pv-toolbar id="toolbar-header">
    <template #start>
      <pv-button class="sidebar-button" @click="togglesidebar" v-if="isActive === true">
        <i class="pi pi-bars" style="color: white;" />
      </pv-button>
    </template>
    <template #center>
      <img src="../../assets/images/logo.png" alt="CargoApp logo">
      <h1 id="toolbar-title">CargoApp</h1>
    </template>
    <template #end v-if="isActive === true">
      <router-link to="/configuration">
        <pv-button class="config-button">
          <i class="pi pi-cog" id="config" style="color: white;" />
        </pv-button>
      </router-link>
    </template>
  </pv-toolbar>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: column;
  height: 60%;
  justify-content: space-between;
  padding-top: 100px;
}

ul li {
  display: flex;
  align-items: center;
  justify-content: left;
  list-style-type: none;
}

ul li a{
  font-size: 24px;
  text-decoration: none;
  color: #495057;
}

ul li a:hover{
  color: #1E3A8A;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 150px;
  height: 50px;
}

#toolbar-header{
  background-color: #1E3A8A;
  border : none;
  border-radius: 0;
  padding: 0;
}

.config-button {
  background-color: transparent;
  border: none;
  margin-right: 50px;
}

.sidebar-button {
  background-color: transparent;
  border: none;
  margin-left: 10px;
}

img {
  height: 50px;
  margin-right: 10px;
}
h1 {
  font-family: Rubik, sans-serif;
  font-weight: normal;
  color: white;
  font-size: 32px;
}

.sidebar-title {
  color: black;
}

.pi {
  font-size: 2rem;
}

@media (max-width: 450px) {
  #toolbar-title {
    font-size: 20px;
  }
  img {
    height: 30px;
    margin-right: 10px;
  }

  .pi {
    font-size: 1.5rem;
  }

  .config-button {
    margin-right: 10px;
  }

}

</style>