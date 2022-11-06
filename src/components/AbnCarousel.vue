<script setup lang="ts">
import router from "@/router";
import type { IShow } from "@/types";

defineProps<{
  showsList: Array<IShow>;
}>();
</script>

<template>
  <div class="show-container">
    <v-card
      width="125"
      @click="router.push({ name: 'show', params: { id: show.id } })"
      v-for="show in showsList"
      :key="show.id"
      :data-testid="`carousel-card-${show.id}`"
    >
      <v-card-subtitle
        :data-testid="`carousel-card-${show.id}-subtitle`"
        :alt="show.name"
        >{{ show.name }}</v-card-subtitle
      >
      <v-img
        :src="show.image.medium"
        :data-testid="`carousel-card-${show.id}-img`"
        :alt="show.image.medium"
      >
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <span :data-testid="`carousel-card-${show.id}-img-placeholder`">{{
              show.name
            }}</span>
          </div>
        </template>
      </v-img>
    </v-card>
  </div>
</template>

<style>
.show-container {
  min-height: 175px;
  overflow-x: auto;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(125px, 125px));
  grid-auto-flow: column;
  grid-auto-columns: minmax(125px, 1fr);
}
</style>
