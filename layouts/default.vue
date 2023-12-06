<template>
  <section>
    <Nav />
    <slot />
  </section>
</template>


<script setup lang="ts">
const settings = useCookie('settings')
const isDarkSystem = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
const theme = computed(() => settings.value?.theme)

settings.value = { theme: theme.value ?? 'system' }
const selectedTheme = theme.value === 'system' ? isDarkSystem : theme.value

useHead({
  htmlAttrs: {
    'data-theme': selectedTheme,
  }
})
</script>
