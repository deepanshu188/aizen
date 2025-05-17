<script setup lang="ts">
import { favouritePost, vote } from "~/services/posts.services";
import { useImage } from "@vueuse/core";
const { data } = defineProps(["data"]);

const isAdmin = data.creator_is_admin;
const isMod = data.creator_is_moderator;
const toolTipText =
  isAdmin && isMod ? "Admin & Mod" : isAdmin ? "Admin" : isMod ? "Mod" : "";

const handleVote = async (payload: Object) => {
  const res = await vote(payload);
  // todo : update the UI
};

const savePost = async (payload: Object) => {
  const res = await favouritePost(payload);
  // todo : update the UI
};

const { error: thumbnailError } = useImage({ src: data.post?.thumbnail_url });
</script>

<template>
  <section class="md:w-3/4 w-full mx-4">
    <div class="card bg-base-200 shadow-xl min-h-52 p-4">
      <div class="my-2 flex justify-between items-center">
        <CommunityBar :community="data.community" />
        <NuxtLink :to="`/user/${data.creator.id}`">
          <Tooltip :text="toolTipText">
            <div class="flex items-center gap-x-1">
              <template v-if="isAdmin || isMod">
                <Icon name="mynaui:shield-check" color="#32cc00" />
              </template>
              <template v-else>
                <Icon name="mynaui:user-circle" />
              </template>
              <span>{{ data.creator.name }}</span>
            </div>
          </Tooltip>
        </NuxtLink>
      </div>
      <div class="card-body px-0">
        <a class="text-xl" :href="data.post?.url">{{ data?.post?.name }}</a>
        <div v-if="data.post?.thumbnail_url && !thumbnailError" class="w-full self-center">
          <div class="relative">
            <NuxtImg :src="data.post.thumbnail_url" class="w-full h-full rounded object-cover blur-3xl opacity-30"
              loading="lazy" />
            <NuxtImg :src="data.post.thumbnail_url" class="w-full h-full rounded object-contain top-0 absolute"
              loading="lazy" placeholder />
          </div>
        </div>
        <p class="text-neutral-400 md-style" v-html="renderMd(data.post?.body)"></p>
        <div class="card-actions">
          <Interactions :post="data.post" :counts="data.counts" :saved="data.saved" :my_vote="data.my_vote"
            @vote="handleVote" @save="savePost" />
        </div>
      </div>
    </div>
    <CommentReplies :data="data" />
  </section>
</template>
