const BASE_URL = 'https://api.movies.expl.nomoredomainsrocks.ru';

const request = async (url, options = {}) => {
  const { method, data, headers } = options;
  const fetchOptions = {};

  if (method) {
    fetchOptions.method = method;
  }

  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }

  if (headers) {
    fetchOptions.headers = headers;
  }

  const res = await fetch(`${BASE_URL + url}`, fetchOptions);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`${res.status} ${res.statusText}`);
  }
};

export const getUserInfo = () => {
  return request('/users/me', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const patchUserInfo = (email, name) => {
  return request('/users/me', {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    data: { email, name },
  });
};

export const getMovies = () => {
  return request('/movies', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const saveMovie = (movieData) => {
  return request('/movies', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    data: movieData,
  });
};

export const delMovie = (movieId) => {
  return request(`/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export const register = (email, password, name) => {
  return request('/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: { email, password, name },
  });
};

export const authorize = (email, password) => {
  return request('/signin', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: { email, password },
  });
};
