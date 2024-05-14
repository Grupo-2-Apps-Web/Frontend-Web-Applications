<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'UserComponent',
  setup() {
    const router = useRouter();
    const store = useStore();
    const goToClient = () => {
      router.push('/client');
      store.commit('setIsClient', 1);
      console.log(store.state.isClient);
    };

    const goToEntrepreneur = () => {
      router.push('/entrepreneur');
      store.commit('setIsClient', 2);
      console.log(store.state.isClient);
    };

    return {
      goToClient,
      goToEntrepreneur
    };
  }
}
</script>

<template>
  <div class="user-component">
    <pv-card>
      <template #content>
        <pv-button @click="goToClient">Client</pv-button>
        <pv-button @click="goToEntrepreneur">Entrepreneur</pv-button>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.user-component {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

pv-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>