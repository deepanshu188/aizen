import { userDetails, getPersonInfo } from "../services/user";

export const useUserStore = defineStore('user', () => {
  const data = ref({});
  const user = ref({});
  const dataLoading = false;
  const userLoading = false;
  const userData = useCookie<any>("userData");
  const jwt = computed(() => userData.value?.jwt);

  const logoutUser = () => {
    userData.value = "";
    data.value = {}
    user.value = {}
    navigateTo("/");
  };

  const fetchUserDetails = async () => {
    if (jwt.value) {
      const res = await userDetails();
      const person_id = res?.my_user?.local_user_view?.person.id;
      const response = await getPersonInfo({ person_id });
      user.value = res;
      data.value = response;
    }
  }

  return {
    data,
    user,
    jwt,
    dataLoading,
    userLoading,
    logoutUser,
    fetchUserDetails
  };
});
