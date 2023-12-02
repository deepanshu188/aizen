import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const data = ref({})
  const user = ref({})
  const dataLoading = false;
  const userLoading = false;

  const setPersonInfo = (res: {}) => data.value = res

  const setUserDetails = (res: {}) => user.value = res

  return { data, user, setPersonInfo, setUserDetails, dataLoading, userLoading }
})
