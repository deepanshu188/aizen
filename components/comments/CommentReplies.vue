<template>
  <section>
    <div class='mt-4'>
      <div class='flex justify-between items-center m-2'>
        <p><b>{{ data.counts.comments }}</b> comments</p>
        <select class="select select-bordered" v-model="options.sort">
          <option v-for='(o, i) in sortOptions' :key='i'>{{ o }}</option>
        </select>
      </div>
      <div class='flex justify-center'>
        <Editor placeholder='type comment...' :id='data.post.id' />
      </div>
    </div>
    <ul>
      <template v-for="c in  comments">
        <li class='bg-base-200 shadow-lg my-4 p-3 rounded-md' v-if='!ignoreComments.includes(c?.comment?.id)'>
          <CommentCard :c='c' :comments='comments' />
        </li>
      </template>
    </ul>
    <p v-if='comments.length === 0' class='text-center'>No Comment to see</p>
    <div class='flex justify-center' v-if='initalLoading'>
      <Loader />
    </div>
  </section>
</template>

<script setup lang="ts">

import sortOptions from '~/content/commentSortOptions.json'
import { getComments } from '~/services/comments';
import { useCommentStore } from '@/stores/comments';
const { ignoreComments } = useCommentStore()

const { data } = defineProps({
  data: Object
})

const initialPayload = { post_id: data.post.id, community_id: data.community.id, sort: 'Hot', page: 1, max_depth: 6 }

const { data: comments, loading, options } = useInfiniteScroll({
  apiCall: getComments, initialPayload
  , listKey: 'comments', totalLength: 0
})

const initalLoading = computed(() => !comments.value.length && loading.value)

</script>
