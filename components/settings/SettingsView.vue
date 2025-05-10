<script setup lang="ts">
const category = [
  {
    name: 'Appearances',
    link: '/settings/appearances',
    icon: 'pepicons-pencil:paint-pallet'
  },
  {
    name: 'Preferences',
    link: '#',
    icon: 'hugeicons:preference-vertical',
    disabled: true,
  },
];

const user = useUserStore();

const handleLogout = () => {
  user.logoutUser();
  document.querySelector('#popup')?.close();
};
</script>

<template>
  <Modal title="Confirm">
    <div class="mt-4">
      <p class="text-lg my-2">Are you sure you want to Logout?</p>
      <div class="flex justify-end gap-x-2">
        <button class="btn bg-red-500 rounded-md" @click="handleLogout">Yes</button>
        <button class="btn border rounded-md" onclick="popup.close()">No</button>
      </div>
    </div>
  </Modal>
  <ul>
    <template v-for="item in category" :key="item.name">
      <NuxtLink :to="item.link">
        <li class="bg-base-200 my-4 p-3 rounded-md flex items-center gap-x-2"
          :class="{ 'cursor-not-allowed opacity-50': item.disabled }">
          <Icon v-if="item.icon" :name="item.icon" />
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
