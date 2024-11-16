<script setup lang="ts">
  import {
    fetchCommunity,
    followCommunity,
  } from '~/services/community';

  const c = ref();
  const mods = ref();
  const { params, query } = useRoute();

  if (query.id) {
    const res = await fetchCommunity({
      name: params.community,
      id: query.id,
    });
    c.value = res.community_view;
    mods.value = res.moderators;
  }

  const handleSubscribe = async (
    community_id: Number,
    isSubscribed: Boolean
  ) => {
    const res = await followCommunity({
      community_id,
      follow: !isSubscribed,
    });
    c.value = res.community_view;
  };
</script>

<template>
  <Model>
    <community-popup
      :c="c"
      :mods="mods"
      @subscribe-community="handleSubscribe"
    ></community-popup>
  </Model>
  <section>
    <div class="card bg-base-100 shadow-xl md:m-4 m-2">
      <div class="card-body items-center">
        <p class="card-title">{{ c.community.title }}</p>
        <span onclick="popup.showModal()" role="button">
          <Avatar
            :image="c.community.icon"
            :name="c.community.name"
            :size="24"
          />
        </span>
        <p>
          Subscribers: {{ c.counts.subscribers.toLocaleString() }}
        </p>
      </div>
    </div>
    <Posts />
  </section>
</template>
