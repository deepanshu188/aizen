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
    :stroke="my_vote === -1 ? '#ff0000' : '#fff'"
    :class="iconClass"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
    />
  </svg>
</template>
