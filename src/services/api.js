import { API_ROUTES } from './config.js';

const api = async (input, options = {}) => {
  const url = new URL(input);
  const queryParams = options.queryParams || {};
  Object.keys(queryParams).forEach((key) => url.searchParams.append(key, queryParams[key]));
  const fetchOptions = Object.assign({ method: 'GET' }, options.fetchOptions);
  const auth = JSON.parse(localStorage.getItem('auth'));
  const headers = Object.assign(
    {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + auth.accessToken,
    },
    options.headers,
  );
  const init = Object.assign(fetchOptions, { headers });

  console.log(init);

  const response = await fetch(url, init);

  if (response.status === 401) {
    if (auth?.refreshToken) {
      const response = await fetch(API_ROUTES.auth.refresh, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'x-auth-refresh-token': auth.refreshToken,
        },
      });

      if (response.status === 200) {
        const { data } = await response.json();
        localStorage.setItem('auth', JSON.stringify(data));

        return await fetch(url, init);
      }
    }
  }

  return response;
};

export default api;
