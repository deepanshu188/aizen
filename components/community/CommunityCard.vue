<script setup lang="ts">
const router = useRouter();
const { c } = defineProps(["c"]);
</script>

<template>
  <div class="card bg-base-300 shadow-md m-4 p-4 h-32">
    <div class="h-full flex items-center justify-between md:flex-col">
      <div class="flex flex-col w-fit max-sm:h-full max-sm:justify-between md:gap-y-2">
        <div>
          <div class="flex items-center gap-2" role="button">
            <Avatar :image="c.community.icon" :name="c.community.name" class="cursor-pointer" @click="
              router.push(
                `/c/${c.community.name}?id=${c.community.id}`,
              )
              " />
            <p class="text-md">{{ c.community.name }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <Icon name="mynaui:users-group" />
            <span>{{ c.counts.subscribers }}</span>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="mynaui:edit-one" />
            <span>{{ c.counts.posts }}</span>
          </div>
          <div class="flex items-center gap-1">
            <Icon name="codicon:comment" />
            <span>{{ c.counts.comments }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 md:w-full">
        <div @click="$emit('openModel', c)" role="button" class="md:hidden">
          <Icon name="mynaui:chevron-up-down" />
        </div>
        <button class="btn md:h-full md:w-full bg-white text-black p-1 hover:bg-gray-200">
          {{
            c.subscribed === "Subscribed"
              ? "Subscribed"
              : "Subscribe"
          }}
        </button>
      </div>
    </div>
  </div>
</template>
