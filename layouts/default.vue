<template>
  <NuxtPwaManifest />
  <section>
    <Nav />
    <NuxtLoadingIndicator />
    <slot />
  </section>
</template>

<script setup lang="ts">
  const settings = useCookie('settings');
  const isDarkSystem = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
    ? 'dark'
    : 'light';
  const theme = computed(() => settings.value?.theme);

  settings.value = { theme: theme.value ?? 'system' };
  const selectedTheme = computed(() =>
    theme.value === 'system' ? isDarkSystem : theme.value
  );

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
