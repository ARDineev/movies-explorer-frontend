import React from 'react';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';


function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = React.useState(undefined);
  const [allMoviesArr, setAllMoviesArr] = React.useState([]);
  const [moviesArr, setMoviesArr] = React.useState([]);
  const [savedMoviesArr, setSavedMoviesArr] = React.useState([]);



  React.useEffect(() => { // при загрузке приложения проверям токен в хранилище
    tokenCheck();
  }, []);

  React.useEffect(() => {
    getInitialMovies();
  }, []);

  React.useEffect(() => {
    getInitialSavedMovies();
  }, []);

  async function getInitialMovies() {
    try {
      const movies = await getMovies();
      setAllMoviesArr(movies);
    } catch (err) {
      console.log(err);
    }
  }

  async function getInitialSavedMovies() {
    try {
      const savedMovies = await mainApi.getMovies();
      setSavedMoviesArr(savedMovies);
      console.log(savedMovies);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLogin() { // логинимся и поучаем свои данные
    try {
      const userData = await mainApi.getUserInfo();
      setCurrentUser(userData);
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  async function tokenCheck() {
    // проверям токен в хранилище. Если токен валидный - сразу логинимся

    const token = localStorage.getItem('token');

    if (!token) {
      setLoggedIn(false);
      return;
    };

    if (token) {
      try {
        await handleLogin();
      } catch (err) {
        setLoggedIn(false);
        console.log(err);
      }
    }
  }

  async function handleMovieSave(currentMovie) {
    try {
      const movie = await mainApi.saveMovie({
        country: currentMovie.country,
        director: currentMovie.director,
        duration: currentMovie.duration,
        year: currentMovie.year,
        description: currentMovie.description,
        image: 'https://api.nomoreparties.co' + currentMovie.image.url,
        trailerLink: currentMovie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + currentMovie.image.formats.thumbnail.url,
        owner: currentMovie.owner,
        movieId: currentMovie.id,
        nameRU: currentMovie.nameRU,
        nameEN: currentMovie.nameEN,
      });
      setSavedMoviesArr([movie, ...savedMoviesArr]);
    } catch(err) {
      console.log(err);
    }
  }

  async function handleMovieDelete(currentMovie) {
    try {
      await mainApi.delMovie(currentMovie._id);
      setSavedMoviesArr((oldMovieList) => {
        return oldMovieList.filter(movie => movie._id !== currentMovie._id);
      });
    } catch(err) {
      console.log(err);
    }
  }

  function searchMovies(keyWord) {
    // allMoviesArr - это вообще все фильмы, что есть
    // keyword - это ключевое слово из поисковой строки
    // его отслеживаем через управляемый инпут

    const movies = [];
    allMoviesArr.forEach((movie) => {
      if (movie.nameRU.toLowerCase().includes(keyWord.toLowerCase())) {
        movies.push(movie);
      }
    });
    setMoviesArr(movies); // обновляем массив с фильмами, которые непосредственно рендерим
  }

  if (loggedIn === undefined) {
    return 'Загрузка...';
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
          <Route exact path="/movies" element={
            <ProtectedRouteElement element={Movies} isAllowed={loggedIn} redirectPath="/" loggedIn={loggedIn} moviesArr={moviesArr} onMovieSave={handleMovieSave} search={searchMovies}/>
          } />
          <Route exact path="/saved-movies" element={
            <ProtectedRouteElement element={SavedMovies} isAllowed={loggedIn} redirectPath="/" loggedIn={loggedIn} moviesArr={savedMoviesArr} onMovieDel={handleMovieDelete}/>
          } />
          <Route exact path="/profile" element={
            <ProtectedRouteElement element={Profile} isAllowed={loggedIn} redirectPath="/" handleLogOut={handleLogOut} loggedIn={loggedIn} setCurrentUser={setCurrentUser}/>
          }/>
          <Route exact path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route exact path="/signup" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
