<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const sideBarLinks = [
  {
    name: "Home",
    icon: "ci:house-01",
    link: "/",
    private: false,
  },
  {
    name: "Explore",
    icon: "mynaui:navigation-one",
    link: "/explore",
    private: false,
  },
  {
    name: "Settings",
    icon: "mynaui:fine-tune",
    link: "/settings",
    private: false,
  },
  {
    name: "Communities",
    icon: "mynaui:at",
    link: "/communities",
    private: true,
  },
];

const user: any = useUserStore();
await user.fetchUserDetails();
const userInfo = computed(() => user.data?.person_view?.person);
</script>

<template>
  <ul
    class="menu min-w-64 bg-base-200 sticky top-0 h-screen flex items-between max-sm:hidden"
  >
    <p
      class="text-xl my-2 tracking-widest font-semibold text-center max-sm:hidden"
    >
      Aizen
    </p>
    <label class="input input-bordered items-center gap-4 m-2 sm:flex hidden">
      <input type="text" class="grow" placeholder="Search" />
      <Icon name="bitcoin-icons:search-outline" />
    </label>
    <li v-if="user.jwt" class="my-1">
      <NuxtLink to="/profile" class="gap-x-4 max-sm:px-0 max-sm:py-1">
        <Avatar
          :name="userInfo?.display_name"
          :image="userInfo?.avatar"
          alt="avatar"
        />
        <p class="sm:flex hidden">{{ userInfo?.display_name }}</p>
      </NuxtLink>
    </li>
    <li v-else>
      <NuxtLink to="/login" class="gap-x-4 max-sm:px-0 max-sm:py-1">
        <Icon name="iconamoon:profile-light" />
        <p class="sm:flex hidden">Login</p>
      </NuxtLink>
    </li>

    <template v-for="item in sideBarLinks" :key="item.name">
      <li v-if="item.private ? user.jwt : true" class="my-1">
        <NuxtLink :to="item.link" class="gap-x-4 max-sm:px-0 max-sm:py-1">
          <Icon :name="item.icon" />
          <p class="sm:flex hidden">{{ item.name }}</p>
        </NuxtLink>
      </li>
    </template>

    <li v-if="user.jwt" class="my-1">
      <div @click="user.logoutUser" class="gap-x-4 max-sm:px-0 max-sm:py-1">
        <Icon name="mynaui:power" />
        <p class="sm:flex hidden">Logout</p>
      </div>
    </li>
  </ul>
</template>
