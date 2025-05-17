<template>
  <NuxtLayout name="user-header">
    <LazyUserComments :comments="comments" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { params } = useRoute();
const person_id = params.slug;

const { data } = useNuxtData(`id-${person_id}`)
const comments = computed(() => data.value?.comments);

useHead({
  title: "Aizen - User Comments",
});
</script>
