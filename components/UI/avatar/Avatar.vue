<script setup>
import { useImage } from "@vueuse/core";

const { image } = defineProps({
  name: String,
  image: String,
  alt: String,
  loading: Boolean,
  size: {
    type: Number,
    default: 8,
  },
});

const { error } = useImage({ src: image });
</script>

<template>
  <Skeleton v-if="loading" class="rounded-full shrink-0" :class="`h-${size} w-${size}`" />
  <div v-else>
    <NuxtImg v-if="image && !error" :src="image" :alt="alt" class="rounded-full aspect-square object-cover"
      :class="`h-${size} w-${size}`" loading="lazy" placeholder />
    <div class="avatar avatar-placeholder" v-else>
      <div class="bg-neutral text-neutral-content rounded-full w-8 h-8" :class="`w-${size}`">
        <span :class="{
          'text-3xl': size !== 8,
          'text-md': size === 8,
        }">{{ capitalFirst(name) }}</span>
      </div>
    </div>
  </div>
</template>
