<template>
  <div>
    <NuxtImg v-if='url' :src='url' :alt='name || alt' class="w-8 h-8 rounded-full" />
    <div class="avatar placeholder" v-else>
      <div class="bg-neutral text-neutral-content rounded-full w-8">
        <span class="text-xs">{{ capitalFirst(name) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  url: String,
  alt: String
})
</script>
