import React from 'react';

function FilterCheckbox() {
  const [isClicked, setIsClicked] = React.useState(false);

  function handleFilterClick() {
    setIsClicked(!isClicked);
  }

  return (
    <div className="filter-checkbox">
      <div className={`filter-checkbox__ellipse ${isClicked ? "filter-checkbox__ellipse_clicked" : ""}`} onClick={handleFilterClick}>
        <div className={`filter-checkbox__circle ${isClicked ? "filter-checkbox__circle_clicked" : ""}`}></div>
      </div>
      <p className="filter-checkbox__caption">Короткометражки</p>
    </div>
  )
}

export default FilterCheckbox;
