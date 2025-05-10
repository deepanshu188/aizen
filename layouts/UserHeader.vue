<template>
  <section v-if="userData" class="mb-10 mx-4 md:mx-8">
    <UserCard :user="userData" :loading="otherUser.loading" />
    <Tabs :tabs="tabs" />
    <slot />
  </section>
</template>

<script setup lang="ts">
import { getPersonInfo } from '../services/user';

const otherUser = useOtherUserStore();
const { params } = useRoute();

const person_id = params.slug;

try {
  otherUser.loading = true;
  const response = await getPersonInfo({ person_id });
  otherUser.setPersonInfo(response);
} finally {
  otherUser.loading = false;
}

const userData = otherUser.data.person_view;

const tabs = [
  { name: 'Posts', link: `/user/${person_id}` },
  { name: 'Comments', link: `/user/${person_id}/comments` },
];
</script>
