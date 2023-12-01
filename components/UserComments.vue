<template>
  <ul>
    <li v-for='{ comment, creator } in comments'>
      <div class="card shadow-xl">
        <div class="card-body">
          <div>
            <p>{{ creator.display_name }}</p>
            <Avatar :url='creator.avatar' :name='creator.display_name' :size='8' />
          </div>
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const user = useUserStore();
const comments = user.data.comments
</script>
