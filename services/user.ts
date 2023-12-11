export const userDetails = async () => {
  const client = useApi();
  const res = await client.getSite();
  return res;
};

export const getPersonInfo = async (options: Object) => {
  const client = useApi();
  const res = await client.getPersonDetails(options);
  return res;
};
