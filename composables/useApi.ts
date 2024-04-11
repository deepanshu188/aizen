import { LemmyHttp } from 'lemmy-js-client';

export default function useApi() {
  const userData = useCookie('userData').value;
  const jwt = userData?.jwt;
  const slug = userData?.instance || 'lemmy.ml';
  const baseUrl = 'https://' + slug

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
