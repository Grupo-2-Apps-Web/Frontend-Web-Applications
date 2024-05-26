<script>
import {DriverService} from "../services/driver.service.js";
import {Driver} from "../models/driver.entity.js";

export default {
  name: "modify-driver.component",
  data() {
    return {
      id: this.$route.params.id,
      name: '',
      dni: '',
      license: '',
      contact_number: ''
    }
  },
  created() {
    const driverService = new DriverService();
    driverService.getOne(this.id)
        .then(response => {
          this.id = response.data.id;
          this.name = response.data.name;
          this.dni = response.data.dni;
          this.license = response.data.license;
          this.contact_number = response.data.contact_number;
        });
  },
  methods: {
    saveChanges() {
      const isNumeric = (data) => {
        const re = /^[0-9]+$/;
        return re.test(data);
      };
      const isValidLicense = (license) => {
        const re = /^[A-Za-z0-9]+$/;
        return re.test(license);
      };
      if(this.name === '' || this.dni === '' || this.license === '' || this.contact_number === '') {
        alert('All fields are required.');
        return;
      }
      // Validate DNI and contact number
      if (!isNumeric(this.dni) || !isNumeric(this.contact_number)) {
        alert('DNI and Contact Number must be numeric');
        return;
      }
      if (this.dni.length !== 8) {
        alert('DNI must be 8 digits');
        return;
      }
      if (this.contact_number.length !== 9) {
        alert('Contact Number must be 9 digits');
        return;
      }
      // Validate License
      if (!isValidLicense(this.license)) {
        alert('License must be alphanumeric');
        return;
      }

      const driverService = new DriverService();
      const driver = new Driver(
          this.id,
          this.name,
          this.dni,
          this.license,
          this.contact_number
      )
      driverService.update(driver.id, driver)
          .then(() => {
            alert('Changes saved successfully.');
          })
          .then(() => {
            this.$router.push('/entrepreneur/register')
          });
    },

    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<template>
  <div class="container">
    <h1>Modify Driver</h1>
    <div class="grid-container-2-columns">
      <div>
        <p>Name</p>
        <pv-inputtext v-model="name" style="width: 90%;" required></pv-inputtext>
      </div>
      <div>
        <p>DNI</p>
        <pv-inputtext v-model="dni" maxlength="8" style="width: 100%;" required></pv-inputtext>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>License</p>
        <pv-inputtext v-model="license" maxlength="9" style="width: 90%;" required></pv-inputtext>
      </div>
      <div>
        <p>Contact Number</p>
        <pv-inputtext v-model="contact_number" maxlength="9" style="width: 100%;" required></pv-inputtext>
      </div>
    </div>
    <div class="buttons">
      <pv-button @click="goBack" style="background-color: #870a0a; padding: 15px 45px;" >
        Cancel
      </pv-button>
      <pv-button @click="saveChanges" style="background-color: #006400; padding: 15px 45px;" >
        Save
      </pv-button>
    </div>
  </div>
</template>

<style scoped>
h1, h2 {
  text-align:start;
}
.container {
  margin: 20px 90px;
  position: relative;
  padding-bottom: 120px;
}

.grid-container-2-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 2em;
}
</style>