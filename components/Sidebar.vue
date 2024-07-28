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

const privateItems = [
  ...commonItems,
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
    user.clearAllUserDetails()
    navigateTo('/')
  }
};
</script>

<template>
  <ul class="menu bg-base-200 rounded-box sticky top-0 h-screen flex items-center">
    <li v-if="jwt">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar" @click="navigateTo('/profile')">
        <div class="w-8 rounded-full">
          <img v-if="userInfo?.avatar" :src="userInfo?.avatar" alt="avatar" />
          <div class="avatar placeholder" v-else>
            <div class="bg-neutral text-neutral-content rounded-full w-8">
              <span class="text-xs">{{
                capitalFirst(userInfo?.display_name)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
    <li v-else>
      <Tooltip text="Login">
        <NuxtLink to="/login">
          <Icon name="mynaui:user-circle" />
        </NuxtLink>
      </Tooltip>
    </li>


    <li v-for="item in privateItems" v-if="jwt" @click="logout(item.name)">
      <Tooltip :text="item.name">
        <NuxtLink :to="item.link">
          <Icon :name="item.icon" />
        </NuxtLink>
      </Tooltip>
    </li>

    <li v-for="item in commonItems" v-else @click="close">
      <Tooltip :text="item.name">
        <NuxtLink :to="item.link">
          <Icon :name="item.icon" />
        </NuxtLink>
      </Tooltip>
    </li>
  </ul>
</template>
