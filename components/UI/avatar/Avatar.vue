<template>
  <div>
    <div v-if='loading' class="skeleton rounded-full shrink-0" :class="`h-${size} w-${size}`"></div>
    <div v-else>
      <NuxtImg v-if='url' :src='url' :alt='alt' class="rounded-full object-cover aspect-square"
        :class="`h-${size} w-${size}`" />
      <div class="avatar placeholder" v-else>
        <div class="bg-neutral text-neutral-content rounded-full" :class="`w-${size}`">
          <span :class="{ 'text-4xl': size !== 8, 'text-md': size === 8 }">{{ capitalFirst(name) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  url: String,
  alt: String,
  loading: Boolean,
  size: {
    type: Number,
    default: 8
  }
})
</script>
