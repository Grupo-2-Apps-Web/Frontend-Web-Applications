<script>
import {useRouter} from "vue-router";

export default {
  name: "register.component",
  setup() {
    const router = useRouter();
    const goToClient = () => {
      router.push('/signup/client');
    };

    const goToEntrepreneur = () => {
      router.push('/signup/entrepreneur');
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
    <h2>Sign Up</h2>
    <p>Welcome to CargoApp! We are happy that you decided to join us😊!</p>
    <h4>Please, select your role.</h4>
    <ul>
      <li>Client: Looking for a transparent and safe transportation service.</li>
      <li>Entrepreneur: Offering transportation service.</li>
    </ul>
    <div class="form-group-btn">
      <pv-button label="Client" class="btn" @click="goToClient"></pv-button>
      <pv-button label="Entrepreneur" class="btn" @click="goToEntrepreneur"></pv-button>
    </div>
    <p class="link form-group">Already have an account? <a><router-link to="/login">Login</router-link></a></p>
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
  height: 380px;
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