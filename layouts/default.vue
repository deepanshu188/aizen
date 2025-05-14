<template>
  <section>
    <div class="flex">
      <Sidebar />
      <div class="flex-grow w-full mb-10">
        <slot />
      </div>
    </div>
  </section>
  <BottomNav />
</template>

<script setup lang="ts">
useHead({
  meta: [{ name: "description", content: "A web based lemmy client" }],
});
</script>
