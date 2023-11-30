<template>
  <div v-for="{ community, post, counts } in data" class="card card-side bg-base-100 shadow-xl flex flex-col m-2 p-2">
    <div>
      <span class="cursor-pointer inline-flex items-center gap-2 my-2" @click="router.push(`/c/${community.name}`)">
        <Avatar :name='community.title' :url='community.icon' />
        <p>{{ community.title }}</p>
      </span>
    </div>
    <div class="flex items-center my-2">
      <NuxtImg v-if='post.thumbnail_url' :src="post.thumbnail_url" class="md:w-28 md:h-28 w-16 h-16 object-contain"
        alt="thumbnail" />
      <div class="card-body">
        <h2 class='md:text-xl'>{{ post.name }}</h2>
      </div>
    </div>
    <div class="flex gap-2 justify-start">
      <div class="flex items-center gap-1">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
        </svg>
        <p>{{ counts.upvotes }}</p>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
      <div class="flex items-center gap-1">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 cursor-pointer">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
        <p>{{ counts.comments }}</p>
      </div>
      <div class="flex items-center gap-1">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p>{{ diffDays(counts.published) }}</p>
      </div>
    </div>
  </div>
  <span v-if='loading' class="loading loading-ring loading-lg"></span>
</template>

<script setup>
const router = useRouter()
defineProps({
  data: Object,
  loading: Boolean
})
</script>
