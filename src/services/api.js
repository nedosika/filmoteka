import { API_URL } from './config.js';

const api = async (input, init) => {
  const response = await fetch(`${API_URL}/${input}`, init);

  if (response.status === 401) {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    if (response.status === 200) {
      const { data } = await response.json();
      localStorage.setItem('auth', JSON.stringify(data));

      return await fetch(`${API_URL}/${input}`, {
        ...init,
        headers: {
          ...init.headers,
          Authorization: 'Bearer ' + data.token,
        },
      });
    }

    if (response.status === 400 || response.status === 403) {
      const data = await response.json();
      throw new Error(data.status);
    }

    return response;
  }

  if (response.status === 400 || response.status === 403) {
    const data = await response.json();
    throw new Error(data.status);
  }

  return response;
};

export default api;
