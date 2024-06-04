<script>
import { useRouter } from 'vue-router';
import { ref, reactive } from "vue";
import { useConfirm } from 'primevue/useconfirm';
import { TripService } from "../services/trip.service";
import {EntrepreneurService} from "../../user/services/entrepreneur.service.js";
import {Evidence} from "../models/evidence.entity.js";
import {EvidenceService} from "../services/evidence.service.js";

export default {
  name: "register-trip",
  methods: {
    triggerFileUploadLoad() {
      this.$refs.fileInputLoad.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.evidence.link = URL.createObjectURL(file);
      }
    }
  },
  setup() {
    const router = useRouter();
    const confirm = useConfirm();
    const isVisible = ref(false);
    const tripService = new TripService();
    const entrepreneurService = new EntrepreneurService();
    const evidenceService = new EvidenceService();
    const trip = reactive({
      id: 0,
      name: "",
      type: "",
      weight: 0,
      loadLocation: "",
      loadDate: "",
      unloadLocation: "",
      unloadDate: "",
      driverId: 0,
      vehicleId: 0,
      clientId: 0,
      entrepreneurId: 0
    });
    const evidence = new Evidence(
        0,
        0,
        ""
    )
    const openDialog = () => {
      console.log(trip);
      if (!trip.name || !trip.type || !trip.weight || !trip.loadLocation || !trip.loadDate ||
          !trip.unloadLocation || !trip.unloadDate || !trip.driverId || !trip.vehicleId ||
          !trip.clientId) {
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
        accept: async () => {
          const response = await entrepreneurService.getByUserId(localStorage.getItem('user_id'));
          trip.entrepreneurId = Number(response.id);
          trip.id = Number(trip.id);
          trip.driverId = Number(trip.driverId);
          trip.vehicleId = Number(trip.vehicleId);
          trip.clientId = Number(trip.clientId);
          trip.weight = Number(trip.weight);

          tripService.create(trip).then(response => {
            evidence.tripId = response.data.id;
            evidenceService.create(evidence);
            alert('Trip registered successfully');
            goBack();
          });
        }
      });
    };

    const goBack = () => {
      router.go(-1);
    };

    return {
      openDialog,
      goBack,
      trip,
      evidence,
      isVisible
    };
  }
}
</script>

<template>
    <div class="container">
      <h1>Trip Registration</h1>
      <div class="grid-container-2-columns">
        <div>
          <p>Name</p>
          <pv-inputtext v-model="trip.name" style="width: 100%;"></pv-inputtext>
        </div>
        <div>
          <p>Type</p>
          <pv-inputtext v-model="trip.type" style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <div class="grid-container-2-columns">
        <div>
          <p>Weight</p>
          <pv-inputtext type="number" v-model="trip.weight" style="width: 100%;"></pv-inputtext>
        </div>
        <div>
          <p>Load Location</p>
          <pv-inputtext v-model="trip.loadLocation" style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <div class="grid-container-2-columns">
        <div>
          <p>Load Date</p>
          <pv-inputtext type="date" v-model="trip.loadDate" style="width: 100%;"></pv-inputtext>
        </div>
        <div>
          <p>Unload Location</p>
          <pv-inputtext v-model="trip.unloadLocation" style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <div class="grid-container-2-columns">
        <div>
          <p>Unload Date</p>
          <pv-inputtext type="date" v-model="trip.unloadDate" style="width: 100%;"></pv-inputtext>
        </div>
        <div>
          <p>Driver ID</p>
          <pv-inputtext type="number" v-model="trip.driverId" style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <div class="grid-container-2-columns">
        <div>
          <p>Vehicle ID</p>
          <pv-inputtext type="number" v-model="trip.vehicleId" style="width: 100%;"></pv-inputtext>
        </div>
        <div>
          <p>Client ID</p>
          <pv-inputtext type="number" v-model="trip.clientId" style="width: 100%;"></pv-inputtext>
        </div>
      </div>
      <div class="grid-container-1-columns">
        <p>Load Evidence</p>
        <img src="../../assets/images/upload-image.jpg" alt="upload image template" height="250px">
        <div style="text-align: center; width: 20%; margin-left: 25px;">
          <input type="file" ref="fileInputLoad" @change="handleFileUpload" style="display: none" />
          <pv-button @click="triggerFileUploadLoad" style="background-color:#006400;">Upload</pv-button>
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