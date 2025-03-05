<template>
  <div
    class="flex items-center my-2 cursor-pointer"
    @click="handleViewPost(post.id)"
  >
    <div
      v-if="post.thumbnail_url && !thumbnailError"
      class="md:h-28 h-24 aspect-square"
      :class="{ 'blur-lg': post.nsfw && !settings.nsfw }"
    >
      <NuxtImg
        :src="post.thumbnail_url"
        format="webp"
        class="w-full h-full rounded-md object-cover"
        loading="lazy"
        placeholder
      />
    </div>
    <div :class="{ 'card-body': !thumbnailError }">
      <p class="md:text-xl text-sm leading-6">{{ post.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { iSettings } from "../settings/Appearences.vue";
import { useImage } from "@vueuse/core";

const settings = useCookie<iSettings>("settings");

type Props = {
  post: Post;
};

const { post } = defineProps<Props>();

const { error: thumbnailError } = useImage({ src: post.thumbnail_url });

const handleViewPost = (id: number) => {
  navigateTo(`/posts/${id}`);
};
</script>
