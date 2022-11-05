<script setup lang="ts">
import type { IShow } from '../types'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { computed } from '@vue/reactivity';

import AbnLoading from '@/components/AbnLoading.vue'
import AbnCarousel from '@/components/AbnCarousel.vue';

const NOT_AVAILABLE = "N/A"

const router = useRouter()

const isLoading = ref(false)
const searchQuery = ref('')
const showsList = ref([] as Array<IShow>)

const filteredShows = computed(() => showsList.value.filter(show => show.name.toLowerCase().indexOf(searchQuery.value) > -1))
const groupedShows = computed(() => {
    const groupedShowList: Record<string, Array<IShow>> = {}

    filteredShows.value.forEach(show => {
        // TODO: The grouping can be improved to be more robust
        const genres = show.genres.length ? show.genres : [NOT_AVAILABLE]

        genres.forEach(genre => {
            if (groupedShowList[genre] === undefined) {
                groupedShowList[genre] = []
            }
            groupedShowList[genre].push(show)
        })
    })

    return groupedShowList
})
const sortedGroupedShows = computed(() => {
    const genres = Object.keys(groupedShows.value)
    const sortedGroupedShowList: Record<string, Array<IShow>> = {}

    genres.forEach(genre => {
        const showsList = groupedShows.value[genre]
        showsList.sort(sortByRatingDesc)
        sortedGroupedShowList[genre] = showsList
    })

    return sortedGroupedShowList
})

function sortByRatingDesc (show1: IShow, show2: IShow)  {
    return -1 * (show1.rating.average - show2.rating.average)
}

function getTvShows() {
    isLoading.value = true

    // TODO: Move into services/
    fetch('https://api.tvmaze.com/shows?page=0')
        .then(response => response.json())
        .then(data => {
            showsList.value = data
            isLoading.value = false
        })
}

onMounted(() => {
    getTvShows()
})
</script>

<template>
    <abn-loading :show="isLoading" />

    <div class="d-flex align-center">
        <div class="flex-grow-1 text-h4"> TV Shows </div>
        <v-text-field placeholder="Search by show name" append-inner-icon="mdi-magnify" variant="underlined"
            v-model="searchQuery"></v-text-field>
    </div>

    <div v-for="genre in Object.keys(sortedGroupedShows)" :key="genre" class="television-shows">
        <div class="text-h6 genre-title">{{genre}}</div>
        <abn-carousel :filtered-shows="sortedGroupedShows[genre]" />
    </div>

</template>

<style>
.television-shows {
    padding-top: 8px;
}
.genre-title {
    padding: 16px 0; 
}
</style>

