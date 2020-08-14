<template>
  <div class="project_wrapper">
    <h1>Your Projects</h1>
    <br>
    <v-container class="grey lighten-5">
      <v-card
        class="d-flex align-content-start flex-wrap"
        color="grey lighten-5"
        flat
        tile
        min-height="200"
      >
      <v-card
        width="250px"
        height="200px"
        class="pa-1"
        outlined
        tile
      >
        <div class="project-add">
          <p>Add Project</p>
          <v-icon large color="blue darken-2" @click.stop="dialog = true">mdi-plus</v-icon>
            <v-dialog v-model="dialog" max-width="500">
              <v-card>
                <v-card-title class="headline">プロジェクト追加</v-card-title>
                  <v-card-text>
                    プロジェクト名・詳細を記入
                  </v-card-text>
                  <div class="project_input">
                    <v-text-field  v-model="projectname" label="プロジェクト名" required></v-text-field>
                    <v-text-field  v-model="projectdetail" label="プロジェクト詳細" required></v-text-field>
                  </div>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                  >
                    Cancell
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="addProject"
                  >
                    Add Project
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </div>
      </v-card>

      <v-card
        width="250px"
        height="200px"
        v-for="n in projectnum"
        :key="n"
        class="pa-2"
        outlined
        tile
        @click="gobrest"
      >
      <div class="project-add">
        <p>{{ $store.state.userProjects[n-1] }}</p>
        <v-icon>mdi-head-snowflake-outline</v-icon>
        <v-card-text>{{ $store.state.userProjectdetails[n-1] }}</v-card-text>
      </div>
      </v-card>

      </v-card>
    </v-container>
    <div class="project_bottom_text" >
      <p>プロジェクトを選択してBrestしよう</p>
    </div>
  </div>
</template>
<script>
import firebase from "../plugins/firebase"
export default {
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
    addProject: function () {
       console.log('addProject')
       let userUid = this.$store.getters.getUserUid
       let projectname = this.projectname
       let projectdetail = this.projectdetail
       firebase.firestore().collection('projects').doc().set({
        userUid: userUid,
        projectname: projectname,
        projectdetail: projectdetail
      })
      this.$store.dispatch('addProjects')
      this.dialog = false
    },
    gobrest: function () {
       this.$router.push('/brest')
    }
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters.getUserProjectsNum,
      (newValue, oldValue) => {
        this.projectnum = newValue
      }
    )
  },
  computed: {
    projectnum() {
      return this.$store.state.userProjectsNum
    }
  }
}
</script>

<style scoped>
.project_wrapper {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}
.pa-1 {
  margin-left: 30px;
  /* margin-right: auto; */
  margin-top: 10px;
  border-radius: 10px !important;
  vertical-align: middle;
  color: blue;
}
.pa-2 {
  margin-left: 30px;
  /* margin-right: auto; */
  margin-top: 10px;
  border-radius: 10px !important;

}
.pa-2:active {
  animation: flash 3s;
  margin-left: 30px;
  /* margin-right: auto; */
  margin-top: 10px;
  border-radius: 10px !important;
}
@keyframes flash {
	0% { background: #20b2aa; }
	10% { background: #96e9e6; }
	100% { background: #20b2aa; }
}
.grey.lighten-5 {
  text-align: center;
}
.project-add {
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 45px;
}
.project_input {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 400px;
}
.project_bottom_text {
  margin-top: 50px;
  text-align: center;
}
.grey lighten-5 {
  margin-top: 50px !important;
}

.v-card__subtitle, .v-card__text, .v-card__title {
    font-size: 0.675rem;
    padding: 10px;
}
</style>