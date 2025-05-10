<script setup lang="ts">
export interface iSettings {
  theme?: string;
  nsfw?: boolean;
}
const settings = useCookie<iSettings>('settings');

const themeOptions = [
  { name: 'System', value: 'system' },
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
];
</script>

<template>
  <div class="mt-4 flex flex-col gap-8">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Theme</legend>
      <select class="select select-bordered w-full md:max-w-xs" v-model="settings.theme">
        <option v-for="option in themeOptions" :key="option.value" :value="option.value">
          {{ option.name }}
        </option>
      </select>
    </fieldset>
    <div class="flex items-center justify-between">
      <label class="label-text">NSFW Post</label>
      <input type="checkbox" class="toggle" v-model="settings.nsfw" />
    </div>
  </div>
</template>
