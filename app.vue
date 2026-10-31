<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { selectedTheme } = useSettings();
const { fetchUserData } = useLoginUser();
const userData = useCookie("userData");

if (userData.value) {
  fetchUserData();
}

useHead({
  htmlAttrs: {
    "data-theme": selectedTheme,
  },
  title: "Aizen",
  meta: [{ name: "theme-color", content: "#000000" }],
  link: [
    {
      rel: "manifest",
      href: "/manifest.webmanifest",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/icons/apple-touch-icon.png",
    },
  ],
});
</script>
