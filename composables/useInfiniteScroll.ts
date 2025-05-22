interface Configs {
  initalPayload: Record<string, any>;
  apiCall: Function;
  totalLength: number;
  listKey: string;
}

export default function useInfiniteScroll(configs: Configs) {
  const { initialPayload, apiCall, totalLength, listKey } = configs;
  const options = ref(initialPayload);
  const data = ref<unknown[] | null>(null);
  const action = ref('');
  const nuxtApp = useNuxtApp();

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

    if (bottomOfWindow && (totalLength === undefined || data.value && data.value.length < totalLength)) {
      options.value.page += 1;
      action.value = 'push';
    }
  };

  const route = useRoute();

  const { status } = useLazyAsyncData(listKey + route.path, async () => await apiCall(options.value), {
    deep: false,
    watch: [options.value],
    getCachedData: (key) => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
    transform: (value) => {
      try {
        if (!data.value) data.value = [];
        action.value === 'push'
          ? data.value.push(...value[listKey])
          : (data.value = value[listKey]);
      } finally {
        action.value = '';
      }
      return value;
    },
  });

  return { status, data, options };
}
