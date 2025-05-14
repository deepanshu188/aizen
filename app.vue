<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { selectedTheme } = useSettings();

useHead({
  htmlAttrs: {
    "data-theme": selectedTheme,
  },
  title: "Aizen",
  link: [
    {
      rel: "manifest",
      href: "/manifest.webmanifest",
    },
  ],
});
</script>
