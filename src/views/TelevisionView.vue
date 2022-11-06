<script setup lang="ts">
import type { IShow } from "../types";
import { ref, onMounted } from "vue";
import { computed } from "vue";

import AbnLoading from "@/components/AbnLoading.vue";
import AbnCarousel from "@/components/AbnCarousel.vue";

const NOT_AVAILABLE = "N/A";

const isLoading = ref(false);
const searchQuery = ref("");
const showsList = ref([] as Array<IShow>);

const filteredShows = computed(() =>
  showsList.value.filter(
    (show) =>
      show.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
  )
);
const groupedShows = computed(() => {
  const groupedShowList: Record<string, Array<IShow>> = {};

  filteredShows.value.forEach((show) => {
    // TODO: The grouping can be improved to be more robust
    const genres = show.genres.length ? show.genres : [NOT_AVAILABLE];

    genres.forEach((genre) => {
      if (groupedShowList[genre] === undefined) {
        groupedShowList[genre] = [];
      }
      groupedShowList[genre].push(show);
    });
  });

  return groupedShowList;
});
const sortedGroupedShows = computed(() => {
  const genres = Object.keys(groupedShows.value);
  const sortedGroupedShowList: Record<string, Array<IShow>> = {};

  genres.forEach((genre) => {
    const showsList = groupedShows.value[genre];
    showsList.sort(sortByRatingDesc);
    sortedGroupedShowList[genre] = showsList;
  });

  return sortedGroupedShowList;
});

function sortByRatingDesc(show1: IShow, show2: IShow) {
  return -1 * (show1.rating.average - show2.rating.average);
}

function getTvShows() {
  isLoading.value = true;

  // TODO: Move into services/
  fetch("https://api.tvmaze.com/shows?page=0")
    .then((response) => response.json())
    .then((data) => {
      showsList.value = data;
      isLoading.value = false;
    });
}

onMounted(() => {
  getTvShows();
});
</script>

<template>
  <abn-loading :show="isLoading" />

  <div class="tv-shows-header">
    <div class="flex-grow-1 text-h4 tv-shows-header-title" alt="TV shows">
      TV Shows
    </div>
    <v-text-field
      placeholder="Search by show name"
      append-inner-icon="mdi-magnify"
      variant="underlined"
      v-model="searchQuery"
      alt="Search by show name"
      data-testid="tv-shows-search"
      class="tv-shows-header-search"
    />
  </div>

  <div
    v-for="genre in Object.keys(sortedGroupedShows)"
    :key="genre"
    class="television-shows"
    :data-testid="`tv-shows-${genre}`"
  >
    <div
      class="text-h6 genre-title"
      :data-testid="`tv-shows-${genre}-title`"
      :alt="genre"
    >
      {{ genre }}
    </div>
    <abn-carousel
      :shows-list="sortedGroupedShows[genre]"
      :data-testId="`tv-shows-${genre}-carousel`"
    />
  </div>

  <!-- TODO: No data template -->
</template>

<style>
.television-shows {
  padding-top: 8px;
}

.genre-title {
  padding: 16px 0;
}

.tv-shows-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "title search";
  grid-template-rows: 1;

  position: sticky;
  top: 64px;
  z-index: 1;
  background-color: var(--vt-c-white);
}

.tv-shows-header-title {
  grid-area: title;
}

.tv-shows-header-search {
  grid-area: search;
}

@media (max-width: 960px) {
  .tv-shows-header {
    grid-template-columns: 1fr;
    grid-template-rows: 2;
    grid-template-areas:
      "title"
      "search";
  }
}
</style>
