<script setup lang="ts">
import { userLogin } from '../services/auth';
const user = ref({ username_or_email: '', password: '' });
const loading = ref(false);
const error = ref(false);
const toastMsg = ref('');
const instance = ref('lemmy.ml');

const userData: Object = useCookie('userData');

const { data: serverList } = useFetch('https://data.lemmyverse.net/data/instance.full.json')

const serverOptions = computed(() => serverList.value?.map(({ baseurl, time }: { baseurl: string; time: string }) => ({ id: time, text: baseurl })) ?? [])

const setCookie = (name: string, value: string) =>
  (userData.value = { ...userData.value, [name]: value });

const login = async () => {
  loading.value = true;
  await setCookie('instance', instance.value);
  try {
    const res = await userLogin(user.value);
    if (res) {
      setCookie('jwt', res);
      navigateTo('/')
    }
  } catch ({ message }: any) {
    switch (message) {
      case 'incorrect_login':
        toastMsg.value = 'Incorrect Login!';
        break;
      case 'deleted':
        toastMsg.value = 'Account Deleted';
        break;
      default:
        toastMsg.value = 'Error Occured';
    }
    error.value = true;
    setTimeout(() => {
      error.value = false;
    }, 2000);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Toast v-if="error" type="error">{{ toastMsg }}</Toast>
  <div class="hero min-h-screen">
    <div class="hero-content flex-col lg:flex-row min-w-full justify-evenly">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl text-center font-bold">Aizen</h1>
        <p class="py-6 text-xl">Yet Another web based lemmy client</p>
        <div class="text-center">
          <a href="https://github.com/deepanshu188/aizen" target="_blank">
            <Icon name="flowbite:github-solid" size="30" />
          </a>
        </div>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" @submit.prevent="login">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Instance</span>
            </label>
            <AutoComplete :data="serverOptions" id='lemmyVerse' v-model="instance" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <input type="text" placeholder="Username" class="input input-bordered" v-model="user.username_or_email" />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input type="password" placeholder="Password" class="input input-bordered" v-model="user.password" />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" :class="{ 'pointer-events-none opacity-80': loading }">
              <span v-if="loading" class="loading loading-spinner loading-md"></span>
              <span v-else>Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
