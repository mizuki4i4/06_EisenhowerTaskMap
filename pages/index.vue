<template>

 <div class="page">
   <form @submit.prevent="submitTodo">
  <v-row>
     <v-col cols="10" sm="5" md="2">
     <v-text-field v-model="todo" type="text" placeholder="Edit"></v-text-field>
     </v-col>
     <v-col cols="10" sm="5" md="2">
     <v-btn type="submit" text color="primary" class="addbtn">AddTodo</v-btn>
     </v-col>
   </v-row>
   </form>
   <ul>
     <v-card color="primary" v-for="(todo, index) in todos" :key="todo.id" class="taskcard" v-drag>
        {{ todo.todo }}
        <v-icon @click="deleteTodo(index)" color="white" class="deleteicon">mdi-delete-outline</v-icon>
     </v-card>
   </ul>
   <div class="pagewrap">
   </div>
 </div>
</template>

<script>
import draggable from 'vuedraggable'
import drag from '@branu-jp/v-drag'

export default {
 components: { draggable },
 data () {
   return {
     todo: ''
   }
 },
 computed: {
   todos () {
     return this.$store.getters['sample/todos']
   }
 },
 methods: {
   submitTodo () {
     if(this.todo) {
       this.$store.dispatch('sample/submitTodo', this.todo)
       this.todo = ''
     }
   },
  deleteTodo (index) {
    // 指定したindexから1個の要素を取り除く
    this.$store.dispatch('sample/deleteTodo', this.todos[index].id)
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
  margin-left: 100px;
  width: 1100px;
  height: 620px;
  background-image: url(../assets/matrix.png);
  background-size: contain;
}
.taskcard {
  color: white;
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
}

.deleteicon {
  text-align: right;
}
</style>