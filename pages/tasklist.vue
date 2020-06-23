<template>
  <!-- リスト -->
  <div>
    <v-btn type="submit" text color="primary" class="addbtn" @click="ShowTaskList()">ShowTaskList</v-btn>
    <ul>
      <li v-for="item in datalist">
        <v-card class="mx-auto" tile>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{item.todo}}</v-list-item-title>
              <v-list-item-title>Point: {{item.urgent}} Urgent: {{item.urgent}} Important: {{item.important}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title>{{item.taskdetail}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </li>
    </ul>
  </div>
</template>
<script>
import firebase from "../plugins/firebase"
export default {
  data () {
    return {
      datalist: []  // 最新状態はここにコピーされる
    }
  },
  methods: {
    // データベースの変更を購読、最新状態をlistにコピーする
    ShowTaskList () {
    // data削除
        firebase.firestore().collection('todos').orderBy("point", "desc").get()
            .then((res) => {
            const data = []
            res.forEach(x =>{
                data.push(x.data())
            })
            console.log(data)
            this.datalist = data
        })
      }
    }
  }
</script>

<style scoped>
 ul {
   list-style: none;
 }
</style>>