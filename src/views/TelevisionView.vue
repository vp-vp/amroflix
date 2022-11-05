<script setup lang="ts">
import type {IShow} from '../types'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import AbnLoading from '@/components/AbnLoading.vue'

const showsList = ref([] as Array<IShow>)
const isLoading = ref(false)
const router = useRouter()

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
    <abn-loading :show="isLoading"/>

    <div class="show-container" >
        <v-card 
            class="mx-auto" 
            width="125" 
            @click="router.push({ name: 'show', params: { id: show.id } })"
            v-for="show in showsList" 
            :key="show.id"
        >
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