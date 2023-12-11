<script setup lang="ts">
  import sortOptions from '~/content/sortOptions';
  import { listCommunities } from '~/services/community';

  const selectTab = (value: string) => {
    options.value.type_ = value;
  };

  const initialPayload = {
    sort: 'Active',
    page: 1,
    limit: 15,
    type_: 'All',
  };

  const {
    data: communities,
    options,
    loading,
  } = useInfiniteScroll({
    apiCall: listCommunities,
    initialPayload,
    hasMore: true,
    listKey: 'communities',
  });

  const initalLoading = computed(
    () => !communities.value.length && loading.value
  );
</script>

<template>
  <section>
    <div
      class="flex gap-2 flex-col md:flex-row justify-between items-center w-[98%] m-auto"
    >
      <div class="flex gap-4">
        <label class="label cursor-pointer">
          <span class="label-text mr-2">Nsfw</span>
          <input
            type="checkbox"
            class="checkbox"
            v-model="options.show_nsfw"
          />
        </label>
        <select
          class="select select-bordered max-w-xs md:ml-4 md:self-start"
          v-model="options.sort"
        >
          <option v-for="(option, index) in sortOptions" :key="index">
            {{ option }}
          </option>
        </select>
      </div>
      <span>
        <Tabs2 :value="options.type_" @select-tab="selectTab" />
      </span>
    </div>
    <div>
      <template v-for="c in communities">
        <community-card :c="c"></community-card>
      </template>
      <div class="flex h-[80vh] justify-center" v-if="initalLoading">
        <Loader />
      </div>
    </div>
  </section>
</template>
