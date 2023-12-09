<template>
  <div v-for="{ community, post, counts, saved, my_vote } in data"
    class="card card-side bg-base-200 shadow-xl flex flex-col md:mx-4 mx-2 my-6 md:p-4 p-2 rounded-md min-h-56">
    <CommunityBar :community='community' />
    <div class="flex items-center my-2 cursor-pointer" @click="handleViewPost(post.id)">
      <div v-if='post.thumbnail_url' class="md:w-28 md:h-28 w-24 h-24 aspect-square">
        <NuxtImg :src="post.thumbnail_url" class="w-full h-full object-cover rounded-md" loading="lazy" />
      </div>
      <div class="card-body">
        <p class='md:text-xl text-sm leading-6'>{{ post.name }}</p>
      </div>
    </div>
    <Interactions :post='post' :counts='counts' :saved='saved' :my_vote='my_vote' @emitVote='handleVote'
      @view-comments="handleViewPost(post.id)" @emitSave='savePost' />
  </div>
</template>

<script setup lang="ts">
import { favouritePost, vote } from '~/services/posts'

const emit = defineEmits(['updatePost'])

const router = useRouter()

defineProps({
  data: Object,
})

const handleViewPost = (id: number) => {
  router.push(`/posts/${id}`)
}

const handleVote = async (payload: Object) => {
  const res = await vote(payload)
  emit('updatePost', res.post_view, 'vote')
}

const savePost = async (payload: Object) => {
  const res = await favouritePost(payload)
  emit('updatePost', res.post_view, 'save')
}
</script>
