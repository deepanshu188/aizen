<template>
  <ul>
    <li v-for="c in  comments" class='bg-base-200 shadow-lg my-4 p-3 rounded-md'>
      <CommentCard :c='c' />
    </li>
  </ul>
  <div class='flex justify-center'>
    <loader :loading='initalLoading' />
  </div>
</template>

<script setup lang="ts">

import { getComments } from '~/services/comments';

const { data } = defineProps([
  'data',
])

const initialPayload = { post_id: data.post.id, community_id: data.community.id, sort: 'Hot', page: 1 }

const { data: comments, loading } = useInfiniteScroll({
  apiCall: getComments, initialPayload
  , listKey: 'comments', totalLength: data.counts.comments
})

const initalLoading = computed(() => !comments.value.length && loading.value)

</script>
