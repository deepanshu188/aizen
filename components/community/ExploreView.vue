<script setup lang="ts">
import sortOptions from "~/content/sortOptions";
import { listCommunities } from "~/services/community";

interface Options {
  sort: string;
  page: number;
  limit: number;
  type_: string;
  show_nsfw?: boolean;
}

const initialPayload: Options = {
  sort: "Active",
  page: 1,
  limit: 15,
  type_: "All",
  show_nsfw: false,
};

const selectTab = (value: string) => {
  options.value.type_ = value;
};

const {
  data: communities,
  options,
  loading,
} = useInfiniteScroll({
  apiCall: listCommunities,
  initialPayload,
  hasMore: true,
  listKey: "communities",
});

const initalLoading = computed(
  () => !communities.value?.length && loading.value,
);

const loadingMore = computed(
  () => communities.value?.length > 0 && loading.value,
);

const modelData = ref();

const openModel = async (item) => {
  modelData.value = item;
  await nextTick();
  const popup = document.querySelector("#popup");
  if (popup) {
    popup.showModal();
  }
};

// reset to initial state when filter changes
watch(
  () => [options.value.sort, options.value.type_, options.value.show_nsfw],
  () => {
    options.value.page = 1;
  },
  { deep: true },
);
</script>

<template>
  <Model v-if="modelData">
    <community-popup :c="modelData"></community-popup>
  </Model>
  <section>
    <div class="flex gap-2 flex-col md:flex-row justify-between items-center w-[98%] m-auto">
      <div class="flex gap-4">
        <label class="label cursor-pointer">
          <span class="label-text mr-2">Nsfw</span>
          <input type="checkbox" class="toggle toggle-sm" v-model="options.show_nsfw" />
        </label>
        <select class="select select-bordered select-sm w-full max-w-[180px]" v-model="options.sort">
          <option v-for="(option, index) in sortOptions" :key="index">
            {{ option }}
          </option>
        </select>
      </div>
      <div class="w-full md:w-auto">
        <Tabs2 :value="options.type_" @select-tab="selectTab" />
      </div>
    </div>
    <div>
      <div v-if="initalLoading" class="flex justify-center py-12">
        <Loader />
      </div>
      <div v-else-if="communities?.length === 0" class="text-center py-12">
        <div class="text-4xl mb-2">🔍</div>
        <h3 class="text-xl font-semibold mb-2">No communities found</h3>
        <p class="text-gray-500">Try adjusting your filters</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <community-card v-for="(c, index) in communities" :key="index" :c="c" @openModel="openModel"
          class="h-full"></community-card>
      </div>
      <div v-if="loadingMore" class="flex justify-center py-4 mt-4">
        <div class="flex items-center gap-2">
          <div class="loading loading-spinner loading-sm"></div>
          <span>Loading more communities...</span>
        </div>
      </div>
    </div>
  </section>
</template>
