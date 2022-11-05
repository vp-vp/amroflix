<script setup lang="ts">
defineProps<{
  show?: boolean
}>()
</script>
<template>
    <v-overlay :model-value="true" class="align-center justify-center" v-if="show">
        <v-progress-circular indeterminate color="white" />
    </v-overlay>
</template>