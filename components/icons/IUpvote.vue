<template>
  <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="my_vote === 1 ? '#0BDA51' : '#fff'" :class="iconClass">
    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  my_vote: Number,
  iconClass: String
})
</script>
