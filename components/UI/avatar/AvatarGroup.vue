<template>
  <div class="avatar-group -space-x-6 rtl:space-x-reverse">
    <NuxtLink :to='`/user/${id}`'>
      <div class="lg:tooltip" :data-tip="name">
        <Avatar :name='name' :url='avatar' />
      </div>
    </NuxtLink>
  </div>
</template>


<script setup lang='ts'>

defineProps({
  id: Number,
  name: String,
  avatar: String
})

</script>
