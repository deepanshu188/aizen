<script setup lang="ts">
import { COOKIE_MAX_AGE } from "~/constants";
import type { iSettings } from "./settings.types";
import sortOptions from "~/content/sortOptions.json";

const settings = useCookie<iSettings>('settings', {
  maxAge: COOKIE_MAX_AGE,
});
</script>

<template>
  <div class="mt-4 flex flex-col gap-8">
    <Select label="Default Sort" v-model="settings.sortOption">
      <option v-for="option in sortOptions" :key="option" :value="option">
        {{ option }}
      </option>
    </Select>

    <div class="flex items-center justify-between">
      <label class="label-text">NSFW Post</label>
      <input type="checkbox" class="toggle" v-model="settings.nsfw" />
    </div>
  </div>
</template>
