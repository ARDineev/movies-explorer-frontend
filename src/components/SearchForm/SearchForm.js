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

function SearchForm({ search }) {
  const keyWord = useInput(localStorage.getItem('keyWord'), { isEmpty: true, });

  async function getInitialMovies() {
    try {
      const movies = await getMovies();
      localStorage.setItem('allMovies', JSON.stringify(movies));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!localStorage.getItem('allMovies')) {
      await getInitialMovies();
    }
    localStorage.setItem('keyWord', keyWord.value);
    const moviesAll = JSON.parse(localStorage.getItem('allMovies'));
    const filter = JSON.parse(localStorage.getItem('filter'));
    const searchedMovies = search(moviesAll, keyWord.value, filter);
    localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
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
        <FilterCheckbox startSearch={handleSubmit}/>
      </form>
    </section>

  )
}

export default SearchForm;