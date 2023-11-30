<template>
  <section class='p-4 m-3'>
    <select class="select select-bordered w-full max-w-xs" v-model="options.ListingType">
      <option disabled selected>Sort</option>
      <option>All</option>
      <option>Local</option>
      <option>Subscribed</option>
    </select>
    <NormalPostCard :data='data' />
    <span v-if='loading' class="loading loading-ring loading-lg"></span>
  </section>
</template>

<script setup>
import { fetchPosts } from '../services/posts';

const loading = ref(false)
const options = ref({ ListingType: 'All', limit: 50, page: 1 })
const data = ref()

onMounted(() => {
  window.onscroll = () => {
    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
    if (bottomOfWindow) {
      loading.value = true;
      options.value.page += 1;
      window.scrollTo(0, 0)
    }
  }
})

const fetchData = async () => {
  try {
    const res = await fetchPosts(options.value)
    data.value = res.posts
  } finally {
    loading.value = false
  }
}

watch(() => {
  fetchData()
})
</script>
