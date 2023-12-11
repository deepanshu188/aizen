<script setup>
  const { user, loading } = defineProps(['user', 'loading']);
  const { person, counts } = user;
</script>

<template>
  <Model>
    <div class="flex flex-col items-center my-2">
      <div>
        <p>
          <span class="font-semibold">Post Count:</span>
          {{ counts.post_count }}
        </p>
        <p>
          <span class="font-semibold">Comment Count:</span>
          {{ counts.comment_count }}
        </p>
      </div>
    </div>
  </Model>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body items-center">
      <p class="card-title">
        {{ person.display_name ?? person.name }}
      </p>
      <div class="cursor-pointer" onclick="popup.showModal()">
        <Avatar
          :url="person.avatar"
          :name="person.display_name ?? person.name"
          :size="24"
          :loading="loading"
        />
      </div>
      <div class="flex flex-col items-center gap-1 my-1">
        <p class="text-center" v-if="person.bio">
          <span v-html="renderMd(person.bio)"></span>
        </p>
      </div>
    </div>
  </div>
</template>
