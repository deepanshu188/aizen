<template>
  <Login />
</template>

<script setup lang="ts">
  const selectedTheme = useTheme();

  definePageMeta({
    layout: false,
  });

  useHead({
    htmlAttrs: {
      'data-theme': selectedTheme,
    },
    title: 'Aizen - Login',
    meta: [
      { name: 'description', content: 'A web based lemmy client' },
    ],
  });
</script>
