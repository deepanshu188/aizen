export const getComments = async (options: Object) => {
  const client = useApi();
  const res = await client.getComments(options);
  return res;
};

export const addComment = async (options: Object) => {
  const client = useApi();
  const res = await client.createComment(options);
  return res;
};
