<script setup lang="ts">
const category = [
  {
    name: "Appearances",
    link: "/settings/appearances",
    icon: "svgo-appearences",
  },
  {
    name: "Preferences",
    link: "/settings/preferences",
    icon: "svgo-preferences",
  },
];

const user = useUserStore();

const handleLogout = () => {
  user.logoutUser();
  document.querySelector("#popup")?.close();
};
</script>

<template>
  <Modal>
    <template #content>
      <div class="p-3">
        <div class="flex flex-col items-center my-3 gap-y-3">
          <Icon name="teenyicons:logout-solid" class="text-red-500" :size="32" />
          <p class="text-xl font-bold">Confirm Logout</p>
          <p class="text-sm">Are you sure you want to Logout?</p>
        </div>
        <div class="flex flex-col justify-end gap-y-4">
          <button class="btn bg-red-500 rounded-md" @click="handleLogout">
            Yes
          </button>
          <button class="btn border rounded-md" onclick="popup.close()">
            No
          </button>
        </div>
      </div>
    </template>
  </Modal>
  <ul>
    <template v-for="item in category" :key="item.name">
      <NuxtLink :to="item.link">
        <li class="bg-base-200 my-4 p-3 rounded-md flex items-center gap-x-2"
          :class="{ 'cursor-not-allowed opacity-50': item.disabled }">
          <component v-if="item.icon" :is="item.icon" class="text-xl" />
          {{ item.name }}
        </li>
      </NuxtLink>
    </template>
    <li v-if="user.jwt" class="bg-red-500 my-4 p-2 rounded-md flex items-center gap-x-2 justify-center text-gray-300"
      onclick="popup.showModal()">
      <Icon name="hugeicons:logout-04" />
      Logout
    </li>
  </ul>
</template>
