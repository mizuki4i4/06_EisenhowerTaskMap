import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyACRKeR2Sl-ZtFMJ2AbwnicXPL33RAdZ34",
    authDomain: "todos-74cb2.firebaseapp.com",
    databaseURL: "https://todos-74cb2.firebaseio.com",
    projectId: "todos-74cb2",
    storageBucket: "todos-74cb2.appspot.com",
    messagingSenderId: "394789039370",
    appId: "1:394789039370:web:3e9e1280c364937c251ef3",
    measurementId: "G-989XXV5YE9"
  };

firebase.initializeApp(firebaseConfig)

export default firebase
