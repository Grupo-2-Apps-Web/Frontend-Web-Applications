<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import {TripService} from "../../registration/services/trip.service.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "month-statistic",
  components: { Bar },
  props:{
    chartId: {
      type: String,
      default: 'bar-chart'
    }
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Number of trips',
            backgroundColor: '#002E43', // Color de fondo de las barras
            borderColor: 'rgba(54, 162, 235, 1)', // Color del borde de las barras
            borderWidth: 1,
            data: Array(12).fill(0) // Inicializar un array de 12 elementos con valor 0 para almacenar los conteos de viajes
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Visualization per month',
            font: {
              size: 20
            }
          }
        }
      }
    };
  },
  async mounted() {
    const statisticService = new TripService();
    const response = await statisticService.getAll();
    if (response.data) {
      const trips = response.data;

      // Contar la cantidad de envíos por mes
      trips.forEach(trip => {
        const tripDate = new Date(trip.load_date);
        const monthIndex = tripDate.getMonth();
        this.chartData.datasets[0].data[monthIndex]++;
      });
    } else {
      console.error('Not trip data found.');
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


