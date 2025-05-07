<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: "Aizen",
  link: [
    {
      rel: "manifest",
      href: "/manifest.webmanifest",
    },
  ],
});
</script>
