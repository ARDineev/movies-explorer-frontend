import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import {
  MAIN_PATH,
  MOVIES_PATH,
  SAVED_MOVIES_PATH,
  PROFILE_PATH,
  SIGNIN_PATH,
  SIGNUP_PATH,
  WINDOW_WIDTH_BURGER
} from '../../utils/constants';

function Header({ loggedIn }) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isBurgerClicked, setIsBurgerClicked] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  function handleBurgerClick() {
    setIsBurgerClicked(!isBurgerClicked)
  }

  const handleLogoClick = () => {
    navigate(MAIN_PATH, { replace: true });
  }

  const handleProfileClick = () => {
    navigate(PROFILE_PATH, { replace: true });
  }

  const handleSignInClick = () => {
    navigate(SIGNIN_PATH, { replace: true });
  }

  return (
    <header className="header">
      <div className="header__logo" onClick={handleLogoClick}></div>

      {loggedIn && windowWidth <= WINDOW_WIDTH_BURGER && (
        <div className="header__burger" onClick={handleBurgerClick}></div>
      )}

      {loggedIn && windowWidth > WINDOW_WIDTH_BURGER && (<>
        <div className="header__links">
          <NavLink to={MOVIES_PATH} className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>Фильмы</NavLink>
          <NavLink to={SAVED_MOVIES_PATH} className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}>Сохранённые фильмы</NavLink>
        </div>
        <button className="account-btn" type="button" onClick={handleProfileClick}>Аккаунт</button>
      </>)}

      {!loggedIn && (
        <nav className="header__auth-container">
          <Link className="header__signup" to={SIGNUP_PATH}>Регистрация</Link>
          <button className="header__signin" type="button" onClick={handleSignInClick}>Войти</button>
        </nav>
      )}

      {windowWidth <= WINDOW_WIDTH_BURGER && (
        <Navigation isOpen={isBurgerClicked} handleCloseClick={handleBurgerClick} handleProfileClick={handleProfileClick}/>
      )}
    </header>
  )
}

export default Header;
