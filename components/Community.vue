<template>
  <section>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body items-center">
        <p class="card-title">{{ c.community.title }}</p>
        <div class="avatar">
          <div class="w-24 rounded-full">
            <img :src='c.community.icon' alt='icon' />
          </div>
        </div>
        <p>Subscribers: {{ c.counts.subscribers.toLocaleString() }}</p>
        <p class="text-center">
          {{ c.community.description }}
        </p>
      </div>
    </div>
    <Posts />
  </section>
</template>

<script setup>
import { fetchCommunity } from '../services/community'
const c = ref()
const { params } = useRoute()

if (params.community) {
  const res = await fetchCommunity({ name: params.community })
  c.value = res.community_view
}
</script>
