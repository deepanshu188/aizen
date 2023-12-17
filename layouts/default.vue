<template>
  <NuxtPwaManifest />
  <section>
    <Nav />
    <NuxtLoadingIndicator />
    <slot />
  </section>
</template>

<script setup lang="ts">
  const selectedTheme = useTheme();

  useHead({
    htmlAttrs: {
      'data-theme': selectedTheme,
    },
    title: 'Aizen',
    meta: [
      { name: 'description', content: 'A web based lemmy client' },
    ],
  });
</script>
