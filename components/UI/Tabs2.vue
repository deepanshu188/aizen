<template>
  <div role="tablist" class="tabs tabs-boxed">
    <a v-for="(tabName, index) in tabData" role="tab" class="tab"
      :class="{ 'tab-active': tabName === postStore.options.type_, 'pointer-events-none': !jwt && tabName === 'Subscribed' }"
      :key="index" @click="setTab(tabName)">{{
        tabName }}</a>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '@/stores/posts';
const tabData = ['Local', 'All', 'Subscribed']

const userData = useCookie('userData').value
const jwt = userData?.jwt

const postStore = usePostsStore()
const setTab = (type_: string) => {
  postStore.setOptions({ type_ })
}
</script>
