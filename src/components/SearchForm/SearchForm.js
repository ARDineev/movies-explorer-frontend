import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useInput from '../../hooks/useInput';


function SearchForm({ searchMovies, setMoviesArr, allSavedMoviesArr, getInitialMovies }) {
  const href = window.location.href;
  const keyWord = useInput(
    href.includes('/movies') ? localStorage.getItem('keyWord') : '',
    { isEmpty: true, });
  const filterCheckBox = React.useRef(
    href.includes('/movies') ? JSON.parse(localStorage.getItem('filter')) || false : false
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (href.includes('/movies')) { // если мы на вкладке "фильмы"
      if (!localStorage.getItem('allMovies')) { // если в хранилище нет фильмов, т.е. запрос ни разу не выполнялся
        const allMovies = await getInitialMovies(); // то запрашиваем фильмы с api beatfilm-movies
        allMovies && localStorage.setItem('allMovies', JSON.stringify(allMovies)); // фильмы записываются в хранилище
      }
      localStorage.setItem('keyWord', keyWord.value); // запоминаем ключевое слово - кладем в хранилище
      localStorage.setItem('filter', filterCheckBox.current);

      const moviesAll = JSON.parse(localStorage.getItem('allMovies')); // достаем данные из хранилища

      if (moviesAll) {
        const searchedMovies = searchMovies(moviesAll, keyWord.value, filterCheckBox.current);
        localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
        setMoviesArr(searchedMovies);
      }
    }
    if (href.includes('/saved-movies')) { // если мы на вкладке "сохраненные фильмы"
      const searchedSavedMovies = searchMovies(allSavedMoviesArr, keyWord.value, filterCheckBox.current);
      setMoviesArr(searchedSavedMovies);
    }
  }

  return (
    <section>
      <form className="search-form" onSubmit={handleSubmit}>
        {(keyWord.isDirty && keyWord.isEmptyErr) && <div className="search-form__input-error">{'Нужно ввести ключевое слово'}</div>}
        <input
          className="search-form__input"
          type="search"
          name="key-word"
          required
          placeholder="Фильм"
          value={keyWord.value}
          onChange={keyWord.onChange}
          onBlur={keyWord.onBlur}
        />
        <button disabled={!keyWord.inputValid} className="search-form__btn" type="submit"></button>
        <FilterCheckbox startSearch={handleSubmit} filterCheckBox={filterCheckBox} keyWordEmptyErr={keyWord.isEmptyErr}/>
      </form>
    </section>

  )
}

export default SearchForm;