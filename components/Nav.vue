<template>
  <div class="navbar bg-base-100 md:sticky top-0 z-10">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Aizen</a>
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end" v-if="userInfo">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img v-if='userInfo.avatar' :src="userInfo.avatar" alt='avatar' />
            <div class="avatar placeholder" v-else>
              <div class="bg-neutral text-neutral-content rounded-full w-8">
                <span class="text-xs">{{ capitalFirst(userInfo.display_name) }}</span>
              </div>
            </div>
          </div>
        </div>
        <ul class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <NuxtLink to="/" class="p-2">
              <IHome />
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/profile" class="p-2">
              <IProfile />
              Profile
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/communities" class="p-2">
              <ICommunities />
              Communities
            </NuxtLink>
          </li>
          <li @click="logout">
            <NuxtLink to="/login" class="p-2">
              <ILogout />
              Logout
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userDetails, getPersonInfo } from '../services/user';
import { useUserStore } from '@/stores/user';

const token = useCookie('token')
const user: any = useUserStore()

if (token.value) {
  const res = await userDetails()
  const person_id = res?.my_user?.local_user_view?.person.id
  const response = await getPersonInfo({ person_id })
  user.setUserDetails(res)
  user.setPersonInfo(response)
}
const userInfo = computed(() => user.data?.person_view?.person)

const logout = () => {
  token.value = ''
}
</script>
