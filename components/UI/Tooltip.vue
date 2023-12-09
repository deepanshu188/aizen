<template>
  <div class="tooltip" :data-tip="text">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: String
})
</script>
