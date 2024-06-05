<script>
import {User} from "../../user/models/user.entity.js";
import {UserService} from "../../user/services/user.service.js";

export default {
  name: "client-description",
  computed: {
    id(){
      return this.$route.params.id;
    }
  },
  data() {
    return {
      client: User,
      userService: new UserService()
    }
  },
  created() {
    this.userService.getOne(this.id).then(response => {
      this.client = new User(
          response.data.id,
          response.data.userData.name,
          response.data.userAuthentication.email,
          response.data.userAuthentication.password,
          response.data.userData.phone,
          response.data.userData.ruc,
          response.data.userData.address,
          response.data.subscriptionPlan.subscription
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