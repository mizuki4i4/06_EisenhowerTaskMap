<template>
  <div class="home">
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <h1>FOTON</h1>
        <h4>Future Of Telematics. Optimized network </h4>
      </v-col>
      <v-btn outlined color="primary" href="http://127.0.0.1:5501/index.html">Signin</v-btn>
      <v-btn outlined color="warning" router-link to="/Signup">Signup</v-btn>
    </v-row>
  </div>
</template>
<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.v-content__wrap {
  background-color: black;
}

.text-center {
  margin-top: 0px;
}

h1 {
  margin-left: auto;
  margin-right: auto;
  color: white;
  font-weight: bold;
  font-size: 100px;
  margin-block-start: 1.0em;
  margin-block-end: 0.1em;
  animation: 3s fadeIn;
  opacity: 0.7;
}

h4 {
  color: white;
  margin-block-end: 0.1em;
  animation: 3s fadeIn;
	opacity: 0.7;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 0.7; }
}

.home {
  height: 100%;
  width: 100%;
  background-image: url("../assets/index.jpg");
  background-size: cover;
  animation: 3s fadeIn;
}

.v-btn:not(.v-btn--round).v-size--default {
  margin-right: 8px;
}
</style>