<script setup lang="ts">
  import { userDetails, getPersonInfo } from '../services/user';
  import { useUserStore } from '@/stores/user';

  const commonItems = [
    {
      name: 'Home',
      icon: 'ci:house-01',
      link: '/',
    },
    {
      name: 'Explore',
      icon: 'mynaui:navigation-one',
      link: '/explore',
    },
    {
      name: 'Settings',
      icon: 'mynaui:fine-tune',
      link: '/settings',
    },
  ];

  const navItems = [
    ...commonItems,
    {
      name: 'Login',
      icon: 'mynaui:user-circle',
      link: '/login',
    },
  ];

  const privateItems = [
    ...commonItems,
    {
      name: 'Profile',
      icon: 'mynaui:user-circle',
      link: '/profile',
    },
    {
      name: 'Communities',
      icon: 'mynaui:at',
      link: '/communities',
    },
    {
      name: 'Logout',
      icon: 'mynaui:power',
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
            <!-- hamburger icon -->
            <Icon name="mynaui:menu" />
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
              <Icon :name="item.icon" />
              {{ item.name }}
            </NuxtLink>
          </li>
          <li v-for="item in navItems" v-else @click="close">
            <NuxtLink :to="item.link" class="p-2">
              <Icon :name="item.icon" />
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
