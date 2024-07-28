<template>
  <section>
    <NuxtLoadingIndicator color="#4B0082" :height="2" />
    <div class="flex">
      <Sidebar />
      <div class="flex-grow">
        <slot />
      </div>
    </div>
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
