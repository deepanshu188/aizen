<script setup lang="ts">
  import { userDetails, getPersonInfo } from '../services/user';
  import { useUserStore } from '@/stores/user';
  import IHome from './icons/IHome.vue';
  import IProfile from './icons/IProfile.vue';
  import ICommunities from './icons/ICommunities.vue';
  import ILogout from './icons/ILogout.vue';
  import IExplore from './icons/IExplore.vue';
  import IUser from './icons/IUser.vue';
  import ISettings from './icons/ISettings.vue';

  const commonItems = [
    {
      name: 'Home',
      icon: IHome,
      link: '/',
    },
    {
      name: 'Explore',
      icon: IExplore,
      link: '/explore',
    },
    {
      name: 'Settings',
      icon: ISettings,
      link: '/settings',
    },
  ];

  const navItems = [
    ...commonItems,
    {
      name: 'Login',
      icon: IUser,
      link: '/login',
    },
  ];

  const privateItems = [
    ...commonItems,
    {
      name: 'Profile',
      icon: IProfile,
      link: '/profile',
    },
    {
      name: 'Communities',
      icon: ICommunities,
      link: '/communities',
    },
    {
      name: 'Logout',
      icon: ILogout,
      link: '/',
    },
  ];

  const userData = useCookie('userData');
  const jwt = userData.value?.jwt;
  const user: any = useUserStore();

  if (jwt) {
    const res = await userDetails();
    const person_id = res?.my_user?.local_user_view?.person.id;
    const response = await getPersonInfo({ person_id });
    user.setUserDetails(res);
    user.setPersonInfo(response);
  }
  const userInfo = computed(() => user.data?.person_view?.person);

  const close = () => {
    const elem = document?.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  const logout = (name: string) => {
    close();
    if (name === 'Logout') {
      userData.value = '';
      window.location.reload();
    }
  };
</script>

<template>
  <div class="navbar bg-base-100 md:sticky top-0 z-10">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Aizen</a>
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle avatar"
        >
          <div class="w-10 rounded-full" v-if="jwt">
            <img
              v-if="userInfo.avatar"
              :src="userInfo.avatar"
              alt="avatar"
            />
            <div class="avatar placeholder" v-else>
              <div
                class="bg-neutral text-neutral-content rounded-full w-8"
              >
                <span class="text-xs">{{
                  capitalFirst(userInfo.display_name)
                }}</span>
              </div>
            </div>
          </div>
          <button class="btn btn-ghost btn-circle" v-else>
            <IMenu />
          </button>
        </div>
        <ul
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li
            v-for="item in privateItems"
            v-if="jwt"
            @click="logout(item.name)"
          >
            <NuxtLink :to="item.link" class="p-2">
              <component :is="item.icon"></component>
              {{ item.name }}
            </NuxtLink>
          </li>
          <li v-for="item in navItems" v-else @click="close">
            <NuxtLink :to="item.link" class="p-2">
              <component :is="item.icon"></component>
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
