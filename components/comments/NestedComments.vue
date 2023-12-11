<script setup lang="ts">
  const { data } = defineProps(['data']);
</script>

<template>
  <ul
    class="pl-1"
    :class="{ 'border-l border-l-neutral-600': data?.length > 1 }"
  >
    <li
      v-for="(c, index) in data"
      class="bg-base-200 shadow-lg my-4 p-3 border-l"
      :key="index"
      :class="{
        'ml-2': index % 2 !== 0,
        'border-l-red-500': index % 2 === 0,
        'border-l-orange-500': index % 2 !== 0,
      }"
    >
      <CommentCard :c="c" />
    </li>
  </ul>
</template>
