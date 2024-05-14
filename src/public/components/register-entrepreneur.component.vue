<script>
import { useRouter } from 'vue-router';
import {UserService} from "../services/user.service.js";
import {User} from "../models/user.entity.js";

export default {
  name: "RegisterEntrepreneurComponent",
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
      address: '',
      logoImage: ''
    };
  },
  methods: {
    registerEntrepreneur() {
      if (!this.name || !this.email || !this.password || !this.phone || !this.ruc || !this.address) {
        alert('All fields are required');
        return;
      }
      console.log('Registering client...');
      let entrepreneur = new User(this.name, this.email, this.password, this.phone, this.ruc, this.address);
      this.userService.saveUser(entrepreneur, 2)
          .then(() => {
            alert('Entrepreneur registered successfully');
            this.$router.push('/home');
          })
          .catch((error) => {
            alert('Error registering entrepreneur');
            console.error(error);
          });

    },
    triggerFileUploadLoad() {
      this.$refs.fileInputLoad.click();
    },
    triggerFileUploadLogo() {
      this.$refs.fileInputLogo.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.trip.cargo.loadImage = URL.createObjectURL(file);
      }
    },
    handleFileUploadLogo(event) {
      const file = event.target.files[0];
      if (file) {
        this.trip.company.logoImage = URL.createObjectURL(file);
      }
    },
  }
}
</script>

<template>
  <div class="register-entrepreneur">
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
        <div>
          <h3>Logo</h3>
          <img src="../../assets/images/upload-image.jpg" height="100px" style="margin-right: 10px;">
          <input type="file" ref="fileInputLogo" style="display: none" @change="handleFileUploadLogo">
          <pv-button @click="triggerFileUploadLogo">Upload Logo</pv-button>
        </div>
        <div class="buttons">
          <pv-button @click="goBack">Discard</pv-button>
          <pv-button type="submit" @click="registerEntrepreneur">Register</pv-button>
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

.register-entrepreneur {
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