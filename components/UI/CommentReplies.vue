<template>
  <ul>
    <li v-for="c in  comments " class='bg-base-200 shadow-lg my-4 p-3 rounded-md'>
      <CommentCard :c='c' />
    </li>
  </ul>
  <div class='flex justify-center'>
    <span class="loading loading-ring loading-lg"></span>
  </div>
</template>

<script setup lang="ts">

import { getComments } from '~/services/comments';
const loading = ref(false)
const comments = ref([])

const { data } = defineProps([
  'data',
])

const options = ref({ post_id: data.post.id, community_id: data.community.id, sort: 'Hot', page: 1 })

const fetchComments = async () => {
  loading.value = true;
  try {
    const cmt = await getComments(options.value)
    comments.value.push(...cmt.comments)
  } finally {
    loading.value = false
  }
}

watch(options.value, () => {
  if (!loading.value)
    fetchComments()
}, { immediate: true })

onMounted(() => {
  window.onscroll = () => {
    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
    if (bottomOfWindow) {
      if (comments.value.length < data.counts.comments) {
        options.value.page += 1
        console.log(options, 'page')
      }
    }
  }
})
</script>
