<script setup lang="ts">

type Props = {
  text: string;
  position?: 'left' | 'right' | 'top' | 'bottom'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top'
})

const position = computed(() => ({
  'left': 'tooltip-left',
  'right': 'tooltip-right',
  'top': 'tooltip-top',
  'bottom': 'tooltip-bottom'
}[props.position]))

</script>

<template>
  <div :class="[{ tooltip: text }, position]" :data-tip="text">
    <slot />
  </div>
</template>
