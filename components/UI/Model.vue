<template>
  <dialog id="user_popup" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg text-center">{{ title }}</h3>
      <slot />
      <div class="modal-action justify-center">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup>

defineProps({
  title: String
})

</script>
