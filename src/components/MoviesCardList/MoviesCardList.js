import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({ moviesArr, onMovieSave, onMovieDel }) {
  /* Логика работы согласно ТЗ:
  Ширина 1280px — 4 ряда карточек. Кнопка «Ещё» загружает дополнительный ряд карточек.
  Ширина 768px — 4 ряда карточек. Кнопка «Ещё» загружает дополнительный ряд карточек.
  Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки. */

  // текущая страница
  const href = window.location.href;
  // стейт-переменная с текущей шириной экрана
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  // стейт-переменная с массивом карточек для рендера
  const [moviesForRender, setMoviesForRender] = React.useState([]);
  // счетчик, участвует в логике дорисовки карточек
  const counter = React.useRef();

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
    if (href.includes('/movies')) {
      setInitialMoviesForRender();
    }
    if (href.includes('/saved-movies')) {
      setMoviesForRender(moviesArr)
    }
  }, [moviesArr]);


  React.useEffect(() => {
    href.includes('/movies') && setInitialMoviesForRender();
  }, [windowWidth]);


  function setInitialMoviesForRender() {
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
    setMoviesForRender(movies);
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
      <ul className="movies-card-list__container">

        {moviesForRender.map((movie) => (
          <MoviesCard
            imgLink={movie.image.url ? 'https://api.nomoreparties.co/' + movie.image.url : movie.image}
            movieName={movie.nameRU}
            duration={movie.duration}
            onMovieSave={onMovieSave}
            onMovieDel={onMovieDel}
            movie={movie}
            key={movie.id}
          />
        ))}

      </ul>
      {(href.includes('/movies'))
        && (moviesForRender.length < moviesArr.length)
        && (<button className="movies-card-list__btn" onClick={handleMoreClick}>Ещё</button>)}

    </section>
  )
}

export default MoviesCardList;
