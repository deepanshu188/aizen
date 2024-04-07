<script setup lang="ts">
  import { addComment } from '~/services/comments';
  const comment = ref('');
  const btnStyle =
    'w-8 h-8 rounded-md border border-neutral-700 font-bold text-sm flex justify-center items-center hover:bg-neutral-700';
  const { id } = defineProps({
    placeholder: String,
    id: Number,
  });

  const addFormat = (value: string) => {
    const textarea = document.querySelector('textarea');
    comment.value += value;

    if (textarea) {
      textarea.focus();
      const len = textarea.value.length;
      textarea.setSelectionRange(len - 2, len);
      textarea.selectionEnd = len - 2;
    }
  };

  const postComment = async () => {
    try {
      const res = await addComment({
        content: comment.value,
        post_id: id,
      });
      console.log(res);
      comment.value = '';
    } catch {}
  };
</script>

<template>
  <div class="form-control w-full">
    <div class="mb-2 flex gap-1">
      <button :class="btnStyle" @click="addFormat('****')">B</button>
      <button :class="btnStyle" @click="addFormat('**')">/</button>
      <button :class="btnStyle" @click="addFormat('[label](url)')">
        <Icon name="mynaui:link-one" size="18" />
      </button>
      <button :class="btnStyle" @click="addFormat('#')">H</button>
      <button :class="btnStyle" @click="addFormat('>')">"</button>
      <button :class="btnStyle" @click="addFormat('``')">
        <Icon name="mynaui:code" size="18" />
      </button>
    </div>
    <textarea
      class="textarea textarea-bordered resize-none h-32"
      :placeholder="placeholder"
      v-model="comment"
    ></textarea>
    <button class="btn self-end mt-2" @click="postComment">
      Post
    </button>
  </div>
</template>
