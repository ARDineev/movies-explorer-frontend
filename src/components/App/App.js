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
import Preloader from '../Preloader/Preloader';
import {
  SHORT_MOVIE_TIME,
  TOKEN_KEY,
  ALL_MOVIES_KEY,
  FILTER_KEY,
  SEARCHED_MOVIES_KEY,
  KEYWORD_KEY,
  IMG_PRE_LINK,
  MAIN_PATH,
  MOVIES_PATH,
  SAVED_MOVIES_PATH,
  PROFILE_PATH,
  SIGNIN_PATH,
  SIGNUP_PATH,
  ANY_PATH,
} from '../../utils/constants';


function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = React.useState(undefined); // залогинен ли пользователь. Undefined - чтобы избежать лишних "прыжков" по страницам
  const [moviesArr, setMoviesArr] = React.useState(JSON.parse(localStorage.getItem(SEARCHED_MOVIES_KEY)) || []); // отфильтрованные фильмы /movies
  const [savedMoviesArr, setSavedMoviesArr] = React.useState([]); // отфильтрованные сохраненные фильмы для рендера /saved-movies
  const [allSavedMoviesArr, setAllSavedMoviesArr] = React.useState([]); // все сохраненные фильмы
  const [isMainApiErr, setMainApiErr] = React.useState(undefined); // ошибка при получении данных с основного бэкэнда. После запроса примет значение true или false
  const [isMoviesApiErr, setMoviesApiErr] = React.useState(undefined); // ошибка при получении данных с сервера beatfilm-movies

  React.useEffect(() => { // при загрузке приложения проверям токен в хранилище
    tokenCheck();
  }, []);

  React.useEffect(() => { // после того, как залогинились, подгружаем сохраненные фильмы
    if (loggedIn) {
      getInitialSavedMovies();
    }
  }, [loggedIn]);

  async function getInitialSavedMovies() {
    try {
      const savedMovies = await mainApi.getMovies();
      setSavedMoviesArr(savedMovies); // изначально фильтр для сохраненных фильмов не выставлен
      setAllSavedMoviesArr(savedMovies); // поэтому savedMoviesArr и allSavedMoviesArr совпадают
      setMainApiErr(false); // сервер ответил без ошибки
      return savedMovies;
    } catch (err) {
      console.log(err);
      setMainApiErr(true); // ошибка на сервере, данные не получены
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
      return true;
    } catch (err) {
      console.log(err);
      setLoggedIn(false);
      return false;
    }
  }

  function handleLogOut() {
    // разлогиниваемся и чистим localStorage
    setLoggedIn(false);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ALL_MOVIES_KEY);
    localStorage.removeItem(FILTER_KEY);
    localStorage.removeItem(SEARCHED_MOVIES_KEY);
    localStorage.removeItem(KEYWORD_KEY);
    setMoviesArr([]);
    navigate(MAIN_PATH, { replace: true });
  };

  async function tokenCheck() {
    // проверям токен в хранилище. Если токен валидный - сразу логинимся
    const token = localStorage.getItem(TOKEN_KEY);
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
    // функция проверяет, сохранен ли данный фильм на странице /movies
    // у пользователя на основном бэкэнде
    const res = allSavedMoviesArr.some((movie) => {
      return (movie.movieId === currentMovie.id)
    })
    return res;
  }

  async function handleMovieSave(currentMovie) {
    // сохранение фильма с /movies на основной бэкэнд
    try {
      const movie = await mainApi.saveMovie({
        country: currentMovie.country,
        director: currentMovie.director,
        duration: currentMovie.duration,
        year: currentMovie.year,
        description: currentMovie.description,
        image: IMG_PRE_LINK + currentMovie.image.url,
        trailerLink: currentMovie.trailerLink,
        thumbnail: IMG_PRE_LINK + currentMovie.image.formats.thumbnail.url,
        owner: currentMovie.owner,
        movieId: currentMovie.id,
        nameRU: currentMovie.nameRU,
        nameEN: currentMovie.nameEN,
      });
      setAllSavedMoviesArr([movie, ...allSavedMoviesArr]); // пополняем массив всех сохраненных фильмов
      return true
    } catch (err) {
      console.log(err);
      return false
    }
  }

  async function handleMovieDelete(currentMovie) {
    // функция удаления фильма с основного бэкэнда
    if (!currentMovie.movieId) { // поле movieId есть только у объектов фильмов с /saved-movies
      // соответственно, по данному циклу пройдет фильм только при клике со страницы /movies
      for (let i = 0; i < allSavedMoviesArr.length; i++) {
        if (allSavedMoviesArr[i].movieId === currentMovie.id) {
          currentMovie._id = allSavedMoviesArr[i]._id // объект фильма /movies дополняется необходимым для удаления полем _id
          break;
        }
      }
    }
    // далее, общий блок. Через него удаляются фильмы при клике с любой страницы
    try {

      await mainApi.delMovie(currentMovie._id);
      setSavedMoviesArr((oldMovieList) => {
        return oldMovieList.filter(movie => movie._id !== currentMovie._id);
      });
   //   console.log(savedMoviesArr);
      setAllSavedMoviesArr((oldMovieList) => {
        return oldMovieList.filter(movie => movie._id !== currentMovie._id);
      });
      return true
    } catch (err) {
      console.log(err);
      return false
    }
  }

  function searchMovies(moviesArr, keyWord, filter) {
    // функция возвращает отфильтрованный массив фильмов
    // moviesArr - исходный массив фильмов
    // keyword - это ключевое слово из поисковой строки
    // filter - положение чек-бокса короткометражек
    const movies = [];
    moviesArr.forEach((movie) => {
      if (
        movie.nameRU.toLowerCase().includes(keyWord.toLowerCase())
        || movie.nameEN.toLowerCase().includes(keyWord.toLowerCase())
      ) {
        if (filter && (movie.duration < SHORT_MOVIE_TIME)) {
          movies.push(movie);
        }
        if (!filter) {
          movies.push(movie);
        }
      }
    });
    return movies;
  }

  if ((loggedIn === undefined) || ((isMainApiErr === undefined) && loggedIn)) {
    return <div className="app__preloader-container"><Preloader /></div>; // экран загрузки при получении данных (залогинен ли, ответил ли основной бэкэнд)
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route exact path={MAIN_PATH} element={<Main loggedIn={loggedIn} />} />
          <Route exact path={MOVIES_PATH} element={
            <ProtectedRouteElement
              element={Movies}
              isAllowed={loggedIn}
              redirectPath={MAIN_PATH}
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
          <Route exact path={SAVED_MOVIES_PATH} element={
            <ProtectedRouteElement
              element={SavedMovies}
              isAllowed={loggedIn}
              redirectPath={MAIN_PATH}
              loggedIn={loggedIn}
              moviesArr={savedMoviesArr}
              onMovieDel={handleMovieDelete}
              searchMovies={searchMovies}
              setMoviesArr={setSavedMoviesArr}
              allSavedMoviesArr={allSavedMoviesArr}
              isApiErr={isMainApiErr}
            />
          } />
          <Route exact path={PROFILE_PATH} element={
            <ProtectedRouteElement element={Profile} isAllowed={loggedIn} redirectPath={MAIN_PATH} handleLogOut={handleLogOut} loggedIn={loggedIn} setCurrentUser={setCurrentUser} />
          } />
          <Route exact path={SIGNIN_PATH} element={
            <ProtectedRouteElement element={Login} isAllowed={!loggedIn} redirectPath={MAIN_PATH} handleLogin={handleLogin} />} />
          <Route exact path={SIGNUP_PATH} element={
            <ProtectedRouteElement element={Register} isAllowed={!loggedIn} redirectPath={MAIN_PATH} handleLogin={handleLogin} />} />
          <Route path={ANY_PATH} element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
