<template>
  <ul>
    <li v-for='{ comment, creator } in comments'>
      <div class="card shadow-xl">
        <div class="card-body">
          <div>
            <p>{{ creator.display_name }}</p>
            <Avatar :url='creator.avatar' :name='creator.display_name ?? creator.name' />
          </div>
          <p>{{ comment.content }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const props = defineProps(['comments'])

const user = useUserStore();
const comments = props.comments ?? user?.data?.comments
</script>
