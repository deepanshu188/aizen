<template>
  <section v-if="userData">
    <UserCard :user="userData" />
    <template v-if="isOnline">
      <Tabs :tabs="tabs" />
      <slot />
    </template>
    <Offline v-else />
  </section>
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
