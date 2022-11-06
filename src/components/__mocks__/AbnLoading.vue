<script setup lang="ts">
defineProps<{
  show?: boolean;
}>();
</script>

<template>
  <div v-if="show" data-testid="mock-abn-loading">Mock ABN Loading ...</div>
</template>
