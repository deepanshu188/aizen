<script setup lang="ts">
import { fetchCommunity, followCommunity } from "~/services/community.services";

const { params, query } = useRoute();
const nuxtApp = useNuxtApp();
const { $toast } = nuxtApp;

const { data } = useLoginUser();
const userData = computed(() => data.value?.user_data?.person_view);

const { data: c, status } = useLazyAsyncData(
  `community_details_${params.community}_${query.id}`,
  () =>
    fetchCommunity({
      name: params.community,
      id: query.id,
    }),
  {
    pick: ["community_view", "moderators"],
    getCachedData: (key) => nuxtApp.payload.data[key],
  },
);

const handleSubscribe = async (community_id: number, isSubscribed: boolean) => {
  if (!userData.value) {
    $toast.error("You need to login first");
    return;
  }
  const res = await followCommunity({
    community_id,
    follow: !isSubscribed,
  });
  if (!c.value) return;
  c.value = { ...c.value, community_view: res.community_view };
};
</script>

<template>
  <Modal v-if="c">
    <community-popup
      :c="c?.community_view"
      :mods="c?.moderators"
      @subscribe-community="handleSubscribe"
    ></community-popup>
  </Modal>
  <section>
    <div v-if="status === 'idle' || status === 'pending'" class="flex justify-center m-4">
      <Loader />
    </div>
    <p v-else-if="status === 'error'" class="m-4 text-center text-neutral-400">
      Couldn't load this community.
    </p>
    <div v-else-if="c" class="card bg-base-100 shadow-xl md:m-4 m-2">
      <div class="card-body items-center">
        <p class="card-title">{{ c.community_view.community.title }}</p>
        <span onclick="popup.showModal()" role="button">
          <Avatar
            :image="c.community_view.community.icon"
            :name="c.community_view.community.name"
            :size="24"
          />
        </span>
        <p>
          Subscribers:
          {{ c.community_view.counts.subscribers.toLocaleString() }}
        </p>
      </div>
    </div>
    <Posts />
  </section>
</template>
