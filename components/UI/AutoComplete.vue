<template>
  <label class="input">
    <span class="label">https://</span>
    <input
      type="text"
      v-model="model"
      :list="id"
      class="w-full"
      placeholder="Instance URL"
    />
  </label>
  <datalist :id="id">
    <option v-for="item in data" :key="item?.id" :value="item?.text"></option>
  </datalist>
</template>

<script setup lang="ts">
type Props = {
  data: { id: number; text: string }[] | null;
  id: string;
};

defineProps<Props>();
const model = defineModel();
</script>
