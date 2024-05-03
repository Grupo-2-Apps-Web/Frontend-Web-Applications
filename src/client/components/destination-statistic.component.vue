<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { TripService } from "../services/trip.service.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "destination-statistic",
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    }
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Number of trips',
            backgroundColor: '#002E43',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Visualization per destination',
            font: {
              size: 20
            }
          }
        }
      },
      showStatistics: false,
    };
  },

  async mounted() {
    try {
      const statisticService = new TripService();
      const response = await statisticService.getTrips();
      if (response.data) {
        const trips = response.data;
        // Create an object to store the counts for each location
        const locationCounts = trips.reduce((counts, trip) => {
          const location = trip.cargo.loadLocation;
          counts[location] = (counts[location] || 0) + 1;
          return counts;
        }, {});
        // Update the chart data
        this.chartData.labels.push(...Object.keys(locationCounts));
        this.chartData.labels.forEach((label, index) => {
          this.chartData.datasets[0].data[index] = locationCounts[label];
        });
      } else {
        console.error('No trip data found in the response.');
      }
    } catch (error) {
      console.error('Service Error', error);
    }
  }
};
</script>

<template>
  <Bar
      ref="chart"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
  />
</template>

<style scoped>

</style>
