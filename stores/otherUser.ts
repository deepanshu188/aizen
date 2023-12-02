import { defineStore } from 'pinia'

export const useOtherUserStore = defineStore('other user', () => {
  const data = ref({})
  const loading = ref(false)

  const setPersonInfo = (res: {}) => data.value = res
  const clearPersonInfo = () => data.value = {}

  return { data, setPersonInfo, clearPersonInfo, loading }
})
