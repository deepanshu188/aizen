<template>
  <NuxtLayout name="user-header">
    <LazyUserComments :comments="comments" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const otherUser: any = useOtherUserStore();
const comments = computed(() => otherUser.data.comments);

useHead({
  title: "Aizen - User Comments",
});
</script>
