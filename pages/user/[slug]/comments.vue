<template>
  <NuxtLayout name="user-header">
    <UserComments :comments="comments" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useOtherUserStore } from "@/stores/otherUser";
const otherUser: any = useOtherUserStore();
const comments = computed(() => otherUser.data.comments);

useHead({
  title: "Aizen - User Comments",
});
</script>
