<script setup>
  import { useUserStore } from '@/stores/user';
  const props = defineProps(['user']);

  const user = props.user ?? useUserStore();
</script>

<template>
  <section>
    <NormalPostCard :data="user.data.posts" />
  </section>
</template>
