<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <!-- <div class="overline mb-4">id: {{ $store.getters.getUserUid }}</div> -->
        <v-list-item-title class="headline mb-1">{{ $store.getters.getUserName }}</v-list-item-title>
        <v-list-item-subtitle>id: {{ $store.getters.getUserUid }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>