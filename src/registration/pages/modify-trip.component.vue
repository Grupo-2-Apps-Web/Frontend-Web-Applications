<script>


export default {
  name: "modify-trip.component",
  data() {
    return {
      id: this.$route.params.id,
      name: '',
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
    }
  },
  created() {
    const tripService = new TripService();
    tripService.getTripsByID(this.id)
        .then(response => {
          console.log(response.data);
          const trip = response.data;
          if (trip) {
            this.name = trip.name;
            this.driver.fullName = trip.driver.fullName;
            this.driver.DNI = trip.driver.DNI;
            this.driver.license = trip.driver.license;
            this.driver.contactNumber = trip.driver.contactNumber;
            this.vehicle.model = trip.vehicle.model;
            this.vehicle.plate = trip.vehicle.plate;
            this.vehicle.tractorPlate = trip.vehicle.tractorPlate;
            this.vehicle.maxLoad = trip.vehicle.maxLoad;
            this.vehicle.volume = trip.vehicle.volume;
            this.cargo.type = trip.cargo.type;
            this.cargo.weight = trip.cargo.weight;
            this.cargo.loadLocation = trip.cargo.loadLocation;
            this.cargo.loadImage = trip.cargo.loadImage;
            this.cargo.loadDate = trip.cargo.loadDate;
            this.cargo.unloadLocation = trip.cargo.unloadLocation;
            this.cargo.unloadDate = trip.cargo.unloadDate;
            this.company.name = trip.company.name;
            this.company.ruc = trip.company.ruc;
            this.company.logoImage = trip.company.logoImage;
          }
        });
  },
  methods: {
    saveChanges() {
      const tripA = {
        id: this.id,
        name: this.name,
        driver: {
          fullName: this.driver.fullName,
          DNI: this.driver.DNI,
          license: this.driver.license,
          contactNumber: this.driver.contactNumber
        },
        vehicle: {
          model: this.vehicle.model,
          plate: this.vehicle.plate,
          tractorPlate:  this.vehicle.tractorPlate,
          maxLoad: this.vehicle.maxLoad,
          volume: this.vehicle.volume
        },
        cargo: {
          type: this.cargo.type,
          weight: this.cargo.weight,
          loadLocation: this.cargo.loadLocation,
          loadImage: this.cargo.loadImage,
          loadDate: this.cargo.loadDate,
          unloadLocation: this.cargo.unloadLocation,
          unloadDate: this.cargo.unloadDate
        },
        company: {
          name: this.company.name,
          ruc: this.company.ruc,
          logoImage: this.company.logoImage
        }
      };
      console.log(tripA);
      const tripService = new TripService();
      tripService.setTrip(this.id, tripA)
          .then(() => {
            alert('Changes saved successfully.');
          })
          .then(() => {
            this.$router.push('/entrepreneur/register')
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
    goBack() {
      this.$router.go(-1);
    }
  }

}
</script>

<template>
  <div class="container">
    <h1>Modify Trip</h1>
    <h2>Driver</h2>
    <div class="grid-container-2-columns">
      <div>
        <p>Name</p>
        <pv-inputtext v-model="driver.fullName" style="width: 100%;"></pv-inputtext>
      </div>
      <div>
        <p>DNI</p>
        <pv-inputtext v-model="driver.DNI"  style="width: 100%;"></pv-inputtext>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Driver's license number</p>
        <pv-inputtext v-model="driver.license" style="width: 100%;"></pv-inputtext>
      </div>
      <div>
        <p>Contact number</p>
        <pv-inputtext v-model="driver.contactNumber" style="width: 100%;"></pv-inputtext>
      </div>
    </div>
    <h2>Vehicle</h2>
    <div class="grid-container-1-column">
      <div>
        <p>Model</p>
        <pv-inputtext v-model="vehicle.model" style="width: 100%;"></pv-inputtext>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Trailer plate</p>
        <pv-inputtext v-model="vehicle.plate" style="width: 100%;"></pv-inputtext>
      </div>
      <div>
        <p>Tractor plate</p>
        <pv-inputtext v-model="vehicle.tractorPlate" style="width: 100%;"></pv-inputtext>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Maximum Capacity (kg)</p>
        <pv-inputtext type="number" v-model="vehicle.maxLoad" style="width: 100%;"></pv-inputtext>
      </div>
      <div>
        <p>Volume (m^3)</p>
        <pv-inputtext type="number" v-model="vehicle.volume" style="width: 100%;"></pv-inputtext>
      </div>
    </div>
    <h2>Load</h2>
    <div class="grid-container-2-columns">
      <div>
        <p>Type</p>
        <pv-inputtext v-model="cargo.type" style="width: 100%;"></pv-inputtext>
      </div>
      <div>
        <p>Total Weight</p>
        <pv-inputtext type="number" v-model="cargo.weight" style="width: 100%;"></pv-inputtext>
      </div>
    </div>
    <h2>Trip</h2>
    <div class="grid-container-2-columns">
      <div>
        <p>Load Location</p>
        <pv-inputtext v-model="cargo.loadLocation" style="width: 100%;"></pv-inputtext>
      </div>
      <div>
        <p>Unload Location</p>
        <pv-inputtext v-model="cargo.unloadLocation" style="width: 100%;"></pv-inputtext>
      </div>
    </div>
    <div class="grid-container-2-columns">
      <div>
        <p>Load Date</p>
        <pv-inputtext type="date" v-model="cargo.loadDate" style="width: 100%;"></pv-inputtext>
      </div>
      <div>
        <p>Estimated Unload Date</p>
        <pv-inputtext type="date" v-model="cargo.unloadDate" style="width: 100%;"></pv-inputtext>
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
      <pv-inputtext v-model="company.name" style="width: 100%;"></pv-inputtext>
    </div>
    <div class="grid-container-1-columns">
      <p>Company Ruc</p>
      <pv-inputtext v-model="company.ruc" style="width: 100%;"></pv-inputtext>
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
      <pv-button @click="saveChanges" >
        Save
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