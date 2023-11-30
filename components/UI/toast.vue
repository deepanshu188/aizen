<template>
  <div class="toast">
    <div class="alert text-white" :class="{ 'alert-success': type === 'success', 'alert-error': type === 'error' }">
      <span class="flex gap-x-1 items-center">
        <svg v-if="type === 'error'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <slot />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: String,
})
</script>
