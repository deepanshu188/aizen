<script setup lang="ts">
  const emit = defineEmits(['emitVote', 'emitSave', 'viewComments']);

  defineProps({
    post: Object,
    counts: Object,
    saved: Boolean,
    my_vote: Number,
    minimal: Boolean,
  });

  const iconClass = 'w-5 h-5 cursor-pointer';

  const handleVote = (payload: Object) => {
    emit('emitVote', payload);
  };

  const savePost = (payload: Object) => {
    emit('emitSave', payload);
  };

  const viewComments = () => emit('viewComments');
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
          <IUpvote :my_vote="my_vote" :iconClass="iconClass" />
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
          <IDownvote :my_vote="my_vote" :iconClass="iconClass" />
        </span>
      </div>
      <div class="flex items-center gap-1" v-if="!minimal">
        <span @click="viewComments">
          <IComment :iconClass="iconClass" />
        </span>
        <p>{{ counts?.comments ?? counts?.child_count }}</p>
      </div>
      <div class="flex items-center gap-1" v-if="!minimal">
        <span>
          <IClock :iconClass="iconClass" />
        </span>
        <p>{{ diffDays(counts?.published) }}</p>
      </div>
    </div>
    <div>
      <span @click="savePost({ post_id: post.id, save: !saved })">
        <IBookmark :saved="saved" :iconClass="iconClass" />
      </span>
    </div>
  </div>
</template>
