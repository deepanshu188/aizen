<script setup lang="ts">
import { userDetails, getPersonInfo } from "../services/user";
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

const userData = useCookie("userData");
const jwt = computed(() => userData.value?.jwt);
const user: any = useUserStore();

if (jwt.value) {
  const res = await userDetails();
  const person_id = res?.my_user?.local_user_view?.person.id;
  const response = await getPersonInfo({ person_id });
  // all info
  user.setUserDetails(res);
  // profile related
  user.setPersonInfo(response);
}

const userInfo = computed(() => user.data?.person_view?.person);

const handleLogout = () => {
  userData.value = "";
  user.clearAllUserDetails();
  navigateTo("/");
};
</script>

<template>
  <ul class="menu bg-base-200 sticky top-0 h-screen flex items-between">
    <p
      class="text-xl my-2 tracking-widest font-semibold text-center max-sm:hidden"
    >
      Aizen
    </p>
    <label class="input input-bordered items-center gap-4 m-2 sm:flex hidden">
      <input type="text" class="grow" placeholder="Search" />
      <Icon name="bitcoin-icons:search-outline" />
    </label>
    <li v-if="jwt" class="my-1">
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
      <li v-if="item.private ? jwt : true" @click="close" class="my-1">
        <NuxtLink :to="item.link" class="gap-x-4 max-sm:px-0 max-sm:py-1">
          <Icon :name="item.icon" />
          <p class="sm:flex hidden">{{ item.name }}</p>
        </NuxtLink>
      </li>
    </template>

    <li v-if="jwt" class="my-1">
      <div @click="handleLogout" class="gap-x-4 max-sm:px-0 max-sm:py-1">
        <Icon name="mynaui:power" />
        <p class="sm:flex hidden">Logout</p>
      </div>
    </li>
  </ul>
</template>
