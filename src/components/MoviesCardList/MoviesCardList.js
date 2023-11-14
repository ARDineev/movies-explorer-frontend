import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import {
  ALL_MOVIES_KEY,
  IMG_PRE_LINK,
  MOVIES_PATH,
  SAVED_MOVIES_PATH,
  WIDE_WINDOW_WIDTH,
  SMALL_WINDOW_WIDTH,
  WIDE_WINDOW_CARDS_NUM,
  MIDDLE_WINDOW_CARDS_NUM,
  SMALL_WINDOW_CARDS_NUM,
  WIDE_WINDOW_MORE_NUM,
  SMALL_WINDOW_MORE_NUM
} from '../../utils/constants';

function MoviesCardList({ moviesArr, setMoviesArr, onMovieSave, onMovieDel, isApiErr, checkMovieSave, allSavedMoviesArr }) {
  /* Логика работы согласно ТЗ:
  Ширина 1280px — 4 ряда карточек. Кнопка «Ещё» загружает дополнительный ряд карточек.
  Ширина 768px — 4 ряда карточек. Кнопка «Ещё» загружает дополнительный ряд карточек.
  Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки. */

  // текущая страница
  const href = window.location.href;
  // стейт-переменная с текущей шириной экрана
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  // счетчик, участвует в логике дорисовки карточек
  const counter = React.useRef();

  // стейт-переменная с массивом карточек для рендера
  const [moviesForRender, setMoviesForRender] = React.useState( // карточки для рендера: начальные для /movies и все для /saved-movies
    href.includes(MOVIES_PATH) ? getInitialMoviesForRender() : allSavedMoviesArr
  );

  const [isSearchBegin, setSearchBegin] = React.useState( // начинал ли пользователь поиск? Актуально для страницы /movies
    Boolean(JSON.parse(localStorage.getItem(ALL_MOVIES_KEY)))
  );

  React.useEffect(() => {
    // вешаем слушатель изменения размера экрана,
    // убираем слушатель при размонтировании компонента
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  React.useEffect(() => {
    setSearchBegin(Boolean(JSON.parse(localStorage.getItem(ALL_MOVIES_KEY)))); // если в хранилище есть фильмы, значит пользователь уже искал их
  }, [Boolean(JSON.parse(localStorage.getItem(ALL_MOVIES_KEY)))]);

  React.useEffect(() => {
    if (href.includes(MOVIES_PATH)) { // если страница /movies, то отрисовываем начальные карточки
      const movies = getInitialMoviesForRender();
      setMoviesForRender(movies);
    }
    if (href.includes(SAVED_MOVIES_PATH)) { // если страница /saved-movies, то отрисовываем все карточки
      setMoviesForRender(moviesArr)
    }
  }, [moviesArr]);

  React.useEffect(() => { // при уходе с /saved-movies и возвращении на нее - массив для рендера перезаписывается, и он снова содержит все карточки
    if (href.includes(SAVED_MOVIES_PATH)) {
      setMoviesArr(allSavedMoviesArr);
    }
  }, [window.location.href]);

  React.useEffect(() => { // если страница /movies и изменилась ширина экрана, то заново отрисовываем начальные карточки
    if (href.includes(MOVIES_PATH)) {
      const movies = getInitialMoviesForRender();
      setMoviesForRender(movies);
    }
  }, [windowWidth]);

  function getInitialMoviesForRender() {
    // функция задает стартовые карточки для отрисовки - в зависимости от ширины экрана
    counter.current = 0; // обнуление счетчика
    let initialNumMov; // сколько карточек отрисовывается первоначально
    if (windowWidth >= WIDE_WINDOW_WIDTH) {
      initialNumMov = WIDE_WINDOW_CARDS_NUM;
    } else if (windowWidth < SMALL_WINDOW_WIDTH) {
      initialNumMov = SMALL_WINDOW_CARDS_NUM;
    } else {
      initialNumMov = MIDDLE_WINDOW_CARDS_NUM;
    }
    const movies = moviesArr.slice(0, initialNumMov);
    return movies;
  }

  function handleMoreClick() {
    let addNumMovies; // сколько карточек дорисовываем при клике на кнопку
    if (windowWidth >= WIDE_WINDOW_WIDTH) {
      addNumMovies = WIDE_WINDOW_MORE_NUM;
    } else {
      addNumMovies = SMALL_WINDOW_MORE_NUM;
    }
    counter.current = moviesForRender.length;
    setMoviesForRender([...moviesForRender, ...moviesArr.slice(counter.current, counter.current + addNumMovies)]);
  }

  return (
    <section className="movies-card-list">
      {((href.includes(MOVIES_PATH) && isSearchBegin)
        || href.includes(SAVED_MOVIES_PATH))
        && (moviesForRender.length > 0)
        && (<ul className="movies-card-list__container">
          {moviesForRender.map((movie) => (
            <MoviesCard
              imgLink={movie.image.url ? IMG_PRE_LINK + movie.image.url : movie.image}
              movieName={movie.nameRU}
              duration={movie.duration}
              onMovieSave={onMovieSave}
              onMovieDel={onMovieDel}
              trailerLink={movie.trailerLink}
              movie={movie}
              key={href.includes(MOVIES_PATH) ? movie.id : movie._id} // выбор ключа зависит от того, на какой мы странице
              checkMovieSave={checkMovieSave}
            />
          ))}
        </ul>)}
      {href.includes(MOVIES_PATH) && !isSearchBegin && !isApiErr && (
        <Preloader />
      )}

      <p className={`movies-card-list__not-found ${((href.includes(MOVIES_PATH) && isSearchBegin) // страница /movies и была попытка поиска
        || href.includes(SAVED_MOVIES_PATH)) // или страница /saved-movies
        && !isApiErr // сервер не вернул ошибку и длина массива карточек = 0
        && (moviesForRender.length === 0) && "movies-card-list__not-found_visible"}
        `}>Ничего не найдено</p>

      <p className={`movies-card-list__not-found ${isApiErr && "movies-card-list__not-found_visible"}
        `}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>

      {href.includes(MOVIES_PATH)
        && (moviesForRender.length < moviesArr.length)
        && (<button className="movies-card-list__btn" onClick={handleMoreClick}>Ещё</button>)}

    </section>
  )
}

export default MoviesCardList;
