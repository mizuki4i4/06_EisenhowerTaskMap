<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      src="../assets/index.jpg"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <img src="../assets/todo.png" width="40" height="40">
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-file-tree',
          title: 'Project',
          to: '/project'
        },
        {
          icon: 'mdi-head-snowflake-outline',
          title: 'Brest',
          to: '/brest'
        },
        {
          icon: 'mdi-clipboard-text-outline',
          title: 'Tasklist',
          to: '/tasklist'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Eisenhower Taskmap'
    }
  }
}
</script>
