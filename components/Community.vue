<template>
  <section>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body items-center">
        <p class="card-title">{{ c.community.title }}</p>
        <Avatar :url='c.community.icon' :name='c.community.name' :size="24" />
        <p>Subscribers: {{ c.counts.subscribers.toLocaleString() }}</p>
        <p class="text-center">
          {{ c.community.description }}
        </p>
      </div>
    </div>
    <Posts />
  </section>
</template>

<script setup lang="ts">
import { fetchCommunity } from '../services/community'
const c = ref()
const { params, query } = useRoute()

if (query.id) {
  const res = await fetchCommunity({ name: params.community, id: query.id })
  c.value = res.community_view
}
</script>
