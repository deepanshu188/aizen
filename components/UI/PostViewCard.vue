<template>
  <section class="md:w-1/2 w-full">
    <div class="card  bg-base-200 shadow-xl min-h-52 p-4">
      <div class="my-2 flex justify-between">
        <CommunityBar :community='data.community' />
        <NuxtLink :to='`/user/${data.creator.id}`'>
          <div class="flex items-center gap-x-1">
            <IUser /><span>{{ data.creator.name }}</span>
          </div>
        </NuxtLink>
      </div>
      <div v-if='data.post?.thumbnail_url' class="h-72 w-full aspect-square self-center">
        <NuxtImg :src='data.post.thumbnail_url' alt="image" class="w-full h-full rounded object-cover" />
      </div>
      <div class="card-body">
        <a class="text-xl" :href='data.post?.url'>{{ data?.post?.name }}</a>
        <p>{{ data.post?.body }}</p>
        <p>{{ data.post?.embed_description }}</p>
        <div class="card-actions">

          <Interactions :post='data.post' :counts='data.counts' :saved='data.saved' :my_vote='data.my_vote'
            @emitVote='handleVote' @emitSave='savePost' />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

defineProps({
  data: Object
})

const handleVote = (payload: Object) => {
}

const savePost = (payload: Object) => {
}
</script>
