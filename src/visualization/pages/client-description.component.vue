<script>
import {Client} from "../../user/models/client.entity.js";
import {ClientService} from "../../user/services/client.service.js";

export default {
  name: "client-description",
  computed: {
    id(){
      return this.$route.params.id;
    }
  },
  data() {
    return {
      client: Client,
      clientService: new ClientService()
    }
  },
  created() {
    this.clientService.getOne(this.id).then(response => {
      this.client = new Client(
          response.data.id,
          response.data.name,
          response.data.phone,
          response.data.ruc,
          response.data.address,
          response.data.subscription,
          response.data.userId
      );
    });

  }
}
</script>

<template>
  <pv-button style="margin-top: 20px; margin-left: 10px;" @click="this.$router.go(-1);">Return</pv-button>
  <div class="container-info-general">
    <h1>Client Info</h1>
    <div class="container-info">
      <p>
        <strong>ID:</strong>
        {{ client.id }}
      </p>
    </div>
    <div class="container-info">
      <p>
        <strong>NAME:</strong>
        {{ client.name }}
      </p>
    </div>
    <div class="container-info">
      <p>
        <strong>RUC:</strong>
        {{ client.ruc }}
      </p>
    </div>
    <div class="container-info">
      <p>
        <strong>ADDRESS:</strong>
        {{ client.address }}
      </p>
    </div>
  </div>
</template>

<style scoped>

.container-general h1 {
  text-align: center;
}
.container-info-general {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container-info {
  background-color: #FFA500;
  width: 80%;
  margin-bottom: 10px;
}

.container-info p {
  padding: 0 10px;
}

@media (min-width: 1300px) {

  .container-general img {
    margin-right: 200px;
    margin-bottom: 0;
  }

  .container-info {
    width: 721px;
  }
}
</style>