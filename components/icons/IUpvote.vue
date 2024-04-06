<script setup lang="ts">
  defineProps({
    my_vote: Number,
    iconClass: String,
  });
</script>

<template>
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    :class="[iconClass, my_vote === 1 ? 'stroke-accent' : 'stroke-secondary']"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
    />
  </svg>
</template>
