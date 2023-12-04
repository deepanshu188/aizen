<template>
  <div>
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
    <p class="my-2 md-style" v-if='c?.comment?.content' v-html="markdown.render(c?.comment?.content)"></p>
    <Interactions :my_vote='c?.my_vote' :post='c.post' :counts='c.counts' :saved='c.saved' />
    <div v-if='c.counts.child_count && !child' class="mt-2">
      <NestedComments :data='c' />
    </div>
  </div>
</template>

<script setup lang="ts">

import MarkdownIt from "markdown-it";

const markdown = new MarkdownIt();

const { c, child } = defineProps(['c', 'child'])
</script>
