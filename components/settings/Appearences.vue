<script setup lang="ts">
export interface iSettings {
  theme?: string;
  nsfw?: boolean;
}
const settings = useCookie<iSettings>('settings');
</script>

<template>
  <div class="mt-4 flex flex-col gap-8">
    <div>
      <div class="label">
        <span class="label-text">Theme</span>
      </div>
      <select class="select select-bordered w-full md:max-w-xs" v-model="settings.theme">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
    <div class="flex items-center justify-between">
      <label class="label-text">NSFW Post</label>
      <input type="checkbox" class="toggle" v-model="settings.nsfw" />
    </div>
  </div>
</template>
