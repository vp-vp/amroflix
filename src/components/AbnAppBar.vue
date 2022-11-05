<template>
    <!-- TODO: Collapse into app drawer when width is less than x -->
    <v-app-bar app>
      <v-app-bar-title> AMROFLIX </v-app-bar-title>

      <v-spacer />

      <v-btn prepend-icon="mdi-home" :variant="$route.name === 'home' ? 'outlined': 'plain'" to="/home">
        Home
      </v-btn>

      <v-btn prepend-icon="mdi-television-classic" :variant="$route.name === 'tv' ? 'outlined': 'plain'" to="/tv">
        TV
      </v-btn>

      <!-- TODO: show tooltip when button is disabled  -->
      <v-btn prepend-icon="mdi-movie" :variant="$route.name === 'movies' ? 'outlined': 'plain'" to="/movies">
        Movies 
        <v-tooltip
          activator="parent"
          location="bottom"
        >
          Coming soon
        </v-tooltip>
      </v-btn>

      <v-spacer />

      <!-- TODO: show tooltip when button is disabled  -->
      <v-btn icon to="/settings">
        <v-icon icon="mdi-account-circle" />
        <v-tooltip
          activator="parent"
          location="bottom"
        >
          Coming soon
        </v-tooltip>
      </v-btn>

    </v-app-bar>
</template>