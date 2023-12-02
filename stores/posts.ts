import { defineStore } from 'pinia'

export const usePostsStore = defineStore('post list', () => {
  const options = ref({ ListingType: 'All', SortType: 'Active', limit: 30, page: 1 })

  const setOptions = (res: {}) => {
    options.value = { ...options.value, ...res }
  }

  return { options, setOptions }
})
