<template>
  <Toast v-if="error" type='error'>Incorrect login</Toast>
  <div class="hero min-h-screen bg-base-400">
    <div class="hero-content flex-col lg:flex-row min-w-full justify-evenly">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl text-center font-bold">Aizen</h1>
        <p class="py-6 text-xl">Yet Another web based lemmy client</p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" @submit.prevent="login">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
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
            <button class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userLogin } from '../services/auth'
const user = ref({ username_or_email: '', password: '' })
const error = ref(false)
const router = useRouter()

const token = useCookie('token')

const login = async () => {
  try {
    const res = await userLogin(user.value)
    if (res) {
      token.value = res
      router.push('/')
    }
  }
  catch (err) {
    error.value = true
    setTimeout(() => {
      error.value = false
    }, 2000)
  }
}
</script>
