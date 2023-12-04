<template>
  <section class="md:w-1/2 w-full">
    <div class="card  bg-base-200 shadow-xl min-h-52 p-4">
      <div class="my-2 flex justify-between items-center">
        <CommunityBar :community='data.community' />
        <NuxtLink :to='`/user/${data.creator.id}`'>
          <div class="flex items-center gap-x-1">
            <IUser /><span>{{ data.creator.name }}</span>
          </div>
        </NuxtLink>
      </div>
      <div class="card-body px-0">
        <a class="text-xl" :href='data.post?.url'>{{ data?.post?.name }}</a>
        <div v-if='data.post?.thumbnail_url' class="w-full self-center">
          <div class='relative'>
            <NuxtImg :src='data.post.thumbnail_url' alt="image"
              class="w-full h-full rounded object-cover blur-3xl opacity-30" loading="lazy" />
            <NuxtImg :src='data.post.thumbnail_url' alt="image"
              class="w-full h-full rounded object-contain top-0 absolute" loading="lazy" />
          </div>
        </div>
        <p class='text-neutral-400' v-html='body'></p>
        <div class="card-actions">
          <Interactions :post='data.post' :counts='data.counts' :saved='data.saved' :my_vote='data.my_vote'
            @emitVote='handleVote' @emitSave='savePost' />
        </div>
      </div>
    </div>
    <CommentReplies :data='data' />
  </section>
</template>

<script setup lang="ts">
import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt();

const { data } = defineProps(['data'])

const body = data.post?.body ? markdown.render(data.post?.body) : ''


const handleVote = (payload: Object) => {
}

const savePost = (payload: Object) => {
}
</script>
