interface Configs {
  initialPayload: Record<string, any>;
  apiCall: Function;
  totalLength: number;
  listKey: string;
}

export default function useInfiniteScroll(configs: Configs) {
  const { initialPayload, apiCall, totalLength, listKey } = configs;
  const options = ref(initialPayload);
  const action = ref("");
  const nuxtApp = useNuxtApp();
  const route = useRoute();

  const { status, data }: any = useLazyAsyncData(
    listKey + route.path,
    async () => await apiCall(options.value),
    {
      deep: false,
      watch: [options.value],
      getCachedData: (key) => nuxtApp.payload.data[key],
      transform: (apiResponseChunk) => {
        const currentItems = data.value || [];
        const newItems = apiResponseChunk[listKey] || [];
        let result;
        if (action.value === "push") {
          result = [...currentItems, ...newItems];
        } else {
          result = newItems;
        }
        return result;
      },
    },
  );

  const controller = new AbortController();
  const { signal } = controller;

  onMounted(() => {
    window.addEventListener("scroll", handleScroll, { signal });
  });

  onUnmounted(() => {
    controller.abort();
  });

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = window.innerHeight;

    const bottomOfWindow = scrollTop + clientHeight >= scrollHeight - 10;

    if (
      bottomOfWindow &&
      (totalLength === undefined ||
        (data.value && data.value.length < totalLength)) &&
      status !== "pending"
    ) {
      options.value.page += 1;
      action.value = "push";
    }
  };

  return { status, data, options };
}
