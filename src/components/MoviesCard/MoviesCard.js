import React from 'react';

function MoviesCard(props) {
  const href = window.location.href;
  const [isMouseOn, setIsMouseOn] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(false);

  function handleIsMouseOn() {
    setIsMouseOn(true);
  }

  function handleIsMouseOff() {
    setIsMouseOn(false);
  }

  function handleSelectMovie() {
    setIsSelected(!isSelected);
  }

  return (
    <li className="movies-card" onMouseOver={handleIsMouseOn} onMouseOut={handleIsMouseOff}>
      <img className="movies-card__image" src={props.imgLink} alt={props.movieName}/>
      <div className="movies-card__caption">
        <h2 className="movies-card__title">{props.movieName}</h2>
        <p className="movies-card__duration">{props.duration}</p>
      </div>
      {href.includes('/movies') && (
        <button
          type="button"
          className={
            `movies-card__save-btn
            ${isMouseOn ? "" : "movies-card__save-btn_unvisible"}
            ${isSelected ? "movies-card__save-btn_selected" : ""}
          `}
          onClick={handleSelectMovie}>
          {isSelected ? "" : "Сохранить"}
        </button>
      )}
      {href.includes('/saved-movies') && (
        <button type="button"
          className={
            `movies-card__delete-btn
            ${isMouseOn ? "" : "movies-card__delete-btn_unvisible"}
          `} />
      )}
    </li>
  )
}

export default MoviesCard;