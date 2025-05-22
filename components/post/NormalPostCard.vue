<script setup lang="ts">
import { favouritePost, vote } from "~/services/posts.services";
const emit = defineEmits(["updatePost"]);

const props = defineProps({
  data: Object,
  status: String,
});

const handleVote = async (payload: Object) => {
  const res = await vote(payload);
  emit("updatePost", res.post_view, "vote");
};

const savePost = async (payload: Object) => {
  const res = await favouritePost(payload);
  emit("updatePost", res.post_view, "save");
};

const handleViewPost = (id: number) => {
  navigateTo(`/posts/${id}`);
};

const initialLoading = computed(() => props.status === 'pending' && !props.data?.length);
</script>

<template>
  <template v-if="initialLoading" v-for="i in 5">
    <Transition name="fade">
      <Card class="flex flex-col md:mx-4 mx-2 my-6 md:p-4 p-2 rounded-md">
        <CommunityBarSkeleton />
        <PostMetaCardSkeleton />
        <InteractionSkeleton />
      </Card>
    </Transition>
  </template>
  <template v-else>
    <template v-for="{ community, post, counts, saved, my_vote } in data" :key="post.id">
      <Transition name="fade">
        <Card class="flex flex-col md:mx-4 mx-2 my-6 md:p-4 p-2 rounded-md">
          <CommunityBar :community="community" />
          <PostMetaCard :post="post" />
          <Interactions :post="post" :counts="counts" :saved="saved" :my_vote="my_vote" @vote="handleVote"
            @view-comments="handleViewPost(post.id)" @save="savePost" />
        </Card>
      </Transition>
    </template>
    <div v-if="data.length === 0"
      class="flex flex-col items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <p class="text-center text-xl">No posts found</p>
    </div>
  </template>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
