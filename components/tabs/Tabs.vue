<template>
  <div role="tablist" class="tabs tabs-bordered">
    <NuxtLink v-for="{ name, link } in tabs" :to="link" role="tab" class="tab" :class="{ 'tab-active': link === path }">
      {{ name }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">

const { path } = useRoute()

defineProps({
  tabs: Array
})
</script>
