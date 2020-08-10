<template>
  <div class="signin">
    <br>
    <h2>Sign in</h2>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <br>
      <v-btn class="btn_signIn" outlined @click="signIn">Signin</v-btn>
    <br>
    <div v-if="isWaiting" class="log_wait">
      <p>読み込み中</p>
    </div>
    <!-- !login -->
    <div class="isLogin_wrap" v-else>
      <div v-if="!isLogin" class="btn_login">
        <v-btn class="google_login" outlined @click="googlesignIn">GoogleでSignin</v-btn>
      </div>
      <!-- login -->
      <div v-else class="log_wrap">
        <v-btn class="google_logout" outlined @click="logOut">ログアウト</v-btn>
      </div>
    </div>
    <br>
    <router-link to="/signup">create account now!!</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Signin',
  layout: 'home',
  data: function () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
        user => {
          alert('Success!')
          this.$router.push('/project')
        },
        err => {
          alert(err.message)
        }
      )
    },
    googlesignIn: function () {
       console.log('googlesignIn')
       this.$store.dispatch('googlesignIn')
       this.$router.push('/project')
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

input {
  margin: 10px 0;
  padding: 10px;
}
.signin {
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
  background-image: url(../assets/signin.jpg);
  background-size: cover;
}
.google_login{
  color:white;
}
.btn_signIn {
  color: white;
}
</style>
© 2020 GitHub, Inc.