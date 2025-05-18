<script setup lang="ts">
import { favouritePost, vote } from "~/services/posts.services";
const emit = defineEmits(["updatePost"]);

defineProps({
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
</script>

<template>
  <div v-if="status === 'pending'" class="skeleton min-h-48  rounded-md md:mx-4 mx-2 my-6 md:p-4 p-2" v-for="i in 5">
  </div>
  <div v-else v-for="{ community, post, counts, saved, my_vote } in data"
    class="card card-side bg-base-200 shadow-xl flex flex-col md:mx-4 mx-2 my-6 md:p-4 p-2 rounded-md">
    <CommunityBar :community="community" />
    <PostMetaCard :post="post" />
    <Interactions :post="post" :counts="counts" :saved="saved" :my_vote="my_vote" @vote="handleVote"
      @view-comments="handleViewPost(post.id)" @save="savePost" />
  </div>
</template>
