<template>
  <NuxtLayout name="settings" :breadcrumbData="breadcrumbData">
    <SettingsView />
  </NuxtLayout>
  <span v-if="$pwa?.needRefresh" class="flex items-center justify-center gap-2 text-sm text-gray-200 cursor-pointer"
    @click="refreshApp">
    <Icon name="material-symbols-light:refresh" :class="{ rotate: isRotating }" @animationend="isRotating = false" />
    Update
  </span>
</template>

<script setup lang="ts">
const isRotating = ref(false)

useHead({
  title: "Aizen - Settings",
});

const breadcrumbData = [
  { name: "Home", link: "/" },
  { name: "Settings", link: "" },
];

const refreshApp = () => {
  isRotating.value = true;
  $pwa?.updateServiceWorker();
};
</script>

<style scoped>
.rotate {
  animation: rotate360 0.6s ease-in-out;
}

@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
