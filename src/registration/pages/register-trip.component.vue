<script>
import { useRouter } from 'vue-router';
import { ref, reactive } from "vue";
import { useConfirm } from 'primevue/useconfirm';
import { TripService } from "../services/trip.service";
import {EntrepreneurService} from "../../user/services/entrepreneur.service.js";
import {Evidence} from "../models/evidence.entity.js";
import {EvidenceService} from "../services/evidence.service.js";
import {Trip} from "../models/trip.entity.js";
import {DriverService} from "../services/driver.service.js";
import {VehicleService} from "../services/vehicle.service.js";
import {ClientService} from "../../user/services/client.service.js";
import {StorageService} from "../../shared/services/storage.service.js";

export default {
  name: "register-trip",
  data() {
    return {
      selectedFileName: 'none',
      image: null
    }
  },
  methods: {
    uploadImage(event) {
      const storageService = new StorageService();
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        this.selectedFileName = event.target.files[0].name;
        console.log(file);
        let reader = new FileReader();
        let name = "EVIDENCEPHOTO_IMAGE_" + Date.now();
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log(reader.result);
          storageService.uploadFile(name, reader.result).then((url) => {
            this.image = url;
          });
        };
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
    const driverService = new DriverService();
    const vehicleService = new VehicleService();
    const clientService = new ClientService();
    const trip = reactive({
      id: 0,
      name: "",
      type: "",
      weight: 0,
      loadLocation: "",
      loadDate: "",
      unloadLocation: "",
      unloadDate: "",
      driverDni: "",
      driverId: 0,
      vehiclePlatePart1: "",
      vehiclePlatePart2: "",
      vehicleId: 0,
      clientRUC: "",
      clientId: 0,
      entrepreneurId: 0
    });
    const evidence = new Evidence(
        0,
        "",
        0
    )
    const openDialog = (image) => {
      console.log(image);
      console.log(trip);
      if (!trip.name || !trip.type || !trip.weight || !trip.loadLocation || !trip.loadDate ||
          !trip.unloadLocation || !trip.unloadDate || !trip.driverDni || !trip.vehiclePlatePart1
          || !trip.vehiclePlatePart2 || !trip.clientRUC || !image) {
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
          // validate driver dni
          let driver = await driverService.getByDNI(trip.driverDni);
          if (driver === null){
            alert('Driver not found');
            return;
          }
          trip.driverId = driver.id;

          // validate vehicle plate
          let plate = `${trip.vehiclePlatePart1.toUpperCase()}-${trip.vehiclePlatePart2.toUpperCase()}`;
          let vehicle = await vehicleService.getByPlate(plate);
          if (vehicle === null){
            alert('Vehicle not found');
            return;
          }
          trip.vehicleId = vehicle.id;

          // validate client RUC
          let client = await clientService.getByRuc(trip.clientRUC);
          if (client === null){
            alert('Client not found');
            return;
          }
          trip.clientId = client.id;

          entrepreneurService.getByUserId(localStorage.getItem('user_id')).then(
              (response) => {
                let entrepreneurId = response.data.id;
                let newTrip = new Trip(
                    0,
                    trip.name,
                    trip.type,
                    Number(trip.weight),
                    trip.loadLocation,
                    trip.loadDate,
                    trip.unloadLocation,
                    trip.unloadDate,
                    Number(trip.driverId),
                    Number(trip.vehicleId),
                    Number(trip.clientId),
                    Number(entrepreneurId)
                );

                tripService.create(newTrip).then(response => {
                  evidence.link = image;
                  evidence.tripId = response.data.id;
                  evidenceService.create(evidence);
                  alert('Trip registered successfully');
                  goBack();
                });
              }
          );

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
        <p>Driver DNI</p>
        <pv-inputtext type="text" v-model="trip.driverDni" maxlength="8" style="width: 100%;"></pv-inputtext>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Vehicle Plate</p>
        <pv-inputtext v-model="trip.vehiclePlatePart1" maxlength="3" style="width: 40%;" required></pv-inputtext>
        -
        <pv-inputtext v-model="trip.vehiclePlatePart2" maxlength="3" style="width: 40%;" required></pv-inputtext>
      </div>
      <div>
        <p>Client RUC</p>
        <pv-inputtext type="text" v-model="trip.clientRUC" maxlength="11" style="width: 100%;"></pv-inputtext>
      </div>
    </div>
    <div class="grid-container-1-columns">
      <p>Load Evidence</p>
      <img src="../../assets/images/upload-image.jpg" alt="upload image template" height="250px">
      <div style="text-align: center; width: 20%; margin-left: 25px;">
        <input id="uploadImage" type="file" ref="fileInputLogo" accept=".png, .jpg, .jpeg" style="display: none" @change="uploadImage($event)">
        <span v-if="selectedFileName !== 'none'" style="margin: 5px;"> {{selectedFileName}} </span>
        <label for="uploadImage" id="uploadImageButton" style="margin-bottom: 5px;">
          Upload
        </label>
      </div>
    </div>
    <div class="button">
      <pv-button @click="goBack" style="background-color: #870a0a; padding: 15px 45px;" >
        Cancel
      </pv-button>
      <pv-confirm-dialog id="confirm" />
      <pv-button @click="openDialog(image)" label="Confirm" :aria-expanded="isVisible" :aria-controls="isVisible ? 'confirm' : null"
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