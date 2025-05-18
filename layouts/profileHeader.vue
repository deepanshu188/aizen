<template>
  <UserLayoutUI :user-data="userData" :tabs="tabs">
    <slot />
  </UserLayoutUI>
</template>

<script setup lang="ts">
import { useOnline } from "@vueuse/core";
const isOnline = useOnline();
const user = useUserStore();

const userData = computed(() => user?.data?.person_view);

const tabs = [
  { name: "Posts", link: "/profile" },
  { name: "Comments", link: "/profile/comments" },
  { name: "Saved", link: "/profile/saved" },
];
</script>
