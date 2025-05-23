<template>
  <NuxtLayout name="profile-header">
    <LazyUserPosts :status="status" :posts="data?.user_data?.posts" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { data, status } = useLoginUser();
useHead({
  title: "Aizen - Profile Posts",
});
</script>
