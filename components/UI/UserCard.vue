<script setup>
const { user } = defineProps(["user"]);
const person = computed(() => user?.person);
const counts = computed(() => user?.counts);

import { renderMd } from "@/utils/markdown";
import { useClipboard } from "@vueuse/core";
const { text, copy, copied } = useClipboard({
  source: person?.name,
});
</script>

<template>
  <Modal>
    <div class="p-4 max-w-md" v-if="person">
      <div class="flex items-center gap-4 mb-4">
        <Avatar :image="person.avatar" :name="person.display_name ?? person.name" :size="36" />
        <h3 class="text-xl font-bold">
          {{ person.display_name ?? person.name }}
        </h3>
      </div>

      <div class="my-4" v-if="person.bio">
        <h4 class="font-medium text-sm text-gray-500 mb-2">Bio</h4>
        <div class="prose" v-html="renderMd(person.bio)"></div>
      </div>

      <div class="grid grid-cols-2 gap-4 my-4" v-if="counts">
        <div class="stat bg-base-200 rounded-lg p-3">
          <div class="stat-title text-xs">Posts</div>
          <div class="stat-value text-2xl">
            {{ counts.post_count }}
          </div>
        </div>
        <div class="stat bg-base-200 rounded-lg p-3">
          <div class="stat-title text-xs">Comments</div>
          <div class="stat-value text-2xl">
            {{ counts.comment_count }}
          </div>
        </div>
      </div>
    </div>
  </Modal>

  <div class="card bg-base-100 shadow-xl rounded-md my-2 ">
    <div class="card-body items-center" v-if="!person">
      <div class=" skeleton h-4 w-20"></div>
      <div class="cursor-pointer" onclick="popup.showModal()">
        <div class="skeleton h-12 w-12 shrink-0 rounded-full"></div>
      </div>
      <div class="flex items-center">
        <div class="skeleton h-4 w-20"></div>
        <div class="skeleton h-4 w-4 shrink-0 rounded-md"></div>
      </div>
    </div>
    <template v-else>
      <div class="card-body items-center" v-if="person">
        <p class="card-title">
          {{ person?.display_name ?? person?.name }}
        </p>
        <div class="cursor-pointer" onclick="popup.showModal()">
          <Avatar :image="person?.avatar" :name="person?.display_name ?? person?.name" :size="24" />
        </div>
        <div class="flex items-center">
          <p class="text-xs text-gray-400 mt-1 mr-1">
            @{{ person?.name }}
          </p>
          <Icon name="lucide:clipboard-copy" class="cursor-pointer" size="14" @click="copy(person?.name)" />
        </div>
      </div>
    </template>
  </div>
</template>
