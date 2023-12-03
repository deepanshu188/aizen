<template>
  <Model>
    <div class='flex items-center flex-col'>
      <CommunityBar :community='c.community' showInstance />
      <div class='my-2 flex flex-col items-center'>
        <p class='font-bold'>Moderator{{ mods?.length > 1 ? 's' : '' }}</p>
        <div class='flex items-center my-2'>
          <AvatarGroup v-for='m in mods' :key='m.moderator.id' :avatar='m.moderator.avatar' :name='m.moderator.name'
            :id='m.moderator.id' />
        </div>
      </div>
      <div class="text-center my-3 md:h-auto h-36 overflow-y-auto" v-html="descriptionMd">
      </div>
      <button class='btn btn-outline' :class="{ 'btn-secondary': isSubscribed }">{{ isSubscribed ? 'Subscribed' :
        'Subscribe'
      }}</button>
    </div>
  </Model>
  <section>
    <div class="card bg-base-100 shadow-xl md:m-4 m-2">
      <div class="card-body items-center">
        <p class="card-title">{{ c.community.title }}</p>
        <span onclick='popup.showModal()' role="button">
          <Avatar :url='c.community.icon' :name='c.community.name' :size="24" />
        </span>
        <p>Subscribers: {{ c.counts.subscribers.toLocaleString() }}</p>
      </div>
    </div>
    <Posts />
  </section>
</template>

<script setup lang="js">
import MarkdownIt from "markdown-it";
import { fetchCommunity } from '../services/community'

const markdown = new MarkdownIt();
const c = ref()
const mods = ref()
const { params, query } = useRoute()

if (query.id) {
  const res = await fetchCommunity({ name: params.community, id: query.id })
  c.value = res.community_view
  mods.value = res.moderators
}

const isSubscribed = c.value.subscribed === 'Subscribed'
const desc = c.value.community.description

const descriptionMd = desc ? markdown.render(desc) : ''
</script>
