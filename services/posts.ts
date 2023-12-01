export const fetchPosts = async (options: any) => {
  const client = useApi()
  const res = await client.getPosts(options)
  return res
}

export const favouritePost = async (options: any) => {
  const client = useApi()
  const res = await client.savePost(options)
  return res
}

export const vote = async (options: any) => {
  const client = useApi()
  const res = await client.likePost(options)
  return res
}
