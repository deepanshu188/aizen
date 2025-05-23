<template>
  <UserLayoutUI :user-data="userData" :tabs="tabs">
    <slot />
  </UserLayoutUI>
</template>

<script setup lang="ts">
const { data } = useLoginUser();
const userData = computed(() => data.value?.user_data?.person_view);

const tabs = [
  { name: "Posts", link: "/profile" },
  { name: "Comments", link: "/profile/comments" },
  { name: "Saved", link: "/profile/saved" },
];
</script>
