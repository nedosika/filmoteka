import { API_ROUTES } from './config.js';

const api = async (input, init, params) => {
  const url = new URL(input);

  params && Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  const auth = JSON.parse(localStorage.getItem('auth'));

  const response = await fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer ' + auth.accessToken,
    },
  });

  if (response.status === 401) {
    const auth = JSON.parse(localStorage.getItem('auth'));

    if (auth?.refreshToken) {
      const response = await fetch(API_ROUTES.auth.refresh, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ refreshToken: auth?.refreshToken }),
      });

      if (response.status === 200) {
        const { data } = await response.json();
        localStorage.setItem('auth', JSON.stringify(data));

        return await fetch(input, {
          ...init,
          headers: {
            ...init.headers,
            Authorization: 'Bearer ' + data?.accessToken,
          },
        });
      }

      if (response.status === 403) {
        const data = await response.json();
        throw new Error(data.status);
      }
    }

    return response;
  }

  if (response.status === 403) {
    const data = await response.json();
    throw new Error(data.status);
  }

  return response;
};

export default api;
