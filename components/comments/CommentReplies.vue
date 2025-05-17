<script setup lang="ts">
import sortOptions from "~/content/commentSortOptions.json";
import { getComments } from "~/services/comments.services";
import { buildCommentTree } from "./comment";

const { data } = defineProps({
  data: Object,
});

const initialPayload = {
  post_id: data.post.id,
  community_id: data.community.id,
  sort: "Hot",
  page: 1,
  max_depth: 6,
};

const {
  data: comments,
  status,
  options,
} = useInfiniteScroll({
  apiCall: getComments,
  initialPayload,
  listKey: "comments",
  totalLength: 0,
});

const treeComments = computed(() => {
  return buildCommentTree(comments.value);
});

const loading = computed(() => status.value === "pending");
</script>

<template>
  <section>
    <div class="mt-4">
      <div class="flex justify-between items-center m-2">
        <p>
          <b>{{ data.counts.comments }}</b> comments
        </p>
        <select class="select select-bordered w-max" v-model="options.sort">
          <option v-for="(o, i) in sortOptions" :key="i">
            {{ o }}
          </option>
        </select>
      </div>
      <div class="flex justify-center mx-2">
        <Editor placeholder="type comment..." :id="data.post.id" />
      </div>
    </div>
    <ul>
      <template v-for="c in treeComments">
        <li class="bg-base-200 shadow-lg my-4 p-3 rounded-md">
          <LazyCommentCard :c="c" :comments="treeComments" />
        </li>
      </template>
    </ul>
    <p v-if="!loading && !comments.length" class="text-center text-gray-400 my-4">
      No Comments to see
    </p>
    <p v-if="!loading && comments.length" class="text-center text-gray-400 text-sm my-4">
      No more comments
    </p>
    <div class="flex justify-center" v-if="loading">
      <Loader />
    </div>
  </section>
</template>
