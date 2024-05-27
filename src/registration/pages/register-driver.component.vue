<script>
import { useRouter } from 'vue-router';
import { ref, reactive } from "vue";
import { useConfirm } from 'primevue/useconfirm';
import { DriverService } from "../services/driver.service.js";
import {Driver} from "../models/driver.entity.js";

export default {
  name: "register-driver.component",
  setup() {
    const router = useRouter();
    const confirm = useConfirm();
    const isVisible = ref(false);
    const driverService = new DriverService();
    const driverData = reactive({
      id: 0,
      name: '',
      dni: '',
      license: '',
      contact_number: ''
    });

    const isNumeric = (data) => {
      const re = /^[0-9]+$/;
      return re.test(data);
    };

    const isValidLicense = (license) => {
      const re = /^[A-Za-z0-9]+$/;
      return re.test(license);
    };

    const openDialog = () => {
      if (!driverData.name || !driverData.dni || !driverData.license || !driverData.contact_number) {
        alert('All fields are required');
        return;
      }
      // Validate DNI and contact number
      if (!isNumeric(driverData.dni) || !isNumeric(driverData.contact_number)) {
        alert('DNI and Contact Number must be numeric');
        return;
      }
      if (driverData.dni.length !== 8) {
        alert('DNI must be 8 digits');
        return;
      }
      if (driverData.contact_number.length !== 9) {
        alert('Contact Number must be 9 digits');
        return;
      }
      // Validate License
      if (!isValidLicense(driverData.license)) {
        alert('License must be alphanumeric');
        return;
      }
      confirm.require({
        message: 'The data requested for the driver will be recorded. Are you sure you want to record it?',
        header: 'Register Driver',
        onShow: () => {
          isVisible.value = true;
        },
        onHide: () => {
          isVisible.value = false;
        },
        accept: () => {
          driverService.getAll().then(response => {
            const drivers = response.data;
            const driver = drivers.find(driver => driver.dni === driverData.dni);
            if (driver) {
              alert('The driver already exists. DNI is registered.');
            } else {
              const newDriver = new Driver(
                  0,
                  driverData.name,
                  driverData.dni,
                  driverData.license,
                  driverData.contact_number
              );
              driverService.create(newDriver);
              alert('Driver registered successfully');
              goBack();
            }
          });


        }
      });
    };


    const goBack = () => {
      router.go(-1);
    }

    return {
      openDialog,
      goBack,
      driverData,
      isVisible
    };
  }
}
</script>

<template>
  <div class="container">
    <h1>Register Driver</h1>
    <div class="grid-container-2-columns">
      <div>
        <p>Name</p>
        <pv-inputtext v-model="driverData.name" style="width: 90%;" required></pv-inputtext>
      </div>
      <div>
        <p>DNI</p>
        <pv-inputtext v-model="driverData.dni" maxlength="8" style="width: 100%;" required></pv-inputtext>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>License</p>
        <pv-inputtext v-model="driverData.license" maxlength="9" style="width: 90%;" required></pv-inputtext>
      </div>
      <div>
        <p>Contact Number</p>
        <pv-inputtext v-model="driverData.contact_number" maxlength="9" style="width: 100%;" required></pv-inputtext>
      </div>
    </div>
    <div class="button">
      <pv-button @click="goBack" style="background-color: #870a0a; padding: 15px 45px;" >
        Cancel
      </pv-button>
      <pv-confirm-dialog id="confirm" />
      <pv-button @click="openDialog()" label="Confirm" :aria-expanded="isVisible" :aria-controls="isVisible ? 'confirm' : null"
                 style="background-color: #006400; padding: 15px 45px;" >
        Register
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

.button {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 2em;
}
</style>