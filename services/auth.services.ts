interface iUserLogin {
  username_or_email: string;
  password: string;
}

export const userLogin = async (user: iUserLogin) => {
  const client = useApi();
  const res = await client.login(user);
  return res.jwt;
};
