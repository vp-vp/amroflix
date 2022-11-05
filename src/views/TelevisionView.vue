<script setup lang="ts">
import type { IShow } from '../types'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import AbnLoading from '@/components/AbnLoading.vue'
import { computed } from '@vue/reactivity';

const router = useRouter()

const isLoading = ref(false)
const searchQuery = ref('')
const showsList = ref([] as Array<IShow>)

const filteredShows = computed(() => showsList.value.filter(show => show.name.toLowerCase().indexOf(searchQuery.value) > -1))

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

    <div class="d-flex">
        <h1 class="flex-grow-1"> TV Shows </h1>
        <v-text-field placeholder="Search by show name" append-inner-icon="mdi-magnify" variant="underlined" v-model="searchQuery"></v-text-field>
    </div>

    <div class="show-container">
        <v-card class="mx-auto" width="125" @click="router.push({ name: 'show', params: { id: show.id } })"
            v-for="show in filteredShows" :key="show.id">
            <v-img class="align-end text-white" :src="show.image.medium" />
        </v-card>
    </div>

</template>

<style>
.show-container {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(auto-fit, minmax(125px, 1fr))
}
</style>