import { NavLink } from 'react-router-dom';
import { MAIN_PATH, MOVIES_PATH, SAVED_MOVIES_PATH } from '../../utils/constants';

function Navigation({ isOpen, handleCloseClick, handleProfileClick }) {
  return (
    <div className={`navigation ${isOpen && "navigation_opened"}`}>
      <div className="navigation__container">
        <NavLink className={({ isActive }) => `navigation__link ${isActive ? "navigation__link_active" : ""}`} to={MAIN_PATH}>Главная</NavLink>
        <NavLink className={({ isActive }) => `navigation__link ${isActive ? "navigation__link_active" : ""}`} to={MOVIES_PATH}>Фильмы</NavLink>
        <NavLink className={({ isActive }) => `navigation__link ${isActive ? "navigation__link_active" : ""}`} to={SAVED_MOVIES_PATH}>Сохранённые фильмы</NavLink>
        <button className="account-btn" type="button" onClick={handleProfileClick}>Аккаунт</button>
        <button className="navigation__close-btn" type="button" onClick={handleCloseClick}></button>
      </div>
    </div>
  )
}

export default Navigation;
