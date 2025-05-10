<template>
  <Loader v-if="user.isLoading" class="absolute top-0 left-0 right-0 bottom-0" />
  <NuxtLayout name="profile-header">
    <UserPosts />
  </NuxtLayout>
</template>

<script setup lang="ts">
const user = useUserStore();
user.fetchUserDetails();

useHead({
  title: "Aizen - Profile Posts",
});
</script>
