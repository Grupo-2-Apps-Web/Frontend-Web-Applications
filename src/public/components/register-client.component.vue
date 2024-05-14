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
    registerClient() {
      if (!this.name || !this.email || !this.password || !this.phone || !this.ruc || !this.address) {
        alert('All fields are required');
        return;
      }
      console.log('Registering client...');
      let client = new User(this.name, this.email, this.password, this.phone, this.ruc, this.address);
      this.userService.saveUser(client, 1)
        .then(() => {
          alert('Client registered successfully');
          this.$router.push('/home');
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
    <pv-card class="card">
      <template #content>
        <h1>Sign Up</h1>
        <div>
          <h3>Name</h3>
          <pv-inputtext v-model="name" style="width: 100%;" required></pv-inputtext>
        </div>
        <div>
          <h3>Email</h3>
          <pv-inputtext type="email" v-model="email" style="width: 100%;" required></pv-inputtext>
        </div>
        <div>
          <h3>Password</h3>
          <pv-inputtext type="password" v-model="password" style="width: 100%;" required></pv-inputtext>
        </div>
        <div>
          <h3>Phone</h3>
          <pv-inputtext v-model="phone" style="width: 100%;" required></pv-inputtext>
        </div>
        <div>
          <h3>RUC</h3>
          <pv-inputtext v-model="ruc" style="width: 100%;" required></pv-inputtext>
        </div>
        <div>
          <h3>Address</h3>
          <pv-inputtext v-model="address" style="width: 100%;" required></pv-inputtext>
        </div>
        <div class="buttons">
          <pv-button @click="goBack">Discard</pv-button>
          <pv-button type="submit" @click="registerClient">Register</pv-button>
        </div>
      </template>
    </pv-card>
  </div>

</template>

<style scoped>

.card {
  width: 80%;
  max-width: 500px;

}

.register-client {
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttons {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
}

</style>