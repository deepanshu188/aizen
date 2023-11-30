export const fetchCommunity = async (options: Object) => {
  const client = useApi()
  const res = await client.getCommunity(options)
  return res
}
