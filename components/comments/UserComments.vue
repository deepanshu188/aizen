<script setup lang="ts">
  import { useUserStore } from '@/stores/user';
  import type { iUser } from './comment';
  const props = defineProps(['comments']);

  const user: iUser = useUserStore();
  const comments = props.comments ?? user?.data?.comments;
  console.log(comments, 'cmts');
</script>

<template>
  <ul>
    <li v-for="{ comment, creator, counts, saved } in comments">
      <div class="card shadow-xl">
        <div class="card-body">
          <div>
            <p>{{ creator.display_name }}</p>
            <Avatar
              :image="creator.avatar"
              :name="creator.display_name ?? creator.name"
            />
          </div>
          <p>{{ comment.content }}</p>
          <Interactions :counts="counts" :saved="saved" />
        </div>
      </div>
    </li>
  </ul>
</template>
