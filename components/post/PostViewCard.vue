<script setup lang="ts">
  const { data } = defineProps(['data']);

  const isAdmin = data.creator_is_admin;
  const isMod = data.creator_is_moderator;
  const toolTipText =
    isAdmin && isMod
      ? 'Admin & Mod'
      : isAdmin
      ? 'Admin'
      : isMod
      ? 'Mod'
      : '';

  const handleVote = (payload: Object) => {};

  const savePost = (payload: Object) => {};
</script>

<template>
  <section class="md:w-1/2 w-full">
    <div class="card bg-base-200 shadow-xl min-h-52 p-4">
      <div class="my-2 flex justify-between items-center">
        <CommunityBar :community="data.community" />
        <NuxtLink :to="`/user/${data.creator.id}`">
          <Tooltip :text="toolTipText">
            <div class="flex items-center gap-x-1">
              <span v-if="isAdmin || isMod"> <IShield /> </span
              ><span v-else> <IUser /> </span
              ><span>{{ data.creator.name }}</span>
            </div>
          </Tooltip>
        </NuxtLink>
      </div>
      <div class="card-body px-0">
        <a class="text-xl" :href="data.post?.url">{{
          data?.post?.name
        }}</a>
        <div
          v-if="data.post?.thumbnail_url"
          class="w-full self-center"
        >
          <div class="relative">
            <NuxtImg
              :src="data.post.thumbnail_url"
              class="w-full h-full rounded object-cover blur-3xl opacity-30"
              loading="lazy"
            />
            <NuxtImg
              :src="data.post.thumbnail_url"
              class="w-full h-full rounded object-contain top-0 absolute"
              loading="lazy"
            />
          </div>
        </div>
        <p
          class="text-neutral-400"
          v-html="renderMd(data.post?.body)"
        ></p>
        <div class="card-actions">
          <Interactions
            :post="data.post"
            :counts="data.counts"
            :saved="data.saved"
            :my_vote="data.my_vote"
            @emitVote="handleVote"
            @emitSave="savePost"
          />
        </div>
      </div>
    </div>
    <CommentReplies :data="data" />
  </section>
</template>
