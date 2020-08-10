<template>
  <div class="signup">
    <h2>Sign up</h2>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <br>
    <v-btn class="btn_signUp" outlined @click="signUp">Signup</v-btn>
    <br>
    <div v-if="isWaiting" class="log_wait">
      <p>読み込み中</p>
    </div>
    <!-- !login -->
    <div class="isLogin_wrap" v-else>
      <div v-if="!isLogin" class="btn_login">
        <v-btn class="google_login" outlined @click="googlesignUp">GoogleでSignin</v-btn>
      </div>
      <!-- login -->
      <div v-else class="log_wrap">
        <v-btn class="google_logout" outlined @click="logOut">ログアウト</v-btn>
      </div>
    </div>
    <br>
      <router-link to="/signin">sign in now!!</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Signup',
  layout: 'home',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
        .then(user => {
          console.log('success!!');
          alert('Create account: ', user.email)
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  color: white;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signup {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  /* margin-top: 250px;
  margin-bottom: 250px; */
  background-image: url(../assets/signup.jpg);
  background-size: cover;
}
input {
  margin: 10px 0;
  padding: 10px;
}
.google_login{
  color:white;
}
.btn_signUp {
  color: white;
}
</style>