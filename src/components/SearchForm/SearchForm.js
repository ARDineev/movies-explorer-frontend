import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { getMovies } from '../../utils/MoviesApi';

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = React.useState(true);
  const [isMinLengthErr, setMinLengthErr] = React.useState(false);
  const [isEmailErr, setEmailErr] = React.useState(false);
  const [inputValid, setInputValid] = React.useState(false);

  React.useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations['minLength'] ? setMinLengthErr(true) : setMinLengthErr(false);
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'isEmail':
          const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLowerCase()) ? setEmailErr(true) : setEmailErr(false);
      }
    }
  }, [value]);

  React.useEffect(() => {
    if (isEmpty || isMinLengthErr || isEmailErr) {
      console.log(inputValid);
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, isMinLengthErr, isEmailErr]);

  return {
    isEmpty,
    isMinLengthErr,
    isEmailErr,
    inputValid,
  }
}

const useInput = (initialValue, validations) => {
  const [value, setValue] = React.useState(initialValue);
  // показывает, вышли из input или нет
  const [isDirty, setDirty] = React.useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    // обрабатывает изменения внутри input
    setValue(e.target.value);
  }

  const onBlur = (e) => {
    // срабатывает, когда пользователь покинул input
    setDirty(true);
  }
  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid
  }
}

function SearchForm({ search, setMoviesArr, allSavedMoviesArr }) {
  const href = window.location.href;
  const keyWord = useInput(
    href.includes('/movies') ? localStorage.getItem('keyWord') : '',
    { isEmpty: true, });
  const filterCheckBox = React.useRef(
    href.includes('/movies') ? JSON.parse(localStorage.getItem('filter')) || false : false
  );

  console.log(window.location.href, filterCheckBox.current, typeof(filterCheckBox.current));

  async function getInitialMovies() {
    // функция запрашивает все фильмы с сервера beatfilm-movies
    // фильмы записываются в хранилище
    try {
      const movies = await getMovies();
      return movies;
    } catch (err) {
      console.log(err);
      return;
    }
  }


  async function handleSubmit(e) {
    e.preventDefault();
    if (href.includes('/movies')) { // если мы на вкладке "фильмы"
      if (!localStorage.getItem('allMovies')) { // если в хранилище нет фильмов, т.е. запрос ни разу не выполнялся
        const allMovies = await getInitialMovies(); // то запрашиваем фильмы с api beatfilm-movies
        allMovies && localStorage.setItem('allMovies', JSON.stringify(allMovies));
      }
      localStorage.setItem('keyWord', keyWord.value); // запоминаем ключевое слово - кладем в хранилище
      localStorage.setItem('filter', filterCheckBox.current);
      console.log('записали в хранилище', filterCheckBox.current);

      const moviesAll = JSON.parse(localStorage.getItem('allMovies')); // достаем данные из хранилища
  //    const filter = JSON.parse(localStorage.getItem('filter'));

      const searchedMovies = search(moviesAll, keyWord.value, filterCheckBox.current);
      localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
      setMoviesArr(searchedMovies);
    }
    if (href.includes('/saved-movies')) { // если мы на вкладке "сохраненные фильмы"
      const searchedSavedMovies = search(allSavedMoviesArr, keyWord.value, filterCheckBox.current);
      setMoviesArr(searchedSavedMovies);
    }
  }

  return (
    <section>
      <form className="search-form" onSubmit={handleSubmit}>
        {(keyWord.isDirty && keyWord.isEmpty) && <div>{'Поле пустое'}</div>}
        {(keyWord.isDirty && keyWord.isMinLengthErr) && <div>{'Поле короткое'}</div>}
        <input
          className="search-form__input"
          type="search"
          name="key-word"
          required
          placeholder="Фильм"
          value={keyWord.value}
          onChange={e => keyWord.onChange(e)}
          onBlur={e => keyWord.onBlur(e)}
        />
        <button disabled={!keyWord.inputValid} className="search-form__btn" type="submit"></button>
        <FilterCheckbox startSearch={handleSubmit} filterCheckBox={filterCheckBox}/>
      </form>
    </section>

  )
}

export default SearchForm;