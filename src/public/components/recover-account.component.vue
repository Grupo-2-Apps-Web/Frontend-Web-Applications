<script>
export default {
  name: "recover-account.component"
}
</script>

<template>
  <form class="registration-form">
    <h2>Recover your account</h2>
    <div class="form-group">
      <div class="container">
        <label for="email">Enter your email to receive instructions on how to reset your password</label><br>
      </div>
      <input type="email" id="email">
    </div>
    <div class="form-group-btn">
      <pv-button label="Recover" class="btn"></pv-button>
    </div>
    <p class="link">Go back to <a><router-link to="/login">Login</router-link></a></p>

  </form>
</template>

<style scoped>
/*Title Registrate*/
h2 {
  width: 181px;
  font-weight: normal;
  font-size: 24px;
  text-align:center;
  margin: 0 auto 25px;
}
/*All form*/
.registration-form {
  font-family: Roboto, "sans-serif";
  background-color: #FFA500;
  color: #1E3A8A;
  padding: 20px;
  max-width: 500px;
  margin: 25px auto;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 371px;
  width: 391px
}

.form-group {
  margin: 25px 10px auto; /*top | both sides | bottom*/
}
.container {
  width: 320px;
}

/*Labels and Text*/
.form-group label {
  font-weight: lighter;
  font-size: 15px;
}
/*Inputs*/
.form-group input {
  width: 326px;
  height: 28px;
  border-radius: 3px;
  background-color: #FCE8CC;
  border: none;
  margin-bottom: 5px;
  margin-top: 15px;
}

.form-group-btn {
  margin: 55px auto 8px; /*top | both sides | bottom*/
  display: flex;
  justify-content: center;
  align-items: center;
}

/*Buttons Gestion Logistica and Cliente*/
.btn {
  font-size: 18px;
  font-weight: lighter;
  color: #FFFFFF;
  background-color: #1E3A8A;
  margin: 0 10px;
  width: 326px;
  height: 33px;
  border-radius: 25px;
  border: none;
  cursor:pointer;
}
.link {
  margin: auto 10px;
  font-weight: lighter;
  font-size: 14px;
}
a {
  cursor: pointer;
  color: #1E3A8A;
}
a:visited {
  cursor: pointer;
  color: #1E3A8A;
}
a:hover {
  cursor: pointer;
  color: #108c10;
}

</style>