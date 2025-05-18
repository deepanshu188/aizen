<template>
  <NuxtLayout name="user-header">
    <LazyUserPosts :posts="data?.posts" :status="status" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { getPersonInfo } from "~/services/user.services";
const { params } = useRoute();
const person_id = params.slug;
const { data, status } = useLazyAsyncData(`id-${person_id}`, async () => await getPersonInfo({ person_id }), {
  deep: false
})

useHead({
  title: "Aizen - User Posts",
});
</script>
