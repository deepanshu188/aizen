<script setup lang="ts">
defineProps({
  value: String,
});

const userData = useCookie('userData').value;
const jwt = userData?.jwt;

const tabData = [
  { name: 'Local' },
  { name: 'All' },
  { name: 'Subscribed', disabled: !jwt },
];
</script>

<template>
  <div class="tabs tabs-box">
    <input v-for="(tab, index) in tabData" :key="tab.name" type="radio" :name="tab.name" class="tab"
      :aria-label="tab.name" :checked="tab.name === value" @click="$emit('select-tab', tab.name)"
      :disabled="tab.disabled" />
  </div>
</template>
