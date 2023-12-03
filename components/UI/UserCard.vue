<template>
  <Model>
    <div class="flex flex-col items-center my-2">
      <div>
        <p><span class="font-semibold">Post Count:</span> {{ counts.post_count }}</p>
        <p><span class="font-semibold">Comment Count:</span> {{ counts.comment_count }}</p>
      </div>
    </div>
  </Model>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body items-center">
      <p class="card-title">{{ person.display_name ?? person.name }}</p>
      <div class="cursor-pointer" onclick='popup.showModal()'>
        <Avatar :url='person.avatar' :name='person.display_name ?? person.name' :size='24' :loading='loading' />
      </div>
      <div class="flex flex-col items-center gap-1 my-1">
        <p class="text-center" v-if="bio"><span v-html='bio'></span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import MarkdownIt from "markdown-it";
const { user, loading } = defineProps(['user', 'loading'])
const { person, counts } = user

const markdown = new MarkdownIt();

const bio = person.bio ? markdown.render(person.bio) : ''
</script>
