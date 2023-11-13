import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useInput from '../../hooks/useInput';


function SearchForm({ searchMovies, setMoviesArr, allSavedMoviesArr, getInitialMovies }) {
  const href = window.location.href; // текущая страница
  const keyWord = useInput( // ключевое слово в строке поиска. Для базовой логики и валидации используем кастомный хук
    href.includes('/movies') ? localStorage.getItem('keyWord') || '' : '', // начальное значение берем из хранилища, если это страница /movies
    { isEmpty: true, }); // валидируем поле на пустоту
  const filterCheckBox = React.useRef( // состояние чек-бокса фильтрации по короткометражкам
    href.includes('/movies') ? JSON.parse(localStorage.getItem('filter')) || false : false // начальное состояние берется из хранилища для /movies
  );
  const [isInSearch, setInSearch] = React.useState(false); // выполняется ли поиск (для блокировки кнопки сабмит)

  async function handleSubmit(e) {
    e.preventDefault();
    setInSearch(true);
    if (href.includes('/movies')) { // если мы на вкладке "фильмы"
      if (!localStorage.getItem('allMovies')) { // если в хранилище нет фильмов, т.е. запрос ни разу не выполнялся
        const allMovies = await getInitialMovies(); // то запрашиваем фильмы с api beatfilm-movies
        allMovies && localStorage.setItem('allMovies', JSON.stringify(allMovies)); // фильмы записываются в хранилище
      }
      localStorage.setItem('keyWord', keyWord.value); // запоминаем ключевое слово - кладем в хранилище
      localStorage.setItem('filter', filterCheckBox.current); // запоминаем состояние чек-бокса

      const moviesAll = JSON.parse(localStorage.getItem('allMovies')); // достаем данные из хранилища

      if (moviesAll) { // выполняем поиск по всем фильмам, полученным с api beatfilm-movies
        const searchedMovies = searchMovies(moviesAll, keyWord.value, filterCheckBox.current);
        localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies)); // сохраняем результат в хранилище
        setMoviesArr(searchedMovies);
      }
    }
    if (href.includes('/saved-movies')) { // если мы на вкладке "сохраненные фильмы", кино ищем по всем сохраненным фильмам из пропсов
      const searchedSavedMovies = searchMovies(allSavedMoviesArr, keyWord.value, filterCheckBox.current);
      setMoviesArr(searchedSavedMovies);
    }
    setInSearch(false);
  }

  return (
    <section>
      <form className="search-form" onSubmit={handleSubmit}>
        <p className={`search-form__input-error
        ${keyWord.isDirty && keyWord.isEmptyErr && "search-form__input-error_visible"}`}>Нужно ввести ключевое слово</p>
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
        <button disabled={!keyWord.inputValid || isInSearch} className="search-form__btn" type="submit"></button>
        <FilterCheckbox startSearch={handleSubmit} filterCheckBox={filterCheckBox} keyWordEmptyErr={keyWord.isEmptyErr} />
      </form>
    </section>

  )
}

export default SearchForm;
