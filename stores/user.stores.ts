import { userDetails, getPersonInfo } from "../services/user.services";

export const useUserStore = defineStore('user', () => {
  const user = shallowRef({});
  const userData = useCookie<any>("userData");
  const jwt = computed(() => userData.value?.jwt);

  const logoutUser = () => {
    userData.value = "";
    user.value = {}
    navigateTo("/");
  };

  const fetchUserDetails = async () => {
    try {
      if (jwt.value) {
        const res = await userDetails();
        const person_id = res?.my_user?.local_user_view?.person.id;
        if (!person_id) return;
        const response = await getPersonInfo({ person_id });
        if (res)
          user.value = res;
        if (response)
          return response;
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const { status, data } = useLazyAsyncData("user", async () => await fetchUserDetails(), {
    deep: false,
  });

  return {
    data,
    user,
    jwt,
    status,
    logoutUser,
  };
});
