export default function useInfiniteScroll(configs: Object) {
  const loading = ref(false)
  const data = ref([])
  const { options, apiCall } = configs;

  onMounted(() => {
    window.onscroll = () => {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        options.value.page += 1
      }
    }
  })

  const fetchData = async (action: string) => {
    loading.value = true;
    try {
      const res = await apiCall(options.value)
      action === 'push' ? data.value.push(...res.communities) : data.value = res.communities;
    } finally {
      loading.value = false
    }
  }

  watch(options.value, (current, prev) => {
    const action = current.page !== prev?.page ? 'push' : ''
    if (!loading.value)
      fetchData(action)
  }, { immediate: true })

  return { loading, data }
}
