<script setup lang="ts">
import { useOnline } from "@vueuse/core";
const isOnline = useOnline();

interface Props {
  userData: any;
  tabs: Record<string, string>[];
}
defineProps<Props>();
</script>

<template>
  <section>
    <UserCard :user="userData" />
    <template v-if="isOnline">
      <Tabs :tabs="tabs" />
      <slot />
    </template>
    <Offline v-else />
  </section>
</template>
