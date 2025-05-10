<template>
  <section class="p-4 flex justify-center">
    <div class="md:w-4/6 w-full p-4">
      <Breadcrumbs :data="breadcrumbData" />
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
type Props = {
  breadcrumbData: object[];
}
const props = defineProps<Props>();
</script>
