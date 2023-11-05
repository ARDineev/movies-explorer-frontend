import React from 'react';

function FilterCheckbox() {
  const [isClicked, setIsClicked] = React.useState(false);

  function handleFilterClick() {
    setIsClicked(!isClicked);
  }

  return (
    <div className="filter-checkbox">
      <button className={`filter-checkbox__ellipse ${isClicked ? "filter-checkbox__ellipse_clicked" : ""}`} onClick={handleFilterClick} type="button" id="short-film">
        <span className={`filter-checkbox__circle ${isClicked ? "filter-checkbox__circle_clicked" : ""}`}></span>
      </button>
      <label className="filter-checkbox__caption" for="short-film">Короткометражки</label>
    </div>
  )
}

export default FilterCheckbox;
