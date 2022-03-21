import { API_URL } from './config';

const update = async (user) => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth'));

    const response = await fetch(`${API_URL}/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + auth.token,
      },
      body: JSON.stringify(user),
    });

    if (response.status === 201) {
      const data = await response.json();
      return { ...data };
    }

    if (response.status === 404) {
      const data = await response.json();
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOne = async (id) => {
  try {
    const auth = JSON.parse(localStorage.getItem('auth'));

    const response = await fetch(`${API_URL}/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + auth.token,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return { ...data };
    }

    if (response.status === 404) {
      const data = await response.json();
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  update,
  getOne,
};
