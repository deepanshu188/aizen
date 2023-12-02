<template>
  <section class="md:p-4 p-2">
    <div class="flex justify-center">
      <PostViewCard :data='post.post_view' />
    </div>
  </section>
</template>

<script setup>
import { fetchPost } from '../../services/posts'

const { params } = useRoute()
const post = ref(undefined)

const res = await fetchPost({ id: params.id })
post.value = res
</script>
