import { getPersonInfo, userDetails } from "~/services/user.services";
const USER_DATA_KEY = "logged-in-user";

export const useLoginUser = () => {
  const userData = useCookie<any>("userData");
  const jwt = computed(() => userData.value?.jwt);
  const { data } = useNuxtData(USER_DATA_KEY);

  const nuxtApp = useNuxtApp();

  const {
    status,
    refresh,
    clear,
    data: initialUserData,
  } = useLazyAsyncData(
    USER_DATA_KEY,
    async () => {
      if (jwt.value) {
        const instance_data = await userDetails();
        const person_id = instance_data?.my_user?.local_user_view?.person.id;
        if (!person_id) return;
        const user_data = await getPersonInfo({ person_id });
        return { instance_data, user_data };
      }
    },
    {
      deep: false,
      getCachedData: (key) => nuxtApp.payload.data[key],
      immediate: false,
      watch: [jwt],
    },
  );

  const logoutUser = () => {
    clear();
    userData.value = "";
    navigateTo("/");
  };

  return {
    data: initialUserData || data,
    status,
    logoutUser,
    fetchUserData: refresh,
  };
};
