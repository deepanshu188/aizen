<template>
  <NuxtLayout name='user-header'>
    <UserPosts :user='otherUser' />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useOtherUserStore } from '@/stores/otherUser';
const otherUser: any = useOtherUserStore()
</script>
