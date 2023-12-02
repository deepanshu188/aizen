<template>
  <div>
    <span class="cursor-pointer inline-flex items-center gap-2 my-2"
      @click="router.push(`/c/${community.name}?id=${community.id}`)">
      <Avatar :name='community.title' :url='community.icon' />
      <p>{{ community.title }}</p>
    </span>
  </div>
</template>


<script setup lang="ts">
const router = useRouter()

defineProps({
  community: Object
})
</script>
