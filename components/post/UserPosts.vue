<script setup lang="ts">
interface Props {
  posts?: Record<string, any>[] | undefined;
  status: 'pending' | 'success' | 'error';
}
defineProps<Props>();
</script>

<template>
  <section>
    <NormalPostCard :data="posts ?? useUserStore()?.data?.posts" :status="status" />
  </section>
</template>
