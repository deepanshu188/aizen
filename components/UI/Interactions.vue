<script setup lang="ts">
const emit = defineEmits(["vote", "save", "viewComments"]);

defineProps({
  post: Object,
  counts: Object,
  saved: Boolean,
  my_vote: Number,
  minimal: Boolean,
});

const handleVote = (payload: Object) => {
  emit("vote", payload);
};

const savePost = (payload: Object) => {
  emit("save", payload);
};

const viewComments = () => emit("viewComments");

const iconProps = { size: "20", class: "cursor-pointer" };
</script>

<template>
  <div class="flex gap-2 justify-between items-center w-full">
    <div class="flex gap-2">
      <div class="flex items-center gap-1">
        <Icon name="mynaui:arrow-up" :="iconProps" :class="my_vote === 1 ? 'text-accent' : 'text-secondary'" @click="
          handleVote({
            post_id: post?.id,
            score: my_vote !== 1 ? 1 : 0,
          })
          " />
        <p>{{ counts?.upvotes }}</p>
        <Icon name="mynaui:arrow-down" :="iconProps" :class="my_vote === -1 ? 'text-error' : 'text-secondary'" @click="
          handleVote({
            post_id: post.id,
            score: my_vote !== -1 ? -1 : 0,
          })
          " />
      </div>
      <template v-if="!minimal">
        <div class="flex items-center gap-1">
          <Icon name="mynaui:message" :="iconProps" @click="viewComments" />
          <p>{{ counts?.comments ?? counts?.child_count }}</p>
        </div>
        <div class="flex items-center gap-1">
          <Icon name="mynaui:clock-four" :="iconProps" />
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
