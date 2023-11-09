import React from 'react';

function FilterCheckbox(props) {
  const [isClicked, setIsClicked] = React.useState(!JSON.parse(localStorage.getItem('filter')));

  function handleFilterClick(e) {
    setIsClicked(!isClicked);
    isClicked ? localStorage.setItem('filter', true) : localStorage.setItem('filter', false);
    localStorage.getItem('allMovies') && props.startSearch(e);
 //   console.log('filter', localStorage.getItem('filter'));
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
