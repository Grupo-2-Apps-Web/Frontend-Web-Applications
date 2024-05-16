<script>
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "register.component",
  setup() {
    const router = useRouter();
    const store = useStore();
    const goToClient = () => {
      router.push('/client');
      store.commit('setUserId', user.id); // Almacena el user_id en Vuex y en el almacenamiento local
      store.commit('setUserType', 'client'); // Almacena el tipo de usuario en Vuex y en el almacenamiento local
    };

    const goToEntrepreneur = () => {
      router.push('/entrepreneur');
      store.commit('setUserId', user.id); // Almacena el user_id en Vuex y en el almacenamiento local
      store.commit('setUserType', 'entrepreneur'); // Almacena el tipo de usuario en Vuex y en el almacenamiento local
    };

    return {
      goToClient,
      goToEntrepreneur
    };
  }
}
</script>

<template>
  <form class="registration-form">
    <h2>Registrate</h2>
    <div class="form-group">
      <label for="username">Usuario</label><br>
      <input type="text" id="username">
    </div>
    <div class="form-group">
      <label for="email">Correo electrónico</label><br>
      <input type="email" id="email">
    </div>
    <div class="form-group">
      <label for="password">Contraseña</label><br>
      <input type="password" id="password">
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirmar contraseña</label><br>
      <input type="password" id="confirmPassword">
    </div>
    <div class="form-group-btn">
      <pv-button label="Gestion logística" class="btn" @click="goToEntrepreneur"></pv-button>
      <pv-button label="Cliente" class="btn" @click="goToClient"></pv-button>
    </div>
    <p class="link form-group">¿Tienes una cuenta? <router-link to="/login">Accede desde aquí</router-link></p>
  </form>
</template>

<style scoped>
/*Title Registrate*/
h2 {
  font-weight: normal;
  font-size: 24px;
  text-align:center;
  margin-bottom: 7px;
}
/*All form*/
.registration-form {
  font-family: Roboto, "sans-serif";
  background-color: #FFA500;
  color: #1E3A8A;
  padding: 20px;
  max-width: 500px;
  margin: 25px auto;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 371px;
  width: 391px
}
.form-group {
  margin: auto 10px;
}
/*Labels*/
.form-group label {
  font-weight: lighter;
  font-size: 15px;
}
/*Inputs*/
.form-group input {
  width: 326px;
  height: 28px;
  border-radius: 3px;
  background-color: #FCE8CC;
  border: none;
  margin-bottom: 5px;
}

.form-group-btn {
  margin: 15px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

/*Buttons Gestion Logistica and Cliente*/
.btn {
  font-size: 17px;
  font-weight: lighter;
  color: #FFFFFF;
  background-color: #1E3A8A;
  margin: 0 10px;
  width: 152px;
  height: 33px;
  border-radius: 25px;
  border: none;
  cursor:pointer;
}
.link {
  font-weight: lighter;
  font-size: 12px;
}
</style>