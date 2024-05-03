<script setup>
import { computed, ref } from "vue";
import Sidebar from "./public/sidebar.component.vue";

const visible = ref(false);

const toggleSidebar = () => {
  visible.value = !visible.value;
};

</script>

<template>
  <sidebar :toggleSidebar="toggleSidebar" :visible="visible" />
  <router-view></router-view>
</template>

<style scoped>
</style>
