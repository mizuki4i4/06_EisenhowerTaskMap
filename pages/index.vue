<template>
<ul>
  <li class="home-image">
  </li>
  <li class="home-captions">
    <div class="home-detail">EisenhowerTaskMap
      <div class="my-2">
        <v-btn>Signin</v-btn>
      </div>
      <div class="my-2">
        <v-btn>Signup</v-btn>
      </div>
    </div>
    <div>producted by mizuki0414</div>
  </li>
</ul>
  
</template>

<script>
export default {
  layout: 'home'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body { height: 100%; }

.text-center {
  margin-top: 0px;
}

ul {
  display: flex;
}

li {
  list-style: none;
}

.home-image {
  width: 62vw;
  height: 100vh;
  background-image: url("../assets/index.jpg");
  background-size: cover;
  animation: 3s fadeIn;
}

.home-captions {
  align-self: center;
  margin-left: 4vw;
}

.home-detail {
  text-align: center;
  width: 30vw;
  height: 30vh;
  margin-left: auto;
  margin-right: auto;
  border: solid 3px #000000;
  background-color: #000000;
  font-size: 45px;
  color: white;
}

/* @keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 0.7; }
} */

.v-btn:not(.v-btn--round).v-size--default {
  margin-right: 8px;
}
</style>