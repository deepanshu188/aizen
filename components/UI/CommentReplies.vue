<template>
  <ul>
    <li v-for="c in comments" class='border border-base-300 my-4 p-2 rounded-md'>
      <NuxtLink :to='`/user/${c?.creator?.id}`'>
        <div class='inline-flex items-center gap-x-2' role='button'>
          <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content rounded-full w-6">
              <span class='text-xs'>{{ capitalFirst(c?.creator?.name) }}</span>
            </div>
          </div>
          <p class='text-sm'>{{ c.creator.name }}</p>
        </div>
      </NuxtLink>
      <p v-if='c?.comment?.content' v-html="markdown.render(c?.comment?.content)"></p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt();

defineProps({
  comments: Array
})

</script>
