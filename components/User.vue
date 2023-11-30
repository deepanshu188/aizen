<template>
  <section>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body items-center">
        <p class="card-title">{{ user.person_view.person.display_name }}</p>
        <div class="avatar">
          <div class="w-24 rounded-full">
            <img :src="user.person_view.person.avatar" alt='avatar' />
          </div>
        </div>
        <p>Bio: {{ user.person_view.person.bio }}</p>
        <p>Matrix: {{ user.person_view.person.matrix_user_id }}</p>
      </div>
    </div>
    <NormalPostCard :data='user.posts' />
  </section>
</template>

<script setup>
import { userDetails, getPersonInfo } from '../services/user';
const user = ref()
const res = await userDetails()
const person_id = res.my_user.local_user_view.person.id
const response = await getPersonInfo({ person_id })
user.value = response
</script>
