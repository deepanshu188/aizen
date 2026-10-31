<script setup>
import { useImage } from "@vueuse/core";

const { image, size } = defineProps({
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

const sizeStyle = computed(() => ({
  width: `${size * 0.25}rem`,
  height: `${size * 0.25}rem`,
}));

const initialStyle = computed(() => ({
  fontSize: `${Math.max(size * 0.1, 0.875)}rem`,
  lineHeight: 1,
}));
</script>

<template>
  <Skeleton v-if="loading" class="rounded-full shrink-0" :style="sizeStyle" />
  <div v-else>
    <NuxtImg v-if="image && !error" :src="image" :alt="alt" class="rounded-full aspect-square object-cover"
      :style="sizeStyle" loading="lazy" placeholder />
    <div class="avatar avatar-placeholder" v-else>
      <div class="flex items-center justify-center rounded-full bg-neutral text-neutral-content" :style="sizeStyle">
        <span :style="initialStyle">{{ capitalFirst(name) }}</span>
      </div>
    </div>
  </div>
</template>
