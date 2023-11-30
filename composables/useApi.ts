import { LemmyHttp } from 'lemmy-js-client';

export default function useApi() {
  const token = useCookie('token')
  const jwt = token.value
  const options = {
    headers: jwt
      ? {
        Authorization: `Bearer ${jwt}`,
      }
      : undefined
  };
  let baseUrl = 'https://lemmy.ml';
  let client = new LemmyHttp(baseUrl, options)
  return client
}
