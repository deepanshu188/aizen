<template>
  <Model>
    <community-popup :c='c' :mods='mods'></community-popup>
  </Model>
  <section>
    <div class="card bg-base-100 shadow-xl md:m-4 m-2">
      <div class="card-body items-center">
        <p class="card-title">{{ c.community.title }}</p>
        <span onclick='popup.showModal()' role="button">
          <Avatar :url='c.community.icon' :name='c.community.name' :size="24" />
        </span>
        <p>Subscribers: {{ c.counts.subscribers.toLocaleString() }}</p>
      </div>
    </div>
    <Posts />
  </section>
</template>

<script setup lang="ts">
import { fetchCommunity } from '../services/community'

const c = ref()
const mods = ref()
const { params, query } = useRoute()

if (query.id) {
  const res = await fetchCommunity({ name: params.community, id: query.id })
  c.value = res.community_view
  mods.value = res.moderators
}

</script>
