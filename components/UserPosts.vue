<template>
  <section>
    <NormalPostCard :data='user.data.posts' />
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
const user = useUserStore()
</script>
