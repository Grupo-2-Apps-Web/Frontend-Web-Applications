<script>
import { useRouter } from 'vue-router';

export default {
  name: "RegisterUserComponent",
  setup() {
    const router = useRouter();

    const registerClient = () => {
      router.push('/register-client');
    };

    const registerEntrepreneur = () => {
      router.push('/register-entrepreneur');
    };

    return {
      registerClient,
      registerEntrepreneur
    };
  }
}
</script>

<template>
  <div class="register-user">
    <pv-card>
      <template #content>
        <h1>Sign Up</h1>
        <div>
          <p>Welcome to CargoApp! We are happy that you decided to join us😊!</p>
          <h3>Please, select your role.</h3>
          <ul>
            <li>Client: Looking for a transparent and safe transportation service.</li>
            <li>Entrepreneur: Offering transportation service.</li>
          </ul>
        </div>
        <div class="buttons">
          <pv-button @click="registerClient">Client</pv-button>
          <pv-button @click="registerEntrepreneur">Entrepreneur</pv-button>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>

.register-user {
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
}

</style>