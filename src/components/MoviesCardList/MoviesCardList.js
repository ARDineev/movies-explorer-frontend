import MoviesCard from '../MoviesCard/MoviesCard';


function MoviesCardList({ moviesArr, onMovieSave, onMovieDel }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">

        {moviesArr.map((movie) => (
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
      <button className="movies-card-list__btn">Ещё</button>
    </section>
  )
}

export default MoviesCardList;