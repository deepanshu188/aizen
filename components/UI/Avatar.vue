<template>
  <div>
    <NuxtImg v-if='url' :src='url' :alt='name || alt' class="rounded-full" :class="`w-${size || 8} h-${size || 8}`" />
    <div class="avatar placeholder" v-else>
      <div class="bg-neutral text-neutral-content rounded-full" :class="`w-${size || 8}`">
        <span :class="{ 'text-4xl': size, 'text-md': !size }">{{ capitalFirst(name) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  url: String,
  alt: String,
  size: Number
})
</script>
