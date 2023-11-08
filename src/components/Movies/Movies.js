import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Movies({ loggedIn, moviesArr, onMovieSave, search }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="main">
        <SearchForm search={search}/>
        <MoviesCardList moviesArr={moviesArr} onMovieSave={onMovieSave}/>
      </main>
      <Footer />
    </>
  )
}

export default Movies;