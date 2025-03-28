export default function useInfiniteScroll(configs: Object) {
  const { initialPayload, apiCall, totalLength, listKey } = configs;
  const options = ref(initialPayload);
  const loading = ref(false);
  const data = ref(null);
  const action = ref('');

  const controller = new AbortController();
  const { signal } = controller;

  onMounted(() => {
    window.addEventListener("scroll", handleScroll, { signal });
  });

  onUnmounted(() => {
    controller.abort();
  });

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = window.innerHeight;

    const bottomOfWindow = scrollTop + clientHeight >= scrollHeight - 10;

    if (bottomOfWindow && (totalLength === undefined || data.value.length < totalLength)) {
      options.value.page += 1;
      action.value = 'push';
    }
  };

  const fetchData = async () => {
    loading.value = true;
    try {
      const res = await apiCall(options.value);
      if (!data.value) data.value = [];
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
