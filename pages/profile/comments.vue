<template>
  <NuxtLayout name="profile-header">
    <UserComments :comments="comments" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { data } = useLoginUser();
const comments = computed(() => data.value?.user_data?.comments);
useHead({
  title: "Aizen - Profile Comments",
});
</script>
