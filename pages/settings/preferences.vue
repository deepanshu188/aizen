<template>
  <NuxtLayout name="settings" :breadcrumbData="breadcrumbData">
    <Preferences />
  </NuxtLayout>
</template>

<script setup lang="ts">
const breadcrumbData = [
  { name: "Home", link: "/" },
  { name: "Settings", link: "/settings" },
  { name: "Preferences", link: "" },
];

useHead({
  title: "Aizen - Preferences",
});
</script>
