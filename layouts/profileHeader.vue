<template>
  <section v-if="userData">
    <UserCard :user='userData' />
    <Tabs :tabs='tabs' />
    <slot />
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const user = useUserStore()

const userData = computed(() => user?.data?.person_view)

const tabs = [{ name: 'Posts', link: '/profile' }, { name: 'Comments', link: '/profile/comments' }, { name: 'Saved', link: '/profile/saved' }]
</script>
