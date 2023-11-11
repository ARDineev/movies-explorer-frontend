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
  const [moviesArr, setMoviesArr] = React.useState(JSON.parse(localStorage.getItem('searchedMovies')) || []); // отфильтрованные фильмы
  const [savedMoviesArr, setSavedMoviesArr] = React.useState([]); // сохраненные фильмы для рендера
  const [allSavedMoviesArr, setAllSavedMoviesArr] = React.useState([]); // все сохраненные фильмы --------------------------------------------------------
  const [isMainApiErr, setMainApiErr] = React.useState(undefined); // ошибка при получении данных с основного бэкэнда
  const [isMoviesApiErr, setMoviesApiErr] = React.useState(undefined); // ошибка при получении данных с сервера beatfilm-movies



  React.useEffect(() => { // при загрузке приложения проверям токен в хранилище
    tokenCheck();
  }, []);


  React.useEffect(() => {
    if (loggedIn) {
      getInitialSavedMovies();
    }
  }, [loggedIn]);


  async function getInitialSavedMovies() {
    try {
      const savedMovies = await mainApi.getMovies();
      setSavedMoviesArr(savedMovies);
      setAllSavedMoviesArr(savedMovies); //
      setMainApiErr(false);
      return savedMovies;
    } catch (err) {
      console.log(err);
      setMainApiErr(true);
    }
  }

  async function getInitialMovies() {
    // функция запрашивает все фильмы с сервера beatfilm-movies

    try {
      const movies = await getMovies();
      setMoviesApiErr(false);
      return movies;
    } catch (err) {
      console.log(err);
      setMoviesApiErr(true);
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
    localStorage.removeItem('allMovies');
    localStorage.removeItem('filter');
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('keyWord');
    setMoviesArr([]);
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


  function checkMovieSave(currentMovie) {

    const res = allSavedMoviesArr.some((movie) => {
      return (movie.movieId === currentMovie.id)
    })

    return res;
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
      //    setSavedMoviesArr([movie, ...savedMoviesArr]);
      setAllSavedMoviesArr([movie, ...allSavedMoviesArr]);

    } catch (err) {
      console.log(err);
    }
  }

  async function handleMovieDelete(currentMovie) {
    console.log(currentMovie._id);
    if (!currentMovie.movieId) { // поле movieId есть только у объектов saved-movies
      for (let i = 0; i < allSavedMoviesArr.length; i++) {
        if (allSavedMoviesArr[i].movieId === currentMovie.id) {
          currentMovie._id = allSavedMoviesArr[i]._id
          break;
        }
      }
    }
    try {
      await mainApi.delMovie(currentMovie._id);
      setSavedMoviesArr((oldMovieList) => {
        return oldMovieList.filter(movie => movie._id !== currentMovie._id);
      });
      setAllSavedMoviesArr((oldMovieList) => {
        return oldMovieList.filter(movie => movie._id !== currentMovie._id);
      });
    } catch (err) {
      console.log(err);
    }
  }

  function searchMovies(moviesArr, keyWord, filter) {
    // allMoviesArr - это вообще все фильмы, что есть
    // keyword - это ключевое слово из поисковой строки
    // его отслеживаем через управляемый инпут

    const movies = [];

    moviesArr.forEach((movie) => {
      if (
        movie.nameRU.toLowerCase().includes(keyWord.toLowerCase())
        || movie.nameEN.toLowerCase().includes(keyWord.toLowerCase())
      ) {
        if (filter && (movie.duration < 40)) {
          movies.push(movie);
        }
        if (!filter) {
          movies.push(movie);
        }
      }
    });
    return movies;
  }

  if ((loggedIn === undefined) || (isMainApiErr === undefined)) {
    return 'Загрузка...';
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
          <Route exact path="/movies" element={
            <ProtectedRouteElement
              element={Movies}
              isAllowed={loggedIn}
              redirectPath="/"
              loggedIn={loggedIn}
              moviesArr={moviesArr}
              onMovieSave={handleMovieSave}
              onMovieDel={handleMovieDelete}
              searchMovies={searchMovies}
              setMoviesArr={setMoviesArr}
              isApiErr={isMoviesApiErr}
              getInitialMovies={getInitialMovies}
              checkMovieSave={checkMovieSave}
              isMainApiErr={isMainApiErr}
            />
          } />
          <Route exact path="/saved-movies" element={
            <ProtectedRouteElement
              element={SavedMovies}
              isAllowed={loggedIn}
              redirectPath="/"
              loggedIn={loggedIn}
              moviesArr={savedMoviesArr}
              onMovieDel={handleMovieDelete}
              searchMovies={searchMovies}
              setMoviesArr={setSavedMoviesArr}
              allSavedMoviesArr={allSavedMoviesArr}
              isApiErr={isMainApiErr}
            />
          } />
          <Route exact path="/profile" element={
            <ProtectedRouteElement element={Profile} isAllowed={loggedIn} redirectPath="/" handleLogOut={handleLogOut} loggedIn={loggedIn} setCurrentUser={setCurrentUser} />
          } />
          <Route exact path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route exact path="/signup" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
