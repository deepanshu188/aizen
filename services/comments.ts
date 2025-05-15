export const getComments = async (options: Object) => {
  try {
    const client = useApi();
    const res = await client.getComments(options);
    return res;
  }
  catch (error) {
    console.log(error);
  }
};

export const addComment = async (options: Object) => {
  const client = useApi();
  const res = await client.createComment(options);
  return res;
};
