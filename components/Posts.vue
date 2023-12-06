<template>
  <section class='flex flex-col items-center mt-4'>
    <div class="flex gap-2 flex-col-reverse md:flex-row justify-between items-center w-[98%]">
      <select class="select select-bordered max-w-xs md:ml-4 md:self-start" :value='options.sort' @click="handleSort">
        <option disabled selected>Sort</option>
        <option v-for="(option, index) in sortOptions" :key='index'>{{ option }}</option>
      </select>
      <span v-if='props.filters'>
        <Tabs2 />
      </span>
    </div>
    <div class='md:p-4 md:m-3 m-auto w-full'>
      <NormalPostCard v-if='!initialLoading' :data='posts' :loading='loading' @updatePost='updatePostData' />
      <div v-else class="flex justify-center min-h-[80vh]">
        <span class="loading loading-ring loading-lg"></span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import sortOptions from '~/content/sortOptions'
import { fetchPosts } from '../services/posts';
import { usePostsStore } from '@/stores/posts';
const { query } = useRoute()
const initialLoading = ref(true)
const loading = ref(false)
const props = defineProps(['savedOnly', 'filters'])

const postStore = usePostsStore()

const { options } = storeToRefs(postStore)

postStore.setOptions({ community_id: query.id, saved_only: props.savedOnly })

const posts = <any>ref([])

//* update the post UI after btn click
const updatePostData = (updatedPostValue: any, type: string) => {
  const id = updatedPostValue.post.id
  const updatedPosts = posts.value.map((item: any) => {
    if (item.post.id === id) {
      return updatedPostValue
    }
    else return item
  })
  posts.value = updatedPosts
  console.log(type)
}

const handleSort = (e: string) => {
  postStore.setOptions({ sort: e.target.value })
}

onMounted(() => {
  window.onscroll = () => {
    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
    if (bottomOfWindow) {
      postStore.setOptions({ page: options.value.page + 1 })
    }
  }
})

const fetchData = async (action?: string) => {
  loading.value = true;
  const payload = postStore.options
  try {
    const res = await fetchPosts(payload)
    action === 'push' ? posts.value.push(...res.posts) : posts.value = res.posts
  } finally {
    loading.value = false
    initialLoading.value = false
  }
}

watch(options, (current, prev) => {
  const action = current.page !== prev?.page ? 'push' : ''
  if (!loading.value)
    fetchData(action)
}, { immediate: true })


</script>
