import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Movies({ loggedIn, moviesArr, onMovieSave, onMovieDel, searchMovies, setMoviesArr, isApiErr, getInitialMovies, checkMovieSave, isMainApiErr }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <SearchForm searchMovies={searchMovies} setMoviesArr={setMoviesArr} getInitialMovies={getInitialMovies}/>
        <MoviesCardList moviesArr={moviesArr} onMovieSave={onMovieSave} onMovieDel={onMovieDel} isApiErr={isApiErr} checkMovieSave={checkMovieSave} isMainApiErr={isMainApiErr}/>
      </main>
      <Footer />
    </>
  )
}

export default Movies;