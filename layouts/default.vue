<template>
  <section>
    <Nav />
    <slot />
  </section>
</template>


<script setup>
useHead({
  htmlAttrs: {
    'data-theme': 'dracula',
  }
})
</script>
