<script setup lang="ts">
const router = useRouter();

const props = defineProps({
  community: Object,
  showInstance: Boolean,
});
</script>

<template>
  <span class="cursor-pointer inline-flex items-center gap-2 my-2"
    @click="router.push(`/c/${community?.name}?id=${community?.id}`)">
    <Avatar :name="community?.title" :image="community?.icon" />
    <div>
      <p>{{ community?.title }}</p>
      <p v-if="showInstance" class="text-sm text-neutral-400">
        {{ community?.actor_id }}
      </p>
    </div>
  </span>
</template>
