import ValidationError from '../helpers/ValidationError';
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
      Authorization: 'Bearer ' + auth?.accessToken,
    },
    options.headers,
  );
  const init = Object.assign(fetchOptions, { headers });

  const response = await fetch(url, init);
  const result = await response.json();

  if (response.status === 200 || response.status === 201) {
    return result;
  }

  if (response.status === 400) {
    throw new ValidationError(result.message, result.data);
  }

  if (response.status === 401 && auth?.refreshToken) {
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

      const response = await fetch(url, init);
      return await response.json();
    }
  }

  if (response.status === 404) {
    throw new Error(result.message);
  }

  if (response.status === 409) {
    const data = await response.json();
    throw new Error(data.message);
  }

  throw new Error('Unknown error');
};

export default api;
