<template>
  <NuxtLayout name="profile-header">
    <LazyUserPosts :status="user.status" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const user = useUserStore();
useHead({
  title: "Aizen - Profile Posts",
});
</script>
