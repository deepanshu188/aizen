<script setup lang="ts">
import { useOnline } from "@vueuse/core";
const isOnline = useOnline();
const { data } = useLoginUser();
const subscriptions = computed(
  () => data.value?.instance_data?.my_user?.follows,
);

const handleNavigation = (c: any) => {
  if (!isOnline.value) return;
  navigateTo(`c/${c.community.name}?id=${c.community.id}`);
};
</script>

<template>
  <section class="m-2 p-2">
    <h1 class="text-2xl mb-4">{{ subscriptions?.length }} Communities</h1>
    <ul v-if="subscriptions">
      <li v-for="c in subscriptions" :key="c.id" class="card h-12">
        <div
          class="flex gap-2 items-center cursor-pointer"
          @click="() => handleNavigation(c)"
        >
          <Avatar :name="c.community.title" :image="c.community.icon" />
          <p class="truncate">{{ c.community.title }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>
