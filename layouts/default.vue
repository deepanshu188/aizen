<template>
  <section>
    <Nav />
    <slot />
  </section>
</template>


<script setup lang="ts">
const settings = useCookie('settings')
const theme = computed(() => settings.value.theme)

useHead({
  htmlAttrs: {
    'data-theme': theme,
  }
})
</script>
