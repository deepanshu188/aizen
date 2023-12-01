<template>
  <section class='flex flex-col items-center'>
    <div v-if='props.filters' class="flex gap-2 flex-col md:flex-row justify-between items-center w-[98%]">
      <select class="select select-bordered w-full max-w-xs md:ml-4 md:self-start" v-model="options.SortType">
        <option disabled selected>Sort</option>
        <option v-for="(option, index) in sortOptions" :key='index'>{{ option }}</option>
      </select>
      <div role="tablist" class="tabs tabs-boxed">
        <a role="tab" class="tab">Local</a>
        <a role="tab" class="tab tab-active">All</a>
        <a role="tab" class="tab">Subscribed</a>
      </div>
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
import { fetchPosts } from '../services/posts';
const { query } = useRoute()
const initialLoading = ref(true)
const loading = ref(false)
const props = defineProps(['savedOnly', 'filters'])

const sortOptions = ["Active", "Hot", "New", "Old", "MostComments", "NewComments"]

const options = ref({ ListingType: 'All', SortType: 'Active', limit: 30, page: 1, community_id: query.id, saved_only: props.savedOnly })
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
}

onMounted(() => {
  window.onscroll = () => {
    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
    if (bottomOfWindow) {
      loading.value = true;
      options.value.page += 1;
    }
  }
})

const fetchData = async () => {
  try {
    const res = await fetchPosts(options.value)
    posts.value.push(...res.posts)
  } finally {
    loading.value = false
    initialLoading.value = false
  }
}

watchEffect(() => {
  fetchData()
})
</script>
