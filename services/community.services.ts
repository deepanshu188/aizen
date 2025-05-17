export const fetchCommunity = async (options?: Object) => {
  const client = useApi();
  const res = await client.getCommunity(options);
  return res;
};

export const followCommunity = async (options: Object) => {
  const client = useApi();
  const res = await client.followCommunity(options);
  return res;
};

export const listCommunities = async (options?: Object) => {
  const client = useApi();
  const res = await client.listCommunities(options);
  return res;
};
