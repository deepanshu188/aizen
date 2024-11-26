<template>
  <div class="btm-nav sm:hidden">
    <span
      v-for="item in navData"
      :key="item.name"
      @click="navigateTo(item.link)"
    >
      <Icon
        :name="item.icon"
        :class="{ 'text-blue-500': $route.path === item.link }"
      />
      <span class="btm-nav-label">{{ item.name }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
const navData = [
  {
    name: "Home",
    icon: "ci:house-01",
    link: "/",
  },
  {
    name: "Explore",
    icon: "mynaui:navigation-one",
    link: "/explore",
  },
  {
    name: "Communities",
    icon: "mynaui:at",
    link: "/communities",
  },
  {
    name: "Settings",
    icon: "mynaui:fine-tune",
    link: "/settings",
  },
];
</script>
