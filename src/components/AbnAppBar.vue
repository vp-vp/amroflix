<script setup lang="ts">
import router from "@/router";
import type { RouteLocationRaw } from "vue-router";

function navigate(path: RouteLocationRaw) {
  router.push(path);
}
</script>

<template>
  <!-- TODO: Collapse into app drawer when width is less than x -->
  <v-app-bar app>
    <v-app-bar-title @click="navigate('/')" class="nav-title" data-testid="app-bar-nav-title" alt="amroflix">
      AMROFLIX
    </v-app-bar-title>

    <v-spacer />

    <v-btn prepend-icon="mdi-home" :variant="$route.name === 'home' ? 'outlined' : 'text'" to="/home"
      data-testid="app-bar-nav-home" alt="Home">
      Home
    </v-btn>

    <v-btn prepend-icon="mdi-television-classic" :variant="$route.name === 'tv' ? 'outlined' : 'text'" to="/tv"
      data-testid="app-bar-nav-tv" alt="TV">
      TV
    </v-btn>

    <!-- TODO: show tooltip when button is disabled  -->
    <v-btn prepend-icon="mdi-movie" :variant="$route.name === 'movies' ? 'outlined' : 'text'" to="/movies"
      data-testid="app-bar-nav-movies" alt="Movies">
      Movies
      <v-tooltip activator="parent" location="bottom"> Coming soon </v-tooltip>
    </v-btn>

    <v-spacer />

    <!-- TODO: show tooltip when button is disabled  -->
    <v-btn icon to="/settings" alt="settings">
      <v-icon icon="mdi-account-circle" />
      <v-tooltip activator="parent" location="bottom"> Coming soon </v-tooltip>
    </v-btn>
  </v-app-bar>
</template>

<style>
.nav-title {
  cursor: pointer;
}
</style>
