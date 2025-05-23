export const fetchPosts = async (options: any) => {
  try {
    const client = useApi();
    const res = await client.getPosts(options);
    return res;
  }
  catch (error) {
    console.log(error);
  }
};

export const fetchPost = async (options: any) => {
  const client = useApi();
  const res = await client.getPost(options);
  return res;
};

export const favouritePost = async (options: any) => {
  const client = useApi();
  const res = await client.savePost(options);
  return res;
};

export const vote = async (options: any) => {
  const client = useApi();
  const res = await client.likePost(options);
  return res;
};
