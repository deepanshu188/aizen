<script setup lang="ts">
import { userLogin } from "../services/auth";
const user = ref({ username_or_email: "", password: "" });
const loading = ref(false);
const instance = ref("lemmy.ml");

const userData: Object = useCookie("userData", {
  maxAge: 1000 * 60 * 60 * 24 * 90,
});
const { $toast } = useNuxtApp();

const { data: serverList } = useFetch(
  "https://data.lemmyverse.net/data/instance.full.json",
);

const serverOptions = computed(
  () =>
    serverList.value?.map(
      ({ baseurl, time }: { baseurl: string; time: string }) => ({
        id: time,
        text: baseurl,
      }),
    ) ?? [],
);

const setCookie = (name: string, value: string) =>
  (userData.value = { ...userData.value, [name]: value });

const login = async () => {
  loading.value = true;
  await setCookie("instance", instance.value);
  try {
    const res = await userLogin(user.value);
    if (res) {
      setCookie("jwt", res);
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
  } finally {
    loading.value = false;
  }
};
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
            :class="{ 'pointer-events-none opacity-80': loading }"
          >
            <span
              v-if="loading"
              class="loading loading-spinner loading-md"
            ></span>
            <span v-else>Login</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
