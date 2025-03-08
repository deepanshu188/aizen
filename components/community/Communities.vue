<script setup lang="ts">
const data = useUserStore();
const subscriptions = computed(() => data?.user?.my_user?.follows);
</script>

<template>
  <section class="m-2 p-2">
    <h1 class="text-2xl mb-4">{{ subscriptions.length }} Communities</h1>
    <ul v-if="subscriptions">
      <li v-for="c in subscriptions" :key="c.id" class="card h-12">
        <div
          class="flex gap-2 items-center cursor-pointer"
          @click="navigateTo(`c/${c.community.name}?id=${c.community.id}`)"
        >
          <Avatar :name="c.community.title" :image="c.community.icon" />
          <p>{{ c.community.title }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>
