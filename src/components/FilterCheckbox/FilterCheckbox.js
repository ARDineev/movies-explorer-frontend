import React from 'react';

function FilterCheckbox(props) {
  const href = window.location.href; // текущая страница

  function handleFilterClick(e) {
    console.log(props.filterCheckBox.current);

    props.filterCheckBox.current = !props.filterCheckBox.current; // клик на чек-бокс инвертирует его состояние
    console.log(props.filterCheckBox.current);
    if (href.includes('/movies')) { // если мы на странице "movies", то сперва проверяем был ли уже поиск фильмов
      localStorage.getItem('allMovies') && props.startSearch(e);
    };
    if (href.includes('/saved-movies')) { // если на странице сохраненных фильмов, то сразу разрешаем поиск нажатием на чек-бокс
      props.startSearch(e);
    }
  }

  return (
    <div className="filter-checkbox">
      <button
        className={`filter-checkbox__ellipse ${props.filterCheckBox.current ? "" : "filter-checkbox__ellipse_inactive"}`}
        onClick={handleFilterClick}
        disabled={href.includes('/movies') && !localStorage.getItem('allMovies')}
        type="button"
        id="short-film"
      >
        <span
          className={`filter-checkbox__circle ${props.filterCheckBox.current ? "" : "filter-checkbox__circle_inactive"}`}>
        </span>
      </button>
      <label className="filter-checkbox__caption" for="short-film">Короткометражки</label>
    </div>
  )
}

export default FilterCheckbox;
