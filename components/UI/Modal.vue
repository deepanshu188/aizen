<script setup lang="ts">
interface Props {
  title?: string;
}
const { title = 'About' } = defineProps<Props>();
</script>

<template>
  <dialog id="popup" class="modal">
    <div class="modal-box">
      <div class="flex justify-between items-center">
        <p class="font-bold font-lg">{{ title }}</p>
        <button class="btn btn-sm btn-circle" onclick="popup.close()">
          <Icon name="fe:close" />
        </button>
      </div>
      <slot />
    </div>
  </dialog>
</template>
