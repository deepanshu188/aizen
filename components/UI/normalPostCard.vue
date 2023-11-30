<template>
  <div v-for="{ community, post } in data" class="card card-side bg-base-100 shadow-xl flex flex-col m-2 p-2">
    <div class="flex items-center gap-2 my-2">
      <Avatar :name='community.title' :url='community.icon' />
      <p>{{ community.title }}</p>
    </div>
    <div class="flex">
      <figure v-if='post.thumbnail_url'>
        <NuxtImg :src="post.thumbnail_url" class="w-28 h-28" alt="thumbnail" />
      </figure>
      <div class="card-body">
        <h2 class='text-xl'>{{ post.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: Object
})
</script>
