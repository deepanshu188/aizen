<script setup lang="ts">
  const emit = defineEmits(['emitVote', 'emitSave', 'viewComments']);

  defineProps({
    post: Object,
    counts: Object,
    saved: Boolean,
    my_vote: Number,
    minimal: Boolean,
  });

  const handleVote = (payload: Object) => {
    emit('emitVote', payload);
  };

  const savePost = (payload: Object) => {
    emit('emitSave', payload);
  };

  const viewComments = () => emit('viewComments');

  const iconProps = { size: '18', class: 'cursor-pointer' }
</script>

<template>
  <div class="flex gap-2 justify-between items-center w-full">
    <div class="flex gap-2">
      <div class="flex items-center gap-1">
        <span
          @click="
            handleVote({
              post_id: post?.id,
              score: my_vote !== 1 ? 1 : 0,
            })
          "
        >
          <Icon name="mynaui:arrow-up" :="iconProps" :class="my_vote === 1 ? 'text-accent' : 'text-secondary'" />
        </span>
        <p>{{ counts?.upvotes }}</p>
        <span
          @click="
            handleVote({
              post_id: post.id,
              score: my_vote !== -1 ? -1 : 0,
            })
          "
        >
          <Icon name="mynaui:arrow-down" :="iconProps" :class="my_vote === -1 ? 'text-error' : 'text-secondary'" />
        </span>
      </div>
      <template v-if="!minimal">
        <div class="flex items-center gap-1">
        <span @click="viewComments">
          <Icon name="mynaui:message" :="iconProps" />
        </span>
        <p>{{ counts?.comments ?? counts?.child_count }}</p>
      </div>
      <div class="flex items-center gap-1">
        <span>
          <Icon name="mynaui:clock-four" :="iconProps" />
        </span>
        <p>{{ diffDays(counts?.published) }}</p>
      </div>
      </template>
    </div>
    <div>
      <span @click="savePost({ post_id: post.id, save: !saved })">
        <IBookmark :saved="saved" class="w-5 h-5 cursor-pointer" />
      </span>
    </div>
  </div>
</template>
