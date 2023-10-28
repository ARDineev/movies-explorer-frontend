function MoviesCard(props) {
  return (
    <li className="movies-card">
      <img className="movies-card__image" src={props.imgLink} />
      <div className="movies-card__caption">
        <h2 className="movies-card__title">{props.movieName}</h2>
        <p className="movies-card__duration">{props.duration}</p>
      </div>
    </li>
  )
}

export default MoviesCard;