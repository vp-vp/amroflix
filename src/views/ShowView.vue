<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import type { IShow } from "@/types";

import AbnLoading from "@/components/AbnLoading.vue";

const NOT_AVAILABLE = "N/A"; // TODO: extract into constants

const isLoading = ref(false);
const show = ref({} as IShow);

function getShowDetails() {
  const route = useRoute();
  const showId = route.params.id;

  isLoading.value = true;

  // TODO: Move into services/
  fetch(`https://api.tvmaze.com/shows/${showId}`)
    .then((response) => response.json())
    .then((data) => {
      show.value = data || {};

      if (Object.keys(show.value).length > 0) {
        show.value.rating.average = Math.round(show.value.rating.average / 2);
      }

      isLoading.value = false;
    })
    .catch(err => {
      // TODO: error handling
    });
}
onMounted(() => {
  getShowDetails();
});
</script>

<template>
  <abn-loading :show="isLoading" />

  <v-card class="tv-show-card" max-width="100%" v-if="!isLoading && show.id !== undefined"
    :data-testid="`tv-show-${show.id}`">
    <!-- Img -->
    <v-img cover class="tv-show-image" :src="show.image.original" :data-testid="`tv-show-${show.id}-img`"
      :alt="show.image.original">
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <span :data-testid="`tv-show-${show.id}-img-placeholder`" :alt="show.name">{{ show.name }}</span>
        </div>
      </template>
    </v-img>

    <div class="tv-show-details">
      <!-- Title -->
      <v-card-title :data-testid="`tv-show-${show.id}-name`" :alt="show.name || NOT_AVAILABLE">{{ show.name ||
          NOT_AVAILABLE
      }}</v-card-title>

      <!-- Rating -->
      <v-rating hover length="5" half-increments readonly v-model="show.rating.average"
        :data-testid="`tv-show-${show.id}-rating`" :alt="show.rating.average || NOT_AVAILABLE"></v-rating>

      <!-- Language -->
      <v-card-subtitle :data-testid="`tv-show-${show.id}-language`" :alt="show.language || NOT_AVAILABLE">
        Language: {{ show.language || NOT_AVAILABLE }}
      </v-card-subtitle>

      <!-- Genre -->
      <v-card-subtitle :data-testid="`tv-show-${show.id}-genre`"
        :alt="show.genres.length ? show.genres.join(', ') : NOT_AVAILABLE">
        Genre: {{ show.genres.length ? show.genres.join(", ") : NOT_AVAILABLE }}
      </v-card-subtitle>

      <!-- Summary -->
      <v-card-text class="flex-grow-1" :data-testid="`tv-show-${show.id}-summary`" :alt="show.summary || NOT_AVAILABLE">
        <div v-html="show.summary || NOT_AVAILABLE" />
      </v-card-text>

      <!-- Actions -->
      <v-card-actions>
        <v-btn color="var(--vt-c-indigo)" :disabled="!show.officialSite" append-icon="mdi-open-in-new"
          :href="show.officialSite" target="_blank" :data-testid="`tv-show-${show.id}-action`"
          :alt="show.officialSite || NOT_AVAILABLE">
          More
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>

  <!-- TODO: No data template -->
</template>

<style>
.tv-show-card {
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-template-rows: auto;
  grid-template-areas: "image details";
}

.tv-show-details {
  grid-area: details;
  display: flex;
  flex-direction: column;
}

.tv-show-image {
  grid-area: image;
}

.tv-show-cast {
  height: 100px;
}

.tv-show-similar-shows {
  padding-top: 32px;
  height: 100px;
}

/* Small devices (phones, 960px and down) */
@media (max-width: 960px) {
  .tv-show-card {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 300px auto;
    grid-template-areas:
      "image"
      "details";
  }
}
</style>
