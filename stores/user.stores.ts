import { userDetails, getPersonInfo } from "../services/user.services";

export const useUserStore = defineStore('user', () => {
  const data = shallowRef({});
  const user = shallowRef({});
  const isLoading = ref(false);
  const userData = useCookie<any>("userData");
  const jwt = computed(() => userData.value?.jwt);

  const logoutUser = () => {
    userData.value = "";
    data.value = {}
    user.value = {}
    navigateTo("/");
  };

  const fetchUserDetails = async () => {
    isLoading.value = true;
    try {
      if (jwt.value) {
        const res = await userDetails();
        const person_id = res?.my_user?.local_user_view?.person.id;
        if (!person_id) return;
        const response = await getPersonInfo({ person_id });
        if (res)
          user.value = res;
        if (response)
          data.value = response;
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      isLoading.value = false;
    }
  }

  return {
    data,
    user,
    jwt,
    isLoading,
    logoutUser,
    fetchUserDetails
  };
});
