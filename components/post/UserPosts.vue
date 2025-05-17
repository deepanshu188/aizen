<script setup>
defineProps(['posts']);
</script>

<template>
  <section>
    <NormalPostCard :data="posts ?? useUserStore()?.data?.posts" />
  </section>
</template>
