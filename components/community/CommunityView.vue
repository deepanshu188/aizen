<script setup lang="ts">
import { fetchCommunity, followCommunity } from "~/services/community.services";

const { params, query } = useRoute();
const { $toast } = useNuxtApp();

const { data } = useLoginUser();
const userData = computed(() => data.value?.user_data?.person_view);

const { data: c } = await useAsyncData(
  () =>
    fetchCommunity({
      name: params.community,
      id: query.id,
    }),
  {
    pick: ["community_view", "moderators"],
  },
);

const handleSubscribe = async (community_id: Number, isSubscribed: Boolean) => {
  if (!userData.value) {
    $toast.error("You need to login first");
    return;
  }
  const res = await followCommunity({
    community_id,
    follow: !isSubscribed,
  });
  c.value = { community_view: res.community_view, moderators: res.moderators };
};
</script>

<template>
  <Modal>
    <community-popup
      :c="c.community_view"
      :mods="c.moderators"
      @subscribe-community="handleSubscribe"
    ></community-popup>
  </Modal>
  <section>
    <div class="card bg-base-100 shadow-xl md:m-4 m-2">
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
