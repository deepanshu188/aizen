<script>
  export default {
    setup() {
      const category = [
        {
          name: 'Appearences',
          link: 'settings/appearences',
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
  <section class="p-4 flex justify-center">
    <div class="md:w-4/6 w-full">
      <Breadcrumbs
        :data="[{ name: 'Home', link: '/' }, { name: 'Settings' }]"
      />
      <ul>
        <NuxtLink v-for="item in category" :to="item.link">
          <li class="bg-base-200 shadow-xl my-6 p-4 h-12">
            {{ item.name }}
          </li>
        </NuxtLink>
      </ul>
    </div>
  </section>
</template>
