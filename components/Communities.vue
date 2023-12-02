<template>
  <section>
    <ul v-if="subscriptions">
      <li v-for="c in subscriptions" :key='c.id' class="card bg-base-100 shadow-md m-2 p-2">
        <div class='flex gap-2 items-center cursor-pointer'
          @click='router.push(`c/${c.community.name}?id=${c.community.id}`)'>
          <Avatar :name='c.community.title' :url='c.community.icon' alt='icon' />
          <p>{{ c.community.title }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const router = useRouter()

import { useUserStore } from '@/stores/user';
const data = useUserStore()
const subscriptions = computed(() => data?.user?.my_user?.follows) 
</script>
