<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import AbnLoading from '@/components/AbnLoading.vue';

import type { IShow } from '@/types'

const isLoading = ref(false)
const show = ref({} as IShow)

function getShowDetails() {
    const route = useRoute();
    const showId = route.params.id

    isLoading.value = true

    fetch(`https://api.tvmaze.com/shows/${showId}`)
        .then(response => response.json())
        .then(data => {
            show.value = data
            show.value.rating.average = Math.round(show.value.rating.average / 2)
            isLoading.value = false
        })
}
onMounted(() => {
    getShowDetails()
})
</script>

<template>
    <abn-loading :show="isLoading" />
    <v-card class="mx-auto flex" max-width="100%" v-if="show.id !== undefined">
        <div class="flex flex-2 show-details" >
            <v-card-title>{{ show.name }}</v-card-title>
            <v-rating hover length="5" half-increments readonly v-model="show.rating.average"></v-rating>
            <v-card-subtitle>
                Language: {{ show.language }}
            </v-card-subtitle>
            <v-card-subtitle>
                Genre: {{ show.genres.join(', ') }}
            </v-card-subtitle>
            <v-card-text v-html="show.summary" class="flex-1"/>
            <v-spacer />
            <v-card-actions>
                <v-btn color="orange" append-icon="mdi-open-in-new" :href="show.officialSite" target="_blank">
                    More
                </v-btn>
            </v-card-actions>
        </div>
        <v-img class="align-end text-white flex-1" width="35%" :src="show.image.original" />
    </v-card>
</template>

<style>
.flex {
    display: flex;
}
.flex-1 {
    flex: 1;
}
.flex-2 {
    flex: 2;
}
.show-details {
    flex-direction: column;
}
.show-cast {
    height: 100px;
}
.show-similar-shows {
    padding-top: 32px;
    height: 100px;
}
</style>