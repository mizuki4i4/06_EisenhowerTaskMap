<template>
 <div class="page">
  <br>
  <div class="text_wrap">
    <h1>{{ $store.state.userProjects[$store.state.userSelectindex] }}</h1>
    <h5>{{ $store.state.userProjectdetails[$store.state.userSelectindex] }}</h5>
  </div>
  <br>
  <form @submit.prevent="submitTodo">
  <v-row>
     <v-col cols="10" sm="5" md="2">
     <v-text-field v-model="todo" type="text" placeholder="Edit"></v-text-field>
     </v-col>
     <v-col cols="10" sm="5" md="2">
     <v-btn type="submit" outlined color="primary" class="addbtn">AddTodo</v-btn>
     </v-col>
     <v-col cols="10" sm="5" md="2">
     <v-btn outlined color="info" class="delbtn" @click="deleteAlldata()">DeleteAll</v-btn>
     </v-col>
   </v-row>
   </form>
   <div>
     <v-card color="primary" v-for="(todo, index) in todos" :key="todo.id" class="taskcard" v-drag @mousemove="moveTodo($event, index)">
        {{ todo.todo }}
        <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-icon color="white" class="deleteicon1" v-bind="attrs" v-on="on" small>mdi-pencil-outline</v-icon>
          </template>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              TaskDetail
            </v-card-title>
            <div>
              <v-text-field type="text" v-model="taskdetail" placeholder="Edit"></v-text-field>
            </div>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submitDetail(index)">
                SUBMIT
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-icon @click="deleteTodo(index)" color="white" class="deleteicon2" small>mdi-delete-outline</v-icon>
      </div>
     </v-card>
   </div>
    <div class="pagewrap">
    </div>
 </div>
</template>

<script>
import draggable from 'vuedraggable'
import drag from '@branu-jp/v-drag'
import firebase from "../plugins/firebase"

export default {
 components: { draggable },
 data () {
   return {
     todo: '',
     dialog: false,
     taskdetail: '',
   }
 },
 computed: {
   todos () {
     return this.$store.getters['todos']
   }
 },
 methods: {
  submitDetail (index) {
      let taskdetail = this.taskdetail
      let recordid = this.todos[index].id
      console.log(index)
      console.log(taskdetail)
      console.log(recordid)
      firebase.firestore().collection('todos').doc(recordid).update({
      taskdetail: taskdetail,
    })
     this.taskdetail = ''
     this.dialog = false
  },
  moveTodo (e, index) {
    // 要素の座標を取得し値を保持
    let urgent = e.screenX - 743
    let important = 588 - e.screenY
    let point = urgent + important
    // タスクのレコードを取得しidを取得
    let recordid = this.todos[index].id
    firebase.firestore().collection('todos').doc(recordid).update({
      important: important,
      urgent: urgent,
      point: point,
    })
  },
  submitTodo () {
     if(this.todo) {
       this.$store.dispatch('submitTodo', this.todo)
       this.todo = ''
     }
   },
  deleteTodo (index) {
    // 指定したindexから1個の要素を取り除く
    this.$store.dispatch('deleteTodo', this.todos[index].id)
    console.log(this.todos[index].id)
  },
  deleteAlldata () {
    // data削除
    firebase.firestore().collection('todos').where("projectname", "==", this.$store.state.userProjects[this.$store.state.userSelectindex]).get()
        .then((res) => {
        const ids = []
        res.forEach(x =>{
          console.log(x.data().id)
          ids.push(x.data().id)
        })
        for (let i=0; i < ids.length; i++) {
          console.log(ids[i])
          firebase.firestore().collection('todos').doc(ids[i]).delete()
          this.$store.dispatch('deleteTodo', ids[i])
      }
    })
  },
 },
}
</script>

<style scoped>
html {
  font-size: 15px;
  color: white;
}
.pagewrap {
  /* margin-left: 100px; */
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
  height: 70vh;
  background-image: url(../assets/matrix.png);
  background-size: contain;
}
.taskcard {
  color: white !important;
  font-size: 10px;
  text-align: center;
  position: absolute;
  width: 150px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  z-index: 99999;
  border-radius: 2px;
  border: 1px solid #f0f0f0;
  cursor: grabbing;
  top: 150px;
}
.addbtn {
    margin-top: 10px;
    margin-left: 15px;
}
.delbtn {
    margin-top: 10px;
}

</style>