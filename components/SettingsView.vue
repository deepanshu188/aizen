<script setup lang="ts">
  const settings = useCookie('settings');
</script>

<template>
  <section class="p-4">
    <div>
      <div class="label">
        <span class="label-text">Theme</span>
      </div>
      <select
        class="select select-bordered w-full max-w-xs"
        v-model="settings.theme"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  </section>
</template>
