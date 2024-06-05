<template>
  <div class="view-switcher">
    <button @click="SET_VIEW('Grid')" v-bind:class="{ selected: getView === 'Grid' }">Grid</button>
    <button @click="SET_VIEW('List')" v-bind:class="{ selected: getView === 'List' }">List</button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
  name: "SwitcherView",
  methods: {
    ...mapMutations(['SET_VIEW'])
  },
  computed: {
    ...mapGetters(['getView'])
  }
}
</script>

<style scoped>
.view-switcher button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-switcher button:hover {
  opacity: 0.8;
}

.view-switcher .selected {
  background-color: #2196F3;
}

.view-switcher button:not(.selected) {
  background-color: #888;
}
</style>