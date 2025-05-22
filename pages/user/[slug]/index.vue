<template>
  <NuxtLayout name="user-header">
    <LazyUserPosts :posts="data?.posts" :status="status" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { getPersonInfo } from "~/services/user.services";
const nuxtApp = useNuxtApp();
const { params } = useRoute();
const person_id = params.slug;
const { data, status } = useLazyAsyncData(`id-${person_id}`, async () => await getPersonInfo({ person_id }), {
  deep: false,
  getCachedData: (key) => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
})

useHead({
  title: "Aizen - User Posts",
});
</script>
