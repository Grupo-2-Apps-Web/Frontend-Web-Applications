<script>
import {Alert} from "../../registration/models/alert.entity.js";

export default {
  name: "alert-card",
  props: {
    alert : {
      type: Alert,
      required: true
    },
  },
  methods: {
    formatDate(dateString) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric'  };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    formatHour(dateString) {
      const options = { hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleTimeString(undefined, options);
    }
  }
}
</script>

<template>
  <pv-card>
    <template #content>
      <h2>{{ alert.type }}</h2>
      <p class="description">{{ alert.description }}</p>
      <p><strong>Date:</strong> {{ formatDate(alert.date) }}</p>
      <p><strong>Time:</strong> {{ formatHour(alert.date) }}</p>
    </template>
  </pv-card>
</template>

<style scoped>
  .p-card{
    background-color: #FFA500;
    border-radius: 15px;
  }

  p{
    font-family: Rubik, sans-serif;
    color: black;
  }

  h2{
    text-align: center;
    font-size: 32px;
    color: black;
    font-family: Roboto, sans-serif;
  }

  .description{
    border: 1px solid black;
    padding: 10px;
    background-color: white;
  }
</style>