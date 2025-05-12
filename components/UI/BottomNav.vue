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
          <Icon :name="item.icon" />
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
    icon: "ci:house-01",
    link: "/",
    private: false,
  },
  {
    ...(user.jwt
      ? {
          name: "Profile",
          icon: "lucide:circle-user",
          link: "/profile",
          private: true,
        }
      : {
          name: "Login",
          icon: "iconamoon:profile-light",
          link: "/login",
          private: false,
        }),
  },
  {
    name: "Explore",
    icon: "mynaui:navigation-one",
    link: "/explore",
    private: false,
  },
  {
    name: "Communities",
    icon: "mynaui:at",
    link: "/c",
    private: true,
  },
  {
    name: "Settings",
    icon: "mynaui:fine-tune",
    link: "/settings",
    private: false,
    indicator: $pwa?.needRefresh,
  },
]);
</script>
