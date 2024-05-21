<script>
import { useRouter } from 'vue-router';
import {UserService} from "../services/user.service.js";
import {User} from "../models/user.entity.js";

export default {
  name: "RegisterClientComponent",
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.go(-1);
    };

    return {
      goBack
    };

  },
  data() {
    return {
      userService: new UserService(),
      name: '',
      email: '',
      password: '',
      phone: '',
      ruc: '',
      address: ''
    };
  },
  methods: {
    isValidEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    isNumeric(value) {
      const re = /^\d+$/;
      return re.test(String(value));
    },
    registerClient() {
      // Validations
      if (!this.name || !this.email || !this.password || !this.phone || !this.ruc || !this.address) {
        alert('All fields are required');
        return;
      }
      if (!this.isValidEmail(this.email)) {
        alert('Please enter a valid email');
        return;
      }
      if (this.password.length < 8){
        alert('Password must be at least 8 characters long');
        return;
      }
      if (!this.isNumeric(this.phone) || !this.isNumeric(this.ruc)){
        alert('Phone and RUC only contain numbers');
        return;
      }
      if (this.phone.length !== 9) {
        alert('Phone must be at 9 characters long');
        return;
      }
      if (this.ruc.length !== 11) {
        alert('RUC must be at 11 characters long');
        return;
      }

      // Register user
      console.log('Registering client...');
      let client = new User(this.name, this.email, this.password, this.phone, this.ruc, this.address);
      this.userService.saveUser(client, 1)
        .then(() => {
          alert('Client registered successfully');
          this.$router.push('/login');
        })
        .catch((error) => {
          alert('Error registering client');
          console.error(error);
        });

    }
  }
}
</script>

<template>
  <div class="register-client">
    <form class="registration-form">
      <h2>Sign Up - Client</h2>
      <div class="form-group">
        <label >Name</label>
        <input v-model="name" style="width: 100%;" required>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input v-model="phone" required>
      </div>
      <div class="form-group">
        <label>RUC</label>
        <input v-model="ruc" required>
      </div>
      <div class="form-group">
        <label>Address</label>
        <input v-model="address" required>
      </div>
      <div class="form-group-btn">
        <pv-button label="Discard" class="btn" style="background-color: red;" @click="goBack"></pv-button>
        <pv-button label="Sign Up" class="btn" @click="registerClient"></pv-button>
      </div>
    </form>
  </div>

</template>

<style scoped>

h2 {
  font-weight: normal;
  font-size: 24px;
  text-align:center;
  margin-bottom: 7px;
}

.register-client {
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.registration-form {
  font-family: Roboto, "sans-serif";
  background-color: #FFA500;
  color: #1E3A8A;
  padding: 20px;
  max-width: 500px;
  margin: 25px auto;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 610px;
  width: 391px
}

.form-group {
  margin: 20px;
}
/*Labels*/
.form-group label {
  font-weight: lighter;
  font-size: 15px;
}
/*Inputs*/
.form-group input {
  width: 100%;
  height: 28px;
  border-radius: 3px;
  background-color: #FCE8CC;
  border: none;
  margin-bottom: 5px;
}
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

.form-group-btn {
  margin: 30px auto 8px; /*top | both sides | bottom*/
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>