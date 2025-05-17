<template>
  <Loader v-if="status === 'pending'" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
  <NuxtLayout v-else name="user-header">
    <LazyUserPosts :posts="data?.posts" />
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
