export const userLogin = async (user) => {
  const client = useApi()
  const res = await client.login(user)
  return res.jwt
}
