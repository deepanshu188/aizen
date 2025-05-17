<template>
  <div class="flex justify-center">
    <PostViewCard :data="post.post_view" />
  </div>
</template>

<script setup>
import { fetchPost } from "../../services/posts.services";

const { params } = useRoute();
const { data: post } = await useAsyncData(() => fetchPost({ id: params.id }), {
  pick: ["post_view"],
});
</script>
