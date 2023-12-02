<template>
  <section>
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body items-center">
        <p class="card-title">{{ c.community.title }}</p>
        <Avatar :url='c.community.icon' :name='c.community.name' :size="24" />
        <p>Subscribers: {{ c.counts.subscribers.toLocaleString() }}</p>
        <div class="text-center" v-html="descriptionMd">
        </div>
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
const { params, query } = useRoute()

if (query.id) {
  const res = await fetchCommunity({ name: params.community, id: query.id })
  c.value = res.community_view
}

const desc = c.value.community.description

const descriptionMd = desc ? markdown.render(desc) : ''
</script>
