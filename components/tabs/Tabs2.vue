<template>
  <div role="tablist" class="tabs tabs-boxed">
    <a v-for="(tab, index) in tabData" role="tab" class="tab"
      :class="{ 'tab-active': tab.name === value, 'pointer-events-none': tab.disabled }" :key="index"
      @click="$emit('select-tab', tab.name)">{{
        tab.name }}</a>
  </div>
</template>

<script setup lang="ts">

defineProps({
  value: String
})

const userData = useCookie('userData').value
const jwt = userData?.jwt

const tabData = [
  { name: 'Local' },
  { name: 'All' },
  { name: 'Subscribed', disabled: !jwt }
]
</script>
