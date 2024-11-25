<script setup lang="ts">
const { c, mods } = defineProps(["c", "mods"]);
const emit = defineEmits(["subscribe-community"]);

const isSubscribed = computed(() => c.subscribed === "Subscribed");

const handleSubscribe = () => {
  emit("subscribe-community", c.community.id, isSubscribed.value);
};
</script>

<template>
  <div class="flex items-center flex-col">
    <CommunityBar :community="c.community" showInstance />
    <div class="my-2 flex flex-col items-center" v-if="mods">
      <p class="font-bold">Moderator{{ mods?.length > 1 ? "s" : "" }}</p>
      <div class="flex items-center my-2">
        <AvatarGroup
          v-for="{ moderator: m } in mods"
          :key="m.id"
          :avatar="m.avatar"
          :name="m.name"
          :id="m.id"
        />
      </div>
    </div>
    <div
      class="text-center my-3 md:h-auto h-36 overflow-y-auto md-style"
      v-html="renderMd(c.community.description)"
    ></div>
    <button
      class="btn btn-outline"
      :class="{ 'btn-secondary': isSubscribed }"
      @click="handleSubscribe"
    >
      {{ isSubscribed ? "Subscribed" : "Subscribe" }}
    </button>
  </div>
</template>
