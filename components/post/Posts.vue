<script setup lang="ts">
import sortOptions from "~/content/sortOptions";
import { fetchPosts } from "~/services/posts";
const { query } = useRoute();
const props = defineProps(["savedOnly", "filters"]);
import { useOnline } from "@vueuse/core";
const isOnline = useOnline();

const { sortOption } = useSettings();

const initialPayload = {
  type_: "All",
  sort: sortOption,
  limit: 30,
  page: 1,
  community_id: query.id,
  saved_only: props.savedOnly,
};

const {
  data: posts,
  options,
  status,
} = useInfiniteScroll({
  apiCall: fetchPosts,
  initialPayload,
  hasMore: true,
  listKey: "posts",
});

const initalLoading = computed(
  () => !posts.value?.length && status.value === "pending",
);

const selectTab = (value: string) => {
  options.value.type_ = value;
};

//* update the post UI after btn click
const updatePostData = (updatedPostValue: any, type: string) => {
  const id = updatedPostValue.post.id;
  const updatedPosts = posts.value.map((item: any) => {
    if (item.post.id === id) {
      return updatedPostValue;
    } else return item;
  });
  posts.value = updatedPosts;
};
</script>

<template>
  <section class="flex flex-col items-center overflow-x-hidden mt-8">
    <div
      class="flex gap-2 flex-col-reverse md:flex-row justify-between items-center w-[98%]"
    >
      <select
        class="select select-bordered max-w-xs md:ml-4 md:self-start"
        v-model="options.sort"
      >
        <option v-for="(option, index) in sortOptions" :key="index">
          {{ option }}
        </option>
      </select>
      <span v-if="props.filters">
        <Tabs2 :value="options.type_" @select-tab="selectTab" />
      </span>
    </div>
    <div class="md:p-4 md:m-3 m-auto w-full" v-if="isOnline">
      <template v-if="posts">
        <NormalPostCard v-if="posts.length" :data="posts" />
        <div
          v-else
          class="flex flex-col items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <p class="text-center text-xl">No posts found</p>
        </div>
      </template>
      <div
        class="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2"
        v-if="initalLoading"
      >
        <Loader />
      </div>
    </div>
    <Offline v-else />
  </section>
</template>
