<script>
import { useRouter } from 'vue-router';
import {UserService} from "../../user/services/user.service.js";
import {User} from "../../user/models/user.entity.js";
import {Entrepreneur} from "../../user/models/entrepreneur.entity.js";
import {EntrepreneurService} from "../../user/services/entrepreneur.service.js";
import {Configuration} from "../../user/models/configuration.entity.js";
import {ConfigurationService} from "../../user/services/configuration.service.js";
import {inject} from "vue";
import {AuthenticationService} from "../services/authentication.service.js";
import {StorageService} from "../../shared/services/storage.service.js";

export default {
  name: "RegisterEntrepreneurComponent",
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.go(-1);
    };

    return {
      router,
      goBack
    };

  },
  data() {
    return {
      userService: new UserService(),
      entrepreneurService: new EntrepreneurService(),
      configurationService: new ConfigurationService(),
      authenticationService: new AuthenticationService(),
      storageService: new StorageService(),
      store: inject('store'),
      name: '',
      email: '',
      password: '',
      phone: '',
      ruc: '',
      address: '',
      logoImage: null,
      selectedFileName: 'none'
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
    async registerEntrepreneur() {
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
      if (this.selectedFileName === 'none' || this.logoImage === null) {
        alert('Please upload a logo image');
        return;
      }
      // Register entrepreneur
      this.authenticationService.signUp(this.email, this.password).then( (r) => {
        this.authenticationService.signIn(this.email, this.password).then((response) => {
          let userId = response.data.id;
          let token = response.data.token;
          localStorage.setItem('token', token);
          this.store.commit('setUserId', userId);
          this.store.commit('setUserType', 'entrepreneur');
          this.store.commit('setIsActive', true);
          let newEntrepreneur = new Entrepreneur(0, this.name, this.phone, this.ruc, this.address, "Basic", userId, this.logoImage);
          this.entrepreneurService.create(newEntrepreneur).then(() => {
            this.router.push('/entrepreneur');
            console.log('El empresario con user-id ' + userId + ' logeado con éxito');
          });
          this.configurationService.create(new Configuration(0, userId, 'Light', 'Grid', false, false));
        }).catch((error) => {
          alert('Error logging in');
          console.error(error);
        });
      });

    },
    uploadImage(event) {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        this.selectedFileName = event.target.files[0].name;
        console.log(file);
        let reader = new FileReader();
        let name = "PROFILEPHOTO_IMAGE_" + Date.now();
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log(reader.result);
          this.storageService.uploadFile(name, reader.result).then((url) => {
            this.logoImage = url;
          });
        };
      }
    }
  }
}
</script>

<template>
  <div class="register-entrepreneur">
    <form class="registration-form">
        <h2>Sign Up - Entrepreneur</h2>
        <div class="form-group">
          <label>Name</label>
          <input v-model="name" required>
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
          <input v-model="phone" maxlength="9" required>
        </div>
        <div class="form-group">
          <label>RUC</label>
          <input v-model="ruc" maxlength="11" required>
        </div>
        <div class="form-group">
          <label>Address</label>
          <input v-model="address" required>
        </div>
        <div class="form-group">
          <label>Logo</label>
        </div>
        <div class="image-group">
          <img src="../../assets/images/upload-image.jpg" height="100px" style="margin-bottom: 5px;">
          <input id="uploadImage" type="file" ref="fileInputLogo" accept=".png, .jpg, .jpeg" style="display: none" @change="uploadImage($event)">
          <span v-if="selectedFileName !== 'none'" style="margin: 5px;"> {{selectedFileName}} </span>
          <label for="uploadImage" id="uploadImageButton" style="margin-bottom: 5px;">
            Upload
          </label>
        </div>
        <div class="form-group-btn">
          <pv-button label="Discard" class="btn" style="background-color: red;" @click="goBack"></pv-button>
          <pv-button label="Sign Up" class="btn" @click="registerEntrepreneur"></pv-button>
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

.register-entrepreneur {
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
  height: 850px;
  width: 391px
}

.form-group {
  margin: 20px;
}

.image-group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

#uploadImageButton {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #006400;
  color: #FFFFFF;
  padding: 15px;
  border-radius: 35px;
  text-align: center;
  align-content: center;
  cursor: pointer;
}


</style>