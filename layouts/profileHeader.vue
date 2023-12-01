<template>
  <section v-if="userData">
    <UserCard :user='userData' />
    <div role="tablist" class="tabs tabs-bordered">
      <NuxtLink v-for="{ name, link } in tabs" :to="link" role="tab" class="tab" :class="{ 'tab-active': link === path }">
        {{ name }}</NuxtLink>
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const { path } = useRoute()
const user = useUserStore()

const userData = user?.data?.person_view?.person

const tabs = [{ name: 'Posts', link: '/profile' }, { name: 'Comments', link: '/profile/comments' }, { name: 'Saved', link: '/profile/saved' }]
</script>
