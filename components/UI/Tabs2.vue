<template>
  <div role="tablist" class="tabs tabs-boxed">
    <a v-for="(tabName, index) in tabData" role="tab" class="tab"
      :class="{ 'tab-active': tabName === postStore.options.ListingType, 'pointer-events-none': !token && tabName === 'Subscribed' }"
      :key="index" @click="setTab(tabName)">{{
        tabName }}</a>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts';
const tabData = ['Local', 'All', 'Subscribed']

const token = useCookie('token')

const postStore = usePostsStore()
const setTab = (ListingType: string) => {
  postStore.setOptions({ ListingType })
}
</script>
