<template>
  <section class='flex flex-col items-center'>
    <select class="select select-bordered w-full max-w-xs md:ml-4 self-start" v-model="options.ListingType"
      v-if='!params.community'>
      <option disabled selected>Sort</option>
      <option>All</option>
      <option>Local</option>
      <option>Subscribed</option>
    </select>
    <div class='md:p-4 md:m-3 m-auto'>
      <NormalPostCard :data='data' :loading='loading' />
    </div>
  </section>
</template>

<script setup>
import { fetchPosts } from '../services/posts';
const { params } = useRoute()

const loading = ref(false)
const options = ref({ ListingType: 'All', limit: 50, page: 1, 'community_name': params.community })
const data = ref([])

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
    data.value.push(...res.posts)
  } finally {
    loading.value = false
  }
}

watchEffect(() => {
  fetchData()
})
</script>
