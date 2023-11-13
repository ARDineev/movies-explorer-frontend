import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';


function MoviesCardList({ moviesArr, onMovieSave, onMovieDel, isApiErr, checkMovieSave, allSavedMoviesArr }) {
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
    href.includes('/movies') ? getInitialMoviesForRender() : allSavedMoviesArr
  );

  const [isSearchBegin, setSearchBegin] = React.useState( // начинал ли пользователь поиск? Актуально для страницы /movies
    Boolean(JSON.parse(localStorage.getItem('allMovies')))
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
    setSearchBegin(Boolean(JSON.parse(localStorage.getItem('allMovies')))); // если в хранилище есть фильмы, значит пользователь уже искал их
  }, [Boolean(JSON.parse(localStorage.getItem('allMovies')))]);

  React.useEffect(() => {
    if (href.includes('/movies')) { // если страница /movies, то отрисовываем начальные карточки
      const movies = getInitialMoviesForRender();
      setMoviesForRender(movies);
    }
    if (href.includes('/saved-movies')) { // если страница /saved-movies, то отрисовываем все карточки
      setMoviesForRender(moviesArr)
    }
  }, [moviesArr]);

  React.useEffect(() => { // при уходе с /saved-movies и возвращении на нее - массив для рендера перезаписывается, и он снова содержит все карточки
    if (href.includes('/saved-movies')) {
      setMoviesForRender(allSavedMoviesArr);
    }
  }, [window.location.href]);

  React.useEffect(() => { // если страница /movies и изменилась ширина экрана, то заново отрисовываем начальные карточки
    if (href.includes('/movies')) {
      const movies = getInitialMoviesForRender();
      setMoviesForRender(movies);
    }
  }, [windowWidth]);

  function getInitialMoviesForRender() {
    // функция задает стартовые карточки для отрисовки - в зависимости от ширины экрана
    counter.current = 0; // обнуление счетчика
    let initialNumMov; // сколько карточек отрисовывается первоначально
    if (windowWidth >= 1020) {
      initialNumMov = 6;
    } else if (windowWidth < 690) {
      initialNumMov = 5;
    } else {
      initialNumMov = 4;
    }
    const movies = moviesArr.slice(0, initialNumMov);
    return movies;
  }

  function handleMoreClick() {
    let addNumMovies; // сколько карточек дорисовываем при клике на кнопку
    if (windowWidth >= 1020) {
      addNumMovies = 3;
    } else {
      addNumMovies = 2;
    }
    counter.current = moviesForRender.length;
    setMoviesForRender([...moviesForRender, ...moviesArr.slice(counter.current, counter.current + addNumMovies)]);
  }

  return (
    <section className="movies-card-list">
      {((href.includes('/movies') && isSearchBegin)
        || href.includes('/saved-movies'))
        && (moviesForRender.length > 0)
        && (<ul className="movies-card-list__container">
          {moviesForRender.map((movie) => (
            <MoviesCard
              imgLink={movie.image.url ? 'https://api.nomoreparties.co/' + movie.image.url : movie.image}
              movieName={movie.nameRU}
              duration={movie.duration}
              onMovieSave={onMovieSave}
              onMovieDel={onMovieDel}
              trailerLink={movie.trailerLink}
              movie={movie}
              key={href.includes('/movies') ? movie.id : movie._id} // выбор ключа зависит от того, на какой мы странице
              checkMovieSave={checkMovieSave}
            />
          ))}
        </ul>)}
      {href.includes('/movies') && !isSearchBegin && !isApiErr && (
        <Preloader />
      )}

      <p className={`movies-card-list__not-found ${((href.includes('/movies') && isSearchBegin) // страница /movies и была попытка поиска
        || href.includes('/saved-movies')) // или страница /saved-movies
        && !isApiErr // сервер не вернул ошибку и длина массива карточек = 0
        && (moviesForRender.length === 0) && "movies-card-list__not-found_visible"}
        `}>Ничего не найдено</p>

      <p className={`movies-card-list__not-found ${isApiErr && "movies-card-list__not-found_visible"}
        `}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>

      {href.includes('/movies')
        && (moviesForRender.length < moviesArr.length)
        && (<button className="movies-card-list__btn" onClick={handleMoreClick}>Ещё</button>)}

    </section>
  )
}

export default MoviesCardList;
