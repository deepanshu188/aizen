<script setup lang="ts">
  const router = useRouter();
  const { c } = defineProps(['c']);
</script>

<template>
  <Model>
    <community-popup :c="c"></community-popup>
  </Model>
  <div class="card bg-base-300 shadow-md m-4 p-4 h-32">
    <div class="h-full flex items-center justify-between">
      <div class="h-full flex flex-col justify-between gap-y-4 w-fit">
        <div>
          <div
            class="flex items-center gap-2"
            @click="
              router.push(
                `c/${c.community.name}?id=${c.community.id}`
              )
            "
            role="button"
          >
            <Avatar
              :image="c.community.icon"
              :name="c.community.name"
            />
            <p class="text-lg">{{ c.community.name }}</p>
          </div>
          <p class="text-neutral-400 hidden md:block">
            {{ c.community.actor_id }}
          </p>
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
            <Icon name="mynaui:chat-dots" />
            <span>{{ c.counts.comments }}</span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <div onclick="popup.showModal()" role="button">
          <Icon name="mynaui:chevron-up-down" />
        </div>
        <button class="btn">
          {{
            c.subscribed === 'Subscribed' ? 'Subscribed' : 'Subscribe'
          }}
        </button>
      </div>
    </div>
  </div>
</template>
