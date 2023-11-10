import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function SavedMovies({ loggedIn, moviesArr, onMovieDel, search, setMoviesArr, allSavedMoviesArr }) {

   React.useEffect(() => {
    setMoviesArr(allSavedMoviesArr);
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <SearchForm search={search} moviesArr={moviesArr} setMoviesArr={setMoviesArr} allSavedMoviesArr={allSavedMoviesArr}/>
        <MoviesCardList moviesArr={moviesArr} onMovieDel={onMovieDel}/>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;