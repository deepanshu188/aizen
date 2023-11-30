<template>
  <div v-for="{ community, post } in data" class="card card-side bg-base-100 shadow-xl flex flex-col m-2 p-2">
    <div class="flex items-center gap-2 my-2">
      <Avatar :name='community.title' :url='community.icon' />
      <p>{{ community.title }}</p>
    </div>
    <div class="flex items-center">
      <NuxtImg v-if='post.thumbnail_url' :src="post.thumbnail_url" class="md:w-28 md:h-28 w-16 h-16 object-contain"
        alt="thumbnail" />
      <div class="card-body">
        <h2 class='md:text-xl'>{{ post.name }}</h2>
      </div>
    </div>
  </div>
  <span v-if='loading' class="loading loading-ring loading-lg"></span>
</template>

<script setup>
defineProps({
  data: Object,
  loading: Boolean
})
</script>
