export default function useInfiniteScroll(configs: Object) {
  const { initialPayload, apiCall, totalLength, listKey } = configs;
  const options = ref(initialPayload);
  const loading = ref(false);
  const data = ref([]);
  const action = ref('');

  onMounted(() => {
    window.onscroll = () => {
      let bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        if (
          totalLength > data.value.length ||
          totalLength === undefined
        ) {
          options.value.page += 1;
          action.value = 'push';
        }
      }
    };
  });

  const fetchData = async () => {
    loading.value = true;
    try {
      const res = await apiCall(options.value);
      action.value === 'push'
        ? data.value.push(...res[listKey])
        : (data.value = res[listKey]);
    } finally {
      loading.value = false;
      action.value = '';
    }
  };

  watch(
    options.value,
    () => {
      if (!loading.value) fetchData();
    },
    { immediate: true }
  );

  return { loading, data, options };
}
