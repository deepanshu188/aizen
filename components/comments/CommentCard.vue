<script setup lang="ts">
const { c, comments } = defineProps(["c", "comments"]);
</script>

<template>
  <div>
    <div>
      <div class="flex justify-between items-center">
        <NuxtLink :to="`/user/${c?.creator?.id}`">
          <div class="inline-flex items-center gap-x-2" role="button">
            <Avatar
              :name="capitalFirst(c?.creator?.name)"
              :image="c?.creator?.avatar"
              :alt="c?.creator?.name"
            />
            <p class="text-sm">{{ c.creator.name }}</p>
          </div>
        </NuxtLink>
        <p class="text-sm">{{ diffDays(c.counts?.published) }}</p>
      </div>
      <p class="my-2 md-style" v-html="renderMd(c?.comment?.content)"></p>
      <Interactions
        :my_vote="c?.my_vote"
        :post="c.post"
        :counts="c.counts"
        :saved="c.saved"
        minimal
      />
    </div>
    <div class="mt-2" v-if="c.comment.children.length > 0">
      <NestedComments :data="c.comment.children" />
    </div>
  </div>
</template>
