export const API_URL = 'https://radiant-badlands-09970.herokuapp.com/api';
//export const API_URL = 'http://localhost:5000/api';

export const API_ROUTES = {
  films: `${API_URL}/films`,
  auth: {
    signin: `${API_URL}/auth/signin`,
    signup: `${API_URL}/auth/signup`,
    refresh: `${API_URL}/auth/refresh`,
  },
  favorites: `${API_URL}/favorites`,
};
