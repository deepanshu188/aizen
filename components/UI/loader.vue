<template>
  <div class="flex justify-center" v-if='loading'>
    <span class="loading loading-ring loading-lg"></span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  loading: Boolean
});
</script>
