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
      <li v-for="c in  comments" class='bg-base-200 shadow-lg my-4 p-3 rounded-md'>
        <CommentCard :c='c' />
      </li>
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

const { data } = defineProps({
  data: Object
})

const initialPayload = { post_id: data.post.id, community_id: data.community.id, sort: 'Hot', page: 1 }

const { data: comments, loading, options } = useInfiniteScroll({
  apiCall: getComments, initialPayload
  , listKey: 'comments', totalLength: data.counts.comments
})

const initalLoading = computed(() => !comments.value.length && loading.value)

</script>
