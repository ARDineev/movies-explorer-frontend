import React from 'react';
import { MOVIES_PATH, ALL_MOVIES_KEY } from '../../utils/constants';

function FilterCheckbox(props) {
  const href = window.location.href; // текущая страница

  function handleFilterClick(e) {

    props.filterCheckBox.current = !props.filterCheckBox.current; // клик на чек-бокс инвертирует его состояние
    props.startSearch(e);
  }

  return (
    <div className="filter-checkbox">
      <button
        className={`filter-checkbox__ellipse ${props.filterCheckBox.current ? "" : "filter-checkbox__ellipse_inactive"}`}
        onClick={handleFilterClick}
        disabled={(href.includes(MOVIES_PATH) && !localStorage.getItem(ALL_MOVIES_KEY)) || props.keyWordEmptyErr}
        type="button"
        id="short-film"
      >
        <span
          className={`filter-checkbox__circle ${props.filterCheckBox.current ? "" : "filter-checkbox__circle_inactive"}`}>
        </span>
      </button>
      <label className="filter-checkbox__caption" htmlFor="short-film">Короткометражки</label>
    </div>
  )
}

export default FilterCheckbox;
