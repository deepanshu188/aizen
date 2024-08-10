<script setup lang="ts">
import { favouritePost, vote } from "~/services/posts";
import type { iSettings } from "../settings/Appearences.vue";
const emit = defineEmits(["updatePost"]);
const router = useRouter();

const settings = useCookie<iSettings>("settings");

defineProps({
    data: Object,
});

const handleViewPost = (id: number) => {
    router.push(`/posts/${id}`);
};

const handleVote = async (payload: Object) => {
    const res = await vote(payload);
    emit("updatePost", res.post_view, "vote");
};

const savePost = async (payload: Object) => {
    const res = await favouritePost(payload);
    emit("updatePost", res.post_view, "save");
};
</script>

<template>
    <div
        v-for="{ community, post, counts, saved, my_vote } in data"
        class="card card-side bg-base-200 shadow-xl flex flex-col md:mx-4 mx-2 my-6 md:p-4 p-2 rounded-md"
    >
        <CommunityBar :community="community" />
        <div
            class="flex items-center my-2 cursor-pointer"
            @click="handleViewPost(post.id)"
        >
            <div
                v-if="post.thumbnail_url"
                class="md:h-28 h-24 aspect-square"
                :class="{ 'blur-lg': post.nsfw && !settings.nsfw }"
            >
                <NuxtImg
                    :src="post.thumbnail_url"
                    format="webp"
                    class="w-full h-full rounded-md object-cover"
                    loading="lazy"
                    placeholder
                />
            </div>
            <div :class="{ 'card-body': post.thumbnail_url }">
                <p class="md:text-xl text-sm leading-6">{{ post.name }}</p>
            </div>
        </div>
        <Interactions
            :post="post"
            :counts="counts"
            :saved="saved"
            :my_vote="my_vote"
            @emitVote="handleVote"
            @view-comments="handleViewPost(post.id)"
            @emitSave="savePost"
        />
    </div>
</template>
