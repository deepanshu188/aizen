<script setup lang="ts">
const model = defineModel();
interface Props {
  label?: string;
  options?: { name: string; value: string }[];
}

defineProps<Props>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">{{ label }}</legend>
    <select class="select select-bordered w-full md:max-w-xs" v-model="model">
      <slot>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.name }}
        </option>
      </slot>
    </select>
  </fieldset>
</template>
