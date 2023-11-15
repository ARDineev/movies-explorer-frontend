import React from 'react';
import { MOVIES_PATH, SAVED_MOVIES_PATH, MINUTES_IN_HOUR } from '../../utils/constants';

function MoviesCard(props) {
  const href = window.location.href;
  const [isMouseOn, setIsMouseOn] = React.useState(false);
   // если страница /movies, то проверить сохранен ли этот фильм, чтобы отметить его галочкой
  const [isSelected, setIsSelected] = React.useState(href.includes(MOVIES_PATH) ? handleCheckSave() : false);

  function calculateDuration(duration) { // пересчет продолжительности фильма в формат согласно ТЗ
    const totalMinutes = Number(duration);
    if (Number.isNaN(totalMinutes)) {
      return NaN
    }
    if (totalMinutes <= MINUTES_IN_HOUR) {
      return (totalMinutes + 'м')
    } else {
      const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
      const minutes = totalMinutes % MINUTES_IN_HOUR;
      return (`${hours}ч ${minutes}м`)
    }
  }

  function handleCheckSave() { // проверка, добавлен ли фильм в сохраненные
    const res = props.checkMovieSave(props.movie);
    return res;
  }

  function handleIsMouseOn() {
    setIsMouseOn(true);
  }

  function handleIsMouseOff() {
    setIsMouseOn(false);
  }

  async function handleSelectMovie() { // состояние фильма (сохранен/не сохранен) меняется с учетом ответа сервера
    if (isSelected) {
      const success = await props.onMovieDel(props.movie);
      success && setIsSelected(false);
    } else {
      const success = await props.onMovieSave(props.movie);
      success && setIsSelected(true);
    }
  }

  function handleDelMovie() {
    props.onMovieDel(props.movie);
  }

  function handleMovieClick() {
    window.open(
      props.trailerLink,
      '_blank'
    );
  }

  return (
    <li className="movies-card" onMouseOver={handleIsMouseOn} onMouseOut={handleIsMouseOff}>
      <img className="movies-card__image" src={props.imgLink} alt={props.movieName} onClick={handleMovieClick}/>
      <div className="movies-card__caption">
        <h2 className="movies-card__title">{props.movieName}</h2>
        <p className="movies-card__duration">{calculateDuration(props.duration)}</p>
      </div>
      {href.includes(MOVIES_PATH) && (
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
      {href.includes(SAVED_MOVIES_PATH) && (
        <button type="button"
          className={
            `movies-card__delete-btn
            ${isMouseOn ? "" : "movies-card__delete-btn_unvisible"}
          `}
          onClick={handleDelMovie} />
      )}
    </li>
  )
}

export default MoviesCard;
