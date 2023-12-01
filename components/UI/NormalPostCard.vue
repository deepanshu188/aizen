<template>
  <div v-for="{ community, post, counts, saved, my_vote } in data"
    class="card card-side bg-base-100 shadow-xl flex flex-col m-2 p-2">
    <div>
      <span class="cursor-pointer inline-flex items-center gap-2 my-2"
        @click="router.push(`/c/${community.name}?id=${community.id}`)">
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
    <div class="flex gap-2 justify-between">
      <div class='flex gap-2'>
        <div class="flex items-center gap-1">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="my_vote === 1 ? '#0BDA51' : '#fff'"
            :class="iconClass" @click="handleVote({ post_id: post.id, score: my_vote !== 1 ? 1 : 0 })">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
          <p>{{ counts.upvotes }}</p>
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="my_vote === -1 ? '#ff0000' : '#fff'"
            :class="iconClass" @click='handleVote({ post_id: post.id, score: my_vote !== -1 ? -1 : 0 })'>
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </div>
        <div class="flex items-center gap-1">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="iconClass">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
          <p>{{ counts.comments }}</p>
        </div>
        <div class="flex items-center gap-1">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="iconClass">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>{{ diffDays(counts.published) }}</p>
        </div>
      </div>
      <div>
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" :class="iconClass"
          @click="savePost({ post_id: post.id, save: !saved })">
          <path stroke-linecap="round" stroke-linejoin="round" :fill="saved ? '#fff' : ''"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <span v-if='loading' class="loading loading-ring loading-lg"></span>
  </div>
</template>

<script setup>
import { favouritePost, vote } from '../../services/posts'

const emit = defineEmits(['updatePost'])

const iconClass = 'w-5 h-5 cursor-pointer'
const router = useRouter()
defineProps({
  data: Object,
  loading: Boolean
})

const handleVote = async (payload) => {
  const res = await vote(payload)
  emit('updatePost', res.post_view, 'vote')
}

const savePost = async (payload) => {
  const res = await favouritePost(payload)
  emit('updatePost', res.post_view, 'save')
}
</script>
