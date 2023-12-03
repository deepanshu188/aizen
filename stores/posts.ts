import { defineStore } from 'pinia'

export const usePostsStore = defineStore('post list', () => {
  const defaultOptions = { type_: 'All', sort: 'Active', limit: 30, page: 1 }
  const options = ref(defaultOptions)

  const setOptions = (res: {}) => {
    options.value = { ...options.value, ...res }
  }

  const setDefaultOptions = () => options.value = defaultOptions

  return { options, setOptions, setDefaultOptions }
})
