<template>
  <NuxtLayout name="settings" :breadcrumbData="breadcrumbData">
    <Appearences />
  </NuxtLayout>
</template>

<script setup lang="ts">
const breadcrumbData = [
  { name: "Home", link: "/" },
  { name: "Settings", link: "/settings" },
  { name: "Appearances", link: "" },
];

useHead({
  title: "Aizen - Appearances",
});
</script>
