<script setup>
const props = defineProps(['user']);

const user = props.user ?? useUserStore();
</script>

<template>
  <section>
    <NormalPostCard :data="user.data.posts" />
  </section>
</template>
