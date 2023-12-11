import { defineStore } from 'pinia'

export const useCommentStore = defineStore('comments', () => {
  const ignoreComments = ref([])

  return { ignoreComments }
})
