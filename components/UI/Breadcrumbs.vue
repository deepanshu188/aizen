<script>
export default {
  props: {
    data: Array,
  },
};
</script>

<template>
  <div class="text-md breadcrumbs">
    <ul>
      <li v-for="item in data">
        <NuxtLink :to="item.link" class="!no-underline" :class="{ 'md:hover:text-blue-400': item.link }">
          <component :is="item.icon"></component>
          {{ item.name }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
