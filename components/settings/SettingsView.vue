<script>
export default {
  setup() {
    const category = [
      {
        name: 'Appearances',
        link: '/settings/appearances',
      },
      {
        name: 'Preferences',
        link: '',
      },
    ];

    return { category };
  },
};
</script>

<template>
  <ul>
    <NuxtLink v-for="item in category" :to="item.link">
      <li class="bg-base-200 shadow-xl my-6 p-4 h-12">
        {{ item.name }}
      </li>
    </NuxtLink>
  </ul>
</template>
