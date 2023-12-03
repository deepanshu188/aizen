import { defineStore } from 'pinia'

export const usePostsStore = defineStore('post list', () => {
  const options = ref({ type_: 'All', sort: 'Active', limit: 30, page: 1 })

  const setOptions = (res: {}) => {
    options.value = { ...options.value, ...res }
  }

  return { options, setOptions }
})
