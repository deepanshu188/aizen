<script setup lang="ts">
interface Props {
  posts?: Record<string, any>[] | undefined;
  status: "pending" | "success" | "error" | "idle";
}
defineProps<Props>();
</script>

<template>
  <section>
    <NormalPostCard :data="posts" :status="status" />
  </section>
</template>
