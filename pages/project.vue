<template>
  <div class="project_wrapper">
    <h2>Your Projects</h2>
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
          <v-icon large color="blue darken-2">mdi-plus</v-icon>
        </div>
      </v-card>

      <v-card
        width="250px"
        height="200px"
        v-for="n in 10"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
          Flex item
      </v-card>

      </v-card>
    </v-container>
  </div>
</template>

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
.grey.lighten-5 {
  text-align: center;
}
.project-add {
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
}
</style>