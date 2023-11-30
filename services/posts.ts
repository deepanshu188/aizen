export const fetchPosts = async (options: any) => {
  const client = useApi()
  const res = await client.getPosts(options)
  return res
}
