import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function SavedMovies({ loggedIn, moviesArr, onMovieDel }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <SearchForm />
        <MoviesCardList moviesArr={moviesArr} onMovieDel={onMovieDel}/>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;