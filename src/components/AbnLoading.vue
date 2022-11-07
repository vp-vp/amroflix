<script setup lang="ts">
defineProps<{
  show?: boolean;
}>();
</script>

<template>
  <v-overlay :model-value="show" class="align-center justify-center">
    <v-progress-circular indeterminate color="white" alt="loading..." data-testid="progress-circular" />
  </v-overlay>
</template>
