<script setup lang="ts">
import { COOKIE_MAX_AGE } from "~/constants";
import { userLogin } from "../services/auth.services";
const user = shallowRef({ username_or_email: "", password: "" });
const instance = shallowRef("lemmy.ml");
const { fetchUserData } = useLoginUser();

const userData = useCookie<Record<string, string>>("userData", {
  maxAge: COOKIE_MAX_AGE,
});
const { $toast } = useNuxtApp();

const { data: serverOptions } = useFetch(
  "https://data.lemmyverse.net/data/instance.full.json",
  {
    transform: (res: Array<any>) => {
      if (!res) return [];
      const options = res.map(
        ({ baseurl, time }: { baseurl: string; time: number }) => {
          return { id: time, text: baseurl };
        },
      );
      return options;
    },
  },
);

const setCookie = async (name: string, value: string) =>
  (userData.value = { ...userData.value, [name]: value });

const { status, refresh } = useLazyAsyncData(
  "user-login",
  async () => {
    triggerRef(user);
    await setCookie("instance", instance.value);
    try {
      const res = await userLogin(user.value);
      if (res) {
        await setCookie("jwt", res);
        navigateTo("/");
      }
    } catch ({ message }: any) {
      switch (message) {
        case "incorrect_login":
          $toast.error("Incorrect Login!");
          break;
        case "deleted":
          $toast.error("Account Deleted");
          break;
        default:
          $toast.error("Error Occured");
      }
    }
  },
  {
    immediate: false,
  },
);

const login = () => refresh();
</script>

<template>
  <div class="hero min-h-screen -mt-10">
    <div class="hero-content flex-col lg:flex-row min-w-full justify-evenly">
      <div>
        <h1 class="text-2xl md:text-4xl font-bold text-center">Aizen</h1>
        <p class="py-2 md:text-md">PWA for Lemmy</p>
        <div class="text-center">
          <a href="https://github.com/deepanshu188/aizen" target="_blank">
            <Icon name="flowbite:github-solid" size="30" />
          </a>
        </div>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" @submit.prevent="login">
          <label class="label">Instance</label>
          <AutoComplete
            :data="serverOptions"
            id="lemmyVerse"
            v-model="instance"
          />

          <label class="label">Username</label>
          <input
            type="text"
            class="input w-full"
            placeholder="Username"
            v-model="user.username_or_email"
          />

          <label class="label">Password</label>
          <input
            type="password"
            class="input w-full"
            placeholder="Password"
            v-model="user.password"
          />

          <button
            class="btn btn-neutral mt-4 rounded-md"
            :class="{ 'pointer-events-none opacity-80': status === 'pending' }"
          >
            <span
              v-if="status === 'pending'"
              class="loading loading-spinner loading-md"
            ></span>
            <span v-else>Login</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
