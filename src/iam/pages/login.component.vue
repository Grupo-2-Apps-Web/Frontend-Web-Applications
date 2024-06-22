<script>
import {UserService} from "../../user/services/user.service.js";
import {useRouter} from "vue-router";
import {ref, inject} from "vue";
import {ClientService} from "../../user/services/client.service.js";
import {EntrepreneurService} from "../../user/services/entrepreneur.service.js";
import {AuthenticationService} from "../services/authentication.service.js";

export default {
  name: "login.component",
  setup() {
    const userService = new UserService();
    const clientService = new ClientService();
    const entrepreneurService = new EntrepreneurService();
    const authenticationService = new AuthenticationService();
    const router = useRouter();
    const username = ref(''); // Variable para almacenar el nombre de usuario
    const password = ref(''); // Variable para almacenar la contraseña
    const store = inject('store'); // Inyecta el store de Vuex

    const login = async () => {
      authenticationService.signIn(username.value, password.value).then(
          (response) => {
            let userId = response.data.id;
            let token = response.data.token;
            localStorage.setItem('token', token);
            clientService.getByUserId(userId).then((response) => {
              console.log(response);
              if (response.data) {
                store.commit('setUserId', userId);
                store.commit('setUserType', 'client');
                store.commit('setIsActive', true);
                console.log('El cliente con user-id ' + userId + ' logeado con éxito');
                router.push('/client');
              }
            }).catch((error) => {
              console.log(error);
              entrepreneurService.getByUserId(userId).then((response) => {
                console.log(response);
                if (response.data) {
                  store.commit('setUserId', userId);
                  store.commit('setUserType', 'entrepreneur');
                  store.commit('setIsActive', true);
                  console.log('El empresario con user-id ' + userId + ' logeado con éxito');
                  router.push('/entrepreneur');
                }
              }).catch((error) => {
                console.log(error);
                alert("Incorrect username or password");
              });
            });

          }
      );

    };

    return {
      router,
      login,
      username,
      password
    };
  },
  created() {
    if (localStorage.getItem('isActive') === 'true'){
      if(localStorage.getItem('user_type') === 'client') {
        this.router.push('/client');
      } else if(localStorage.getItem('user_type') === 'entrepreneur') {
        this.router.push('/entrepreneur');
      }
    }
  }
}
</script>

<template>
  <form class="registration-form">
    <h2>Login</h2>
    <div class="form-group">
      <label for="username">Email</label><br>
      <input type="email" id="username" v-model="username" required>
    </div>
    <div class="form-group">
      <label for="password">Password</label><br>
      <input type="password" id="password" v-model="password" required>
    </div>
    <p class="link"> <router-link to="/recover-account">Forgot password?</router-link></p>
    <div class="form-group-btn">
      <pv-button label="Login" class="btn" @click="login"></pv-button>
    </div>
    <p class="link">Don't have an account? <a><router-link to="/signup">Sign Up</router-link></a></p>
  </form>
</template>
<style scoped>
/*Title Registrate*/
h2 {
  font-weight: normal;
  font-size: 24px;
  text-align:center;
  margin-bottom: 25px;
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
  height: 380px;
  width: 391px
}
.form-group {
  margin: 25px 10px auto; /*top | both sides | bottom*/
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
  margin: 55px auto 8px; /*top | both sides | bottom*/
  display: flex;
  justify-content: center;
  align-items: center;
}

/*Buttons Gestion Logistica and Cliente*/
.btn {
  font-size: 18px;
  font-weight: lighter;
  color: #FFFFFF;
  background-color: #1E3A8A;
  margin: 0 10px;
  width: 326px;
  height: 33px;
  border-radius: 25px;
  border: none;
  cursor:pointer;
}
.link {
  margin: auto 10px;
  font-weight: lighter;
  font-size: 16px;
}
a {
  cursor: pointer;
  color: #1E3A8A;
}
a:visited {
  cursor: pointer;
  color: #1E3A8A;
}
a:hover {
  cursor: pointer;
  color: #108c10;
}
</style>