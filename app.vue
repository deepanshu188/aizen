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
  link: [
    {
      rel: "manifest",
      href: "/manifest.webmanifest",
    },
  ],
});
</script>
