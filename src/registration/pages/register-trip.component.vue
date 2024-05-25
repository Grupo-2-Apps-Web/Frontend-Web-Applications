<script>
import { useRouter } from 'vue-router';
import { ref, reactive } from "vue";
import { useConfirm } from 'primevue/useconfirm';
import { TripService } from '../../entrepreneur/services/trip.service.js'

export default {
  name: "register-trip",
  methods: {
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
  },
  setup() {
    const router = useRouter();
    const confirm = useConfirm();
    const isVisible = ref(false);
    const tripService = new TripService();
    const trip = reactive({
      id: "",
      name: "",
      driver: {
        fullName: "",
        DNI: "",
        license: "",
        contactNumber: ""
      },
      vehicle: {
        model: "",
        plate: "",
        tractorPlate: "",
        maxLoad: "",
        volume: ""
      },
      cargo: {
        type: "",
        weight: "",
        loadLocation: "",
        loadImage: "",
        loadDate: "",
        unloadLocation: "",
        unloadDate: ""
      },
      company: {
        name: "",
        ruc: "",
        logoImage: ""
      }
    });

    const openDialog = () => {
      console.log(trip);
      if (!trip.driver.fullName || !trip.driver.DNI || !trip.driver.license || !trip.driver.contactNumber ||
          !trip.vehicle.model || !trip.vehicle.plate || !trip.vehicle.tractorPlate || !trip.vehicle.maxLoad || !trip.vehicle.volume ||
          !trip.cargo.type || !trip.cargo.weight || !trip.cargo.loadLocation  || !trip.cargo.loadDate ||
          !trip.cargo.unloadLocation || !trip.cargo.unloadDate || !trip.company.name || !trip.company.ruc) {
        alert('All fields are required');
        return;
      }
      confirm.require({
        message: 'The data requested for the trip will be recorded. Are you sure you want to record it?',
        header: 'Register Trip',
        onShow: () => {
          isVisible.value = true;
        },
        onHide: () => {
          isVisible.value = false;
        },
        accept: () => {
          tripService.saveTrip(trip);
          alert('Trip registered successfully');
          goBack();
        }
      });
    };

    const goBack = () => {
      router.go(-1);
    };

    return {
      openDialog,
      goBack,
      trip
    };
  }
}
</script>

<template>
    <div class="container">
      <h1>Trip Registration</h1>
      <h2>Driver</h2>
      <div class="grid-container-2-columns">
        <div>
          <p>Name</p>
          <pv-inputtext v-model="trip.driver.fullName" style="width: 100%;"></pv-inputtext>
        </div>
        <div>
          <p>DNI</p>
          <pv-inputtext v-model="trip.driver.DNI"  style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <div class="grid-container-2-columns">
        <div>
          <p>Driver's license number</p>
          <pv-inputtext v-model="trip.driver.license" style="width: 100%;"></pv-inputtext>
        </div>
        <div>
          <p>Contact number</p>
          <pv-inputtext v-model="trip.driver.contactNumber" style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <h2>Vehicle</h2>
      <div class="grid-container-1-column">
        <div>
          <p>Model</p>
          <pv-inputtext v-model="trip.vehicle.model" style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <div class="grid-container-2-columns">
        <div>
          <p>Trailer plate</p>
          <pv-inputtext v-model="trip.vehicle.plate" style="width: 100%;"></pv-inputtext>
        </div>
        <div>
          <p>Tractor plate</p>
          <pv-inputtext v-model="trip.vehicle.tractorPlate" style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <div class="grid-container-2-columns">
        <div>
          <p>Maximum Capacity (kg)</p>
          <pv-inputtext type="number" v-model="trip.vehicle.maxLoad" style="width: 100%;"></pv-inputtext>
        </div>
        <div>
          <p>Volume (m^3)</p>
          <pv-inputtext type="number" v-model="trip.vehicle.volume" style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <h2>Load</h2>
      <div class="grid-container-2-columns">
        <div>
          <p>Type</p>
          <pv-inputtext v-model="trip.cargo.type" style="width: 100%;"></pv-inputtext>
        </div>
        <div>
          <p>Total Weight</p>
          <pv-inputtext type="number" v-model="trip.cargo.weight" style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <h2>Trip</h2>
      <div class="grid-container-2-columns">
        <div>
          <p>Load Location</p>
          <pv-inputtext v-model="trip.cargo.loadLocation" style="width: 100%;"></pv-inputtext>
        </div>
        <div>
          <p>Unload Location</p>
          <pv-inputtext v-model="trip.cargo.unloadLocation" style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <div class="grid-container-2-columns">
        <div>
          <p>Load Date</p>
          <pv-inputtext type="date" v-model="trip.cargo.loadDate" style="width: 100%;"></pv-inputtext>
        </div>
        <div>
          <p>Estimated Unload Date</p>
          <pv-inputtext type="date" v-model="trip.cargo.unloadDate" style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <div class="grid-container-1-columns">
        <p>Load Evidence</p>
        <img src="../../assets/images/upload-image.jpg" height="250px">
        <div style="text-align: center; width: 20%; margin-left: 25px;">
          <input type="file" ref="fileInputLoad" @change="handleFileUpload" style="display: none" />
          <pv-button @click="triggerFileUploadLoad" style="background-color:#006400;">Upload</pv-button>
        </div>
      </div>
      <div class="grid-container-1-columns">
        <p>Company Name</p>
        <pv-inputtext v-model="trip.company.name" style="width: 100%;"></pv-inputtext>
      </div>
      <div class="grid-container-1-columns">
        <p>Company Ruc</p>
        <pv-inputtext v-model="trip.company.ruc" style="width: 100%;"></pv-inputtext>
      </div>
      <div class="grid-container-1-columns">
        <p>Company Logo</p>
        <img src="../../assets/images/upload-image.jpg" height="250px">
        <div style="text-align: center; width: 20%; margin-left: 25px;">
          <input type="file" ref="fileInputLogo" @change="handleFileUploadLogo" style="display: none" />
          <pv-button @click="triggerFileUploadLogo" style="background-color:#006400;">Upload</pv-button>
        </div>
      </div>
      <div class="button">
        <pv-button @click="goBack" style="background-color: #870a0a; padding: 15px 45px;" >
          Cancel
        </pv-button>
        <pv-confirm-dialog id="confirm" />
        <pv-button @click="openDialog()" label="Confirm" :aria-expanded="visible" :aria-controls="visible ? 'confirm' : null"
                   style="background-color: #006400; padding: 15px 45px;" >
          Register
        </pv-button>
      </div>
    </div>

</template>

<style scoped>
 h1 {
   text-align:start;
 }
  .container {
    margin: 20px 90px;
  }

  .grid-container-2-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .button {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    font-size: 2em;
  }

</style>