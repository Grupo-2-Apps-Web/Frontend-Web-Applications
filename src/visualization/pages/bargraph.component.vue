<script>

import monthStatistic from "../components/month-statistic.component.vue";
import destinationStatistic from "../components/destination-statistic.component.vue";

export default {
  name: 'App',
  components: {destinationStatistic, monthStatistic },
  data() {
    return {
      showMonthStatistics: true,
      showDestinationStatistics: false,
    };
  },
  methods: {
    toggleMonthStatistics() {
      this.showMonthStatistics = !this.showMonthStatistics;
      if (this.showMonthStatistics) {
        this.showDestinationStatistics = false;
      }
    },
    toggleDestinationStatistics() {
      this.showDestinationStatistics = !this.showDestinationStatistics;
      if (this.showDestinationStatistics) {
        this.showMonthStatistics = false;
      }
    },
  },
}
</script>

<template>
  <h1>Statistics</h1>
  <div class="buttons">
    <div>
      <pv-button label="Per month"
                 @click="toggleMonthStatistics"
                 :style="{ backgroundColor: showMonthStatistics ? '#9AABDE' : 'white' }"
                 class="statistic-buttons"></pv-button>
      <pv-button label="Per destination"
                 @click="toggleDestinationStatistics"
                 :style="{ backgroundColor: showDestinationStatistics ? '#9AABDE' : 'white' }"
                 class="statistic-buttons"></pv-button>
    </div>

    <div class="statistic-per-month" v-show="showMonthStatistics">
      <month-statistic></month-statistic>
    </div>
    <div class="statistic-per-destination" v-show="showDestinationStatistics">
      <destination-statistic></destination-statistic>
    </div>
  </div>

</template>

<style>
h1{
  font-size: 48px;
  text-align: center;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statistic-per-month {
  width: 60%;
}

.statistic-per-destination {
  width: 60%;
}

.statistic-buttons{
  color: black;
  font-weight: 500;
  width: 200px;
  border: white 1px solid;
  border-radius: 5px;
}


</style>