import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function SavedMovies({ loggedIn, moviesArr, onMovieDel, searchMovies, setMoviesArr, allSavedMoviesArr, isApiErr }) {

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <SearchForm searchMovies={searchMovies} moviesArr={moviesArr} setMoviesArr={setMoviesArr} allSavedMoviesArr={allSavedMoviesArr}/>
        <MoviesCardList moviesArr={moviesArr} onMovieDel={onMovieDel} setMoviesArr={setMoviesArr} allSavedMoviesArr={allSavedMoviesArr} isApiErr={isApiErr}/>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;