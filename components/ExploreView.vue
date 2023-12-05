<template>
  <section>
    <div class="flex gap-2 flex-col md:flex-row justify-between items-center w-[98%] m-auto">
      <div class='flex gap-4'>
        <label class="label cursor-pointer">
          <span class="label-text mr-2">Nsfw</span>
          <input type="checkbox" class="checkbox" v-model="options.show_nsfw" />
        </label>
        <select class="select select-bordered max-w-xs md:ml-4 md:self-start" v-model="options.sort">
          <option v-for="(option, index) in sortOptions" :key='index'>{{ option }}</option>
        </select>
      </div>
      <span>
        <Tabs2 />
      </span>
    </div>
    <div>
      <template v-for='c in communities'>
        <community-card :c='c'></community-card>
      </template>
      <div class='flex justify-center'>
        <span class="loading loading-ring loading-lg"></span>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import sortOptions from '~/content/sortOptions'
import { listCommunities } from '../services/community'

const initialPayload = { sort: 'Active', page: 1, limit: 15, _type: 'All' }

const { data: communities, options } = useInfiniteScroll({ apiCall: listCommunities, initialPayload, hasMore: true, listKey: 'communities' })

</script>
