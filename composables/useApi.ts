import { LemmyHttp } from 'lemmy-js-client';

export default function useApi() {
  const userData = useCookie('userData').value;
  const jwt = userData?.jwt;
  const baseUrl = userData?.instance || 'https://lemmy.ml';

  const options = {
    headers: jwt
      ? {
          Authorization: `Bearer ${jwt}`,
        }
      : undefined,
  };
  const client = new LemmyHttp(baseUrl, options);
  return client;
}
