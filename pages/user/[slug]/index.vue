<template>
  <NuxtLayout name="user-header">
    <LazyUserPosts :user="otherUser" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const otherUser: any = useOtherUserStore();

useHead({
  title: "Aizen - User Posts",
});
</script>
