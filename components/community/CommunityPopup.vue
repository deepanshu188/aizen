<template>
  <div class='flex items-center flex-col'>
    <CommunityBar :community='c.community' showInstance />
    <div class='my-2 flex flex-col items-center' v-if='mods'>
      <p class='font-bold'>Moderator{{ mods?.length > 1 ? 's' : '' }}</p>
      <div class='flex items-center my-2'>
        <AvatarGroup v-for='m in mods' :key='m.moderator.id' :avatar='m.moderator.avatar' :name='m.moderator.name'
          :id='m.moderator.id' />
      </div>
    </div>
    <div class="text-center my-3 md:h-auto h-36 overflow-y-auto md-style" v-html="descriptionMd">
    </div>
    <button class='btn btn-outline' :class="{ 'btn-secondary': isSubscribed }" @click="handleSubscribe(c.community.id)">{{
      isSubscribed ? 'Subscribed' :
      'Subscribe'
    }}</button>
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from "markdown-it";
import { followCommunity } from "../../services/community";

const { c, mods } = defineProps(['c', 'mods'])

const markdown = new MarkdownIt();

const isSubscribed = c.subscribed === 'Subscribed'
const desc = c.community.description

const descriptionMd = desc ? markdown.render(desc) : ''

const handleSubscribe = async (community_id: Number) => {
  const res = await followCommunity({ community_id, follow: !isSubscribed })
  c.value = res.community_view
  console.log(c.value, res.community_view, 'cv')
}
</script>
