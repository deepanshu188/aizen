<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body items-center">
      <p class="card-title">{{ user.display_name }}</p>
      <Avatar :url='user.avatar' :name='user.display_name' :size='24' />
      <p>Bio: {{ user.bio }}</p>
      <p>Matrix: {{ user.matrix_user_id }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: Object
})
</script>
