export const userDetails = async () => {
  try {
    const client = useApi();
    const res = await client.getSite();
    return res;
  }
  catch (error) {
    console.log(error);
  }
};

export const getPersonInfo = async (options: Object) => {
  try {
    const client = useApi();
    const res = await client.getPersonDetails(options);
    return res;
  }
  catch (error) {
    console.log(error);
  }
};
