<template>
  <NuxtLayout name="settings" :breadcrumbData="breadcrumbData">
    <SettingsView />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: "Aizen - Settings",
});

const breadcrumbData = [
  { name: "Home", link: "/" },
  { name: "Settings", link: "" },
];
</script>
