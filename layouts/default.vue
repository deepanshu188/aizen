<template>
  <section>
    <Nav />
    <slot />
  </section>
</template>


<script setup lang="ts">
useHead({
  htmlAttrs: {
    'data-theme': 'dracula',
  }
})
</script>
