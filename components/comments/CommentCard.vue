<script setup lang="ts">
  import { getChildComments, type iData } from './comment';
  import { useCommentStore } from '@/stores/comments';
  const { ignoreComments } = useCommentStore();

  const { c, comments } = defineProps(['c', 'comments']);

  const isChildren = getChildComments(comments, c);

  const commentId = c.comment.id; // this comment id
  const childrenIds =
    isChildren?.map((i: iData) => i.comment.id) ?? []; // all the nested children id's

  const allIds: Set<number> = new Set(childrenIds);

  ignoreComments.push(...allIds);
</script>

<template>
  <div>
    <div>
      <div class="flex justify-between items-center">
        <NuxtLink :to="`/user/${c?.creator?.id}`">
          <div class="inline-flex items-center gap-x-2" role="button">
            <div class="avatar placeholder">
              <div
                class="bg-neutral text-neutral-content rounded-full w-6"
              >
                <span class="text-xs">{{
                  capitalFirst(c?.creator?.name)
                }}</span>
              </div>
            </div>
            <p class="text-sm">{{ c.creator.name }}</p>
          </div>
        </NuxtLink>
        <p class="text-sm">{{ diffDays(c.counts?.published) }}</p>
      </div>
      <p
        class="my-2 md-style"
        v-html="renderMd(c?.comment?.content)"
      ></p>
      <Interactions
        :my_vote="c?.my_vote"
        :post="c.post"
        :counts="c.counts"
        :saved="c.saved"
        minimal
      />
    </div>
    <div class="mt-2" v-if="c.counts.child_count">
      <NestedComments :data="isChildren" />
    </div>
  </div>
</template>
