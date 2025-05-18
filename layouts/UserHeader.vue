<template>
  <UserLayoutUI :user-data="userData" :tabs="tabs">
    <slot />
  </UserLayoutUI>
</template>

<script setup lang="ts">
const { params } = useRoute();
const person_id = params.slug;

const { data } = useNuxtData(`id-${person_id}`)
const userData = computed(() => data.value?.person_view);

const tabs = [
  { name: 'Posts', link: `/user/${person_id}` },
  { name: 'Comments', link: `/user/${person_id}/comments` },
];
</script>
