<script setup lang="ts">
const sideBarLinks = [
  {
    name: "Home",
    icon: "svgo-home",
    link: "/",
    private: false,
  },
  {
    name: "Explore",
    icon: "svgo-explore",
    link: "/explore",
    private: false,
  },
  {
    name: "Settings",
    icon: "svgo-settings",
    link: "/settings",
    private: false,
  },
  {
    name: "Communities",
    icon: "svgo-communities",
    link: "/c",
    private: true,
  },
];

const user: any = useUserStore();
const userInfo = computed(() => user.data?.person_view?.person);
</script>

<template>
  <ul class="menu min-w-64 bg-base-200 sticky top-0 h-screen flex items-between max-sm:hidden p-4">
    <p class="text-xl my-2 tracking-widest font-semibold text-center max-sm:hidden">
      Aizen
    </p>
    <label class="input input-bordered items-center sm:flex hidden mb-2">
      <input type="text" class="grow" placeholder="Search" />
      <Icon name="bitcoin-icons:search-outline" />
    </label>
    <li v-if="user.jwt" class="my-1">
      <NuxtLink to="/profile" class="gap-x-4 max-sm:px-0 max-sm:py-1"
        :class="{ 'text-[#00dc82]': '/profile' === $route.path }">
        <Avatar :name="userInfo?.display_name" :image="userInfo?.avatar" alt="avatar" />
        <p class="sm:flex hidden">{{ userInfo?.display_name }}</p>
      </NuxtLink>
    </li>
    <li v-else>
      <NuxtLink to="/login" class="gap-x-4 max-sm:px-0 max-sm:py-1"
        :class="{ 'text-[#00dc82]': '/login' === $route.path }">
        <component is="svgo-userLight" class="text-2xl" />
        <p class="sm:flex hidden">Login</p>
      </NuxtLink>
    </li>

    <template v-for="item in sideBarLinks" :key="item.name">
      <li v-if="item.private ? user.jwt : true" class="my-1" :class="{ 'text-[#00dc82]': item.link === $route.path }">
        <NuxtLink :to="item.link" class="gap-x-4 max-sm:px-0 max-sm:py-1">
          <component :is="item.icon" class="text-2xl" />
          <p class="sm:flex hidden">{{ item.name }}</p>
        </NuxtLink>
      </li>
    </template>

    <li v-if="user.jwt" class="my-1">
      <div @click="user.logoutUser" class="gap-x-4 max-sm:px-0 max-sm:py-1">
        <component is="svgo-logout" class="text-xl" />
        <p class="sm:flex hidden">Logout</p>
      </div>
    </li>
  </ul>
</template>
