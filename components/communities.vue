<template>
  <section>
    <ul>
      <li v-for="c in subscriptions" :key='c.id' class="card bg-base-100 shadow-md m-2 p-2">
        <div class='flex gap-2 items-center'>
          <Avatar :name='c.community.title' :url='c.community.icon' alt='icon' />
          <p>{{ c.community.title }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { userDetails } from '../services/user';
const subscriptions = ref()
const res = await userDetails()
subscriptions.value = res.my_user.follows
</script>
