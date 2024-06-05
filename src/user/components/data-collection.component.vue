<template>
  <div class="data">
    <h2>Allow data collection</h2>
    <label class="switch">
      <input type="checkbox" v-model="dataCollection" @change="saveState" />
      <span class="slider round"></span>
    </label>
    <h2>Allow third-party data sharing</h2>
    <label class="switch">
      <input type="checkbox" v-model="dataSharing" @change="saveState" />
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "DataCollectionComponent",
  data() {
    return {
      dataCollection: false,
      dataSharing: false
    };
  },
  methods: {
    saveState() {
      localStorage.setItem('dataCollection', this.dataCollection);
      localStorage.setItem('dataSharing', this.dataSharing);
    },
    loadState() {
      this.dataCollection = localStorage.getItem('dataCollection') === 'true';
      this.dataSharing = localStorage.getItem('dataSharing') === 'true';
    }
  },
  mounted() {
    this.loadState();
  }
};
</script>

<style scoped>
.data {
  text-align: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>