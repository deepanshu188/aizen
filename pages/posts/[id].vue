<template>
  <div class="flex justify-center">
    <Loader
      v-if="status === 'pending'"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
    <PostViewCard v-else :data="post?.post_view" />
  </div>
</template>

<script setup>
import { fetchPost } from "~/services/posts.services";
const nuxtApp = useNuxtApp();

const { params } = useRoute();
const { id } = params;
const { data: post, status } = await useLazyAsyncData(
  `post_details_${id}`,
  () => fetchPost({ id }),
  {
    pick: ["post_view"],
    getCachedData: (key) => nuxtApp.payload.data[key],
  },
);
</script>
