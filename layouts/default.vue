<template>
  <section>
    <div class="flex">
      <Sidebar />
      <div class="flex-grow mt-8">
        <Section>
          <slot />
        </Section>
      </div>
    </div>
  </section>
  <BottomNav />
</template>

<script setup lang="ts">
const selectedTheme = useTheme();

useHead({
  htmlAttrs: {
    "data-theme": selectedTheme,
  },
  meta: [{ name: "description", content: "A web based lemmy client" }],
});
</script>
