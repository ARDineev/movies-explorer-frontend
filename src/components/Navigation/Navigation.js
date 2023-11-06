import { NavLink } from 'react-router-dom';

function Navigation({ isOpen, handleCloseClick, handleProfileClick }) {
  return (
    <div className={`navigation ${isOpen && "navigation_opened"}`}>
      <div className="navigation__container">
        <NavLink className={({ isActive }) => `navigation__link ${isActive ? "navigation__link_active" : ""}`} to="/">Главная</NavLink>
        <NavLink className={({ isActive }) => `navigation__link ${isActive ? "navigation__link_active" : ""}`} to="/movies">Фильмы</NavLink>
        <NavLink className={({ isActive }) => `navigation__link ${isActive ? "navigation__link_active" : ""}`} to="/saved-movies">Сохранённые фильмы</NavLink>
        <button className="account-btn" type="button" onClick={handleProfileClick}>Аккаунт</button>
        <button className="navigation__close-btn" type="button" onClick={handleCloseClick}></button>
      </div>
    </div>
  )
}

export default Navigation;