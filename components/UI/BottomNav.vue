<template>
  <div class="dock dock-xs sm:hidden">
    <template v-for="item in navData" :key="item.name">
      <button
        v-if="item.private ? user.jwt : true"
        :class="{
          'text-[#00dc82]':
            $route.path === item.link ||
            ($route.path.startsWith(item.link) && item.link !== '/'),
        }"
        @click="navigateTo(item.link)"
      >
        <div class="indicator">
          <span
            v-if="item?.indicator"
            class="indicator-item status status-info"
          ></span>
          <component :is="item.icon" class="text-2xl" />
        </div>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
const { $pwa } = useNuxtApp();
const user: any = useUserStore();
const navData = computed(() => [
  {
    name: "Home",
    icon: "svgo-home",
    link: "/",
    private: false,
  },
  {
    ...(user.jwt
      ? {
          name: "Profile",
          icon: "svgo-user",
          link: "/profile",
          private: true,
        }
      : {
          name: "Login",
          icon: "svgo-userLight",
          link: "/login",
          private: false,
        }),
  },
  {
    name: "Explore",
    icon: "svgo-explore",
    link: "/explore",
    private: false,
  },
  {
    name: "Communities",
    icon: "svgo-communities",
    link: "/c",
    private: true,
  },
  {
    name: "Settings",
    icon: "svgo-settings",
    link: "/settings",
    private: false,
    indicator: $pwa?.needRefresh,
  },
]);
</script>
