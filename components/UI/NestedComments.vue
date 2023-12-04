<template>
  <ul class='pl-1' :class="{ 'border-l border-l-neutral-600': childComments?.length > 1 }">
    <li v-for="(c, index) in  childComments " class='bg-base-200 shadow-lg my-4 p-3 border-l' :key="index"
      :class="{ 'ml-2': index % 2 !== 0, 'border-l-red-500': index % 2 === 0, 'border-l-orange-500': index % 2 !== 0 }">
      <CommentCard :c='c' :child='true' />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { getComments } from "~/services/comments";
const childComments = ref()
const loading = ref(false)

const { data } = defineProps(['data'])

const fetchNestedComments = async () => {
  const options = { parent_id: data.counts.comment_id }
  loading.value = true;
  try {
    const cmt = await getComments(options)
    const res = cmt.comments.filter((c) => c.comment.id !== options.parent_id)
    childComments.value = res
  } finally {
    loading.value = false
  }
}

fetchNestedComments()
</script>
