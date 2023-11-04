import MoviesCard from '../MoviesCard/MoviesCard';
import movie_1 from '../../images/movie-1.png';
import movie_2 from '../../images/movie-2.png';
import movie_3 from '../../images/movie-3.png';
import movie_4 from '../../images/movie-4.png';
import movie_5 from '../../images/movie-5.png';
import movie_6 from '../../images/movie-6.png';
import movie_7 from '../../images/movie-7.png';
import movie_8 from '../../images/movie-8.png';
import movie_9 from '../../images/movie-9.png';
import movie_10 from '../../images/movie-10.png';
import movie_11 from '../../images/movie-11.png';
import movie_12 from '../../images/movie-12.png';

function MoviesCardList() {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        <MoviesCard imgLink={movie_1} movieName="33 слова о дизайне" duration="1ч 17м" />
        <MoviesCard imgLink={movie_2} movieName="Киноальманах «100 лет дизайна»" duration="1ч 17м" />
        <MoviesCard imgLink={movie_3} movieName="В погоне за Бенкси" duration="1ч 17м" />
        <MoviesCard imgLink={movie_4} movieName="Баския: Взрыв реальности" duration="1ч 17м" />
        <MoviesCard imgLink={movie_5} movieName="Бег это свобода" duration="1ч 17м" />
         <MoviesCard imgLink={movie_6} movieName="Книготорговцы" duration="1ч 17м" />
        <MoviesCard imgLink={movie_7} movieName="Когда я думаю о Германии ночью" duration="1ч 17м" />
        <MoviesCard imgLink={movie_8} movieName="Gimme Danger: История Игги и The Stooges" duration="1ч 17м" />
         <MoviesCard imgLink={movie_9} movieName="Дженис: Маленькая девочка грустит" duration="1ч 17м" />
        <MoviesCard imgLink={movie_10} movieName="Соберись перед прыжком" duration="1ч 17м" />
        <MoviesCard imgLink={movie_11} movieName="Пи Джей Харви: A dog called money" duration="1ч 17м" />
        <MoviesCard imgLink={movie_12} movieName="По волнам: Искусство звука в кино" duration="1ч 17м" />
      </ul>
      <button className="movies-card-list__btn">Ещё</button>
    </section>
  )
}

export default MoviesCardList;