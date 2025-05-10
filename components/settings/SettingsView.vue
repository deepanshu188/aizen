<script>
export default {
  setup() {
    const category = [
      {
        name: 'Appearances',
        link: '/settings/appearances',
        icon: 'pepicons-pencil:paint-pallet'
      },
      {
        name: 'Preferences',
        link: '',
        icon: 'hugeicons:preference-vertical',
        disabled: true,
      },
    ];

    return { category };
  },
};
</script>

<template>
  <ul>
    <NuxtLink v-for="item in category" :to="item.link">
      <li class="bg-base-200 my-4 p-3 rounded-md flex items-center gap-x-2"
        :class="{ 'cursor-not-allowed opacity-50': item.disabled }">
        <Icon v-if="item.icon" :name="item.icon" />
        {{ item.name }}
      </li>
    </NuxtLink>
  </ul>
</template>
