import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function SavedMovies({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </>
  )
}

export default SavedMovies;