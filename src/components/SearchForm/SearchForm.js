import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section>
      <form className="search-form">
        <input
          className="search-form__input"
          type="search"
          name="film"
          required
          placeholder="Фильм"
        />
        <button className="search-form__btn" type="submit"></button>
        <FilterCheckbox />
      </form>
    </section>

  )
}

export default SearchForm;