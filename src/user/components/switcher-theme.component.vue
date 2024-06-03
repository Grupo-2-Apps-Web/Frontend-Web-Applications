<template>
  <div class="theme-switcher">
    <button @click="SET_THEME('Light')" v-bind:class="{ selected: getTheme === 'Light' }">Light</button>
    <button @click="SET_THEME('Dark')" v-bind:class="{ selected: getTheme === 'Dark' }">Dark</button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
  name: "SwitcherTheme",
  methods: {
    ...mapMutations(['SET_THEME'])
  },
  computed: {
    ...mapGetters(['getTheme'])
  }
}
</script>

<style scoped>
.theme-switcher button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.theme-switcher button:hover {
  opacity: 0.8;
}

.theme-switcher .selected {
  background-color: #2196F3;
}

.theme-switcher button:not(.selected) {
  background-color: #888;
}
</style>