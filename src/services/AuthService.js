import { API_URL } from './config';

const signIn = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status === 200) {
    const data = await response.json();
    return { ...data };
  }

  if (response.status === 400) {
    const data = await response.json();
    throw new Error(data.message);
  }
};

const signUp = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.status === 201) {
    const data = await response.json();
    return { ...data };
  }
  if (response.status === 409) {
    const data = await response.json();
    throw new Error(data.message);
  }
  if (response.status === 400) {
    const data = await response.json();
    throw new Error(data.message);
  }
};

const checkAuth = async (token) => {
  const response = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ token }),
  });
  if (response.status === 200) {
    const data = await response.json();
    return { ...data };
  }

  if (response.status === 400) {
    const data = await response.json();
    throw new Error(data.message);
  }
};

export const AuthService = {
  signIn,
  signUp,
  checkAuth,
};
