<template>
  <input type="text" v-model="model" :list="id" class="input input-bordered w-full rounded-md" />
  <datalist :id="id">
    <option v-for="item in data" :key="item?.id" :value="item?.text"></option>
  </datalist>
</template>

<script setup lang="ts">
type Props = {
  data: { id: number; text: string }[];
  id: string;
};

defineProps<Props>();
const model = defineModel();
</script>
