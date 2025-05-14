<script setup lang="ts">
import { COOKIE_MAX_AGE } from "~/constants";
import type { iSettings } from "./settings.types";

const settings = useCookie<iSettings>('settings', {
  maxAge: COOKIE_MAX_AGE,
});

const themeOptions = [
  { name: 'System', value: 'system' },
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
];
</script>

<template>
  <div class="mt-4 flex flex-col gap-8">
    <Select label="Theme" :options="themeOptions" v-model="settings.theme" />
  </div>
</template>
