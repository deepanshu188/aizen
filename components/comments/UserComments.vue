<script setup lang="ts">
const props = defineProps(["comments"]);

const comments = props.comments;
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
          <p class="my-2 md-style">{{ comment.content }}</p>
          <Interactions :counts="counts" :saved="saved" />
        </div>
      </div>
    </li>
  </ul>
</template>
