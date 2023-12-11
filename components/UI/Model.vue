<template>
  <dialog id="popup" class="modal">
    <div class="modal-box">
      <div class="flex justify-between items-center">
        <p class="font-bold font-lg">About</p>
        <button
          class="btn btn-ghost btn-sm btn-circle"
          onclick="popup.close()"
        >
          <ICross />
        </button>
      </div>
      <slot />
    </div>
  </dialog>
</template>
