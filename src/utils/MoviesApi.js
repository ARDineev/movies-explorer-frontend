const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getMovies = async () => {
  const res = await fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`${res.status} ${res.statusText}`);
  }
};
