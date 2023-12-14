<script setup lang="ts">
  defineProps({
    text: String,
  });
</script>

<template>
  <div :class="{ tooltip: text }" :data-tip="text">
    <slot />
  </div>
</template>
