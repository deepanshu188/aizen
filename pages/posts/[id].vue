<template>
  <div class="flex justify-center">
    <Loader v-if="status === 'pending'" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    <PostViewCard v-else :data="post?.post_view" />
  </div>
</template>

<script setup>
import { fetchPost } from "~/services/posts.services";

const { params } = useRoute();
const { data: post, status } = await useLazyAsyncData(() => fetchPost({ id: params.id }), {
  pick: ["post_view"],
});
</script>
